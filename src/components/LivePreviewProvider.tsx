"use client";

import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";

type PreviewDocument = Record<string, unknown>;

type PreviewMessage = {
  collectionSlug?: string;
  data?: PreviewDocument;
  globalSlug?: string;
  ready?: boolean;
  type?: string;
};

type PreviewState = {
  collections: Record<string, Record<string, PreviewDocument>>;
  globals: Record<string, PreviewDocument>;
};

const initialPreviewState: PreviewState = {
  collections: {},
  globals: {},
};

const LivePreviewContext = createContext<PreviewState>(initialPreviewState);

function getPreviewDocKey(data: PreviewDocument) {
  const id = data.id;
  const slug = data.slug;

  if (typeof id === "string" || typeof id === "number") {
    return String(id);
  }

  if (typeof slug === "string") {
    return slug;
  }

  return "__latest";
}

function isPreviewMessage(value: unknown): value is PreviewMessage {
  return Boolean(value && typeof value === "object");
}

export function LivePreviewProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState(initialPreviewState);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const readyMessage = { type: "payload-live-preview", ready: true };

    if (window.parent && window.parent !== window) {
      window.parent.postMessage(readyMessage, window.location.origin);
    }

    if (window.opener) {
      window.opener.postMessage(readyMessage, window.location.origin);
    }
  }, [pathname]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || !isPreviewMessage(event.data)) {
        return;
      }

      if (event.data.type === "payload-document-event") {
        startTransition(() => {
          router.refresh();
        });
        return;
      }

      if (
        event.data.type !== "payload-live-preview" ||
        event.data.ready ||
        !event.data.data
      ) {
        return;
      }

      const previewDoc = event.data.data;

      setState((currentState) => {
        if (event.data.globalSlug) {
          return {
            ...currentState,
            globals: {
              ...currentState.globals,
              [event.data.globalSlug]: previewDoc,
            },
          };
        }

        if (event.data.collectionSlug) {
          const collectionState = currentState.collections[event.data.collectionSlug] || {};
          const key = getPreviewDocKey(previewDoc);

          return {
            ...currentState,
            collections: {
              ...currentState.collections,
              [event.data.collectionSlug]: {
                ...collectionState,
                [key]: previewDoc,
              },
            },
          };
        }

        return currentState;
      });
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [router]);

  const value = useMemo(() => state, [state]);

  return <LivePreviewContext.Provider value={value}>{children}</LivePreviewContext.Provider>;
}

export function useLivePreviewGlobalData<T extends PreviewDocument>(
  slug: string,
  initialData: T,
) {
  const state = useContext(LivePreviewContext);
  const previewData = state.globals[slug];

  return useMemo(
    () => (previewData ? ({ ...initialData, ...previewData } as T) : initialData),
    [initialData, previewData],
  );
}

export function useLivePreviewPageData<T extends PreviewDocument>(
  slug: string,
  initialData: T,
) {
  const state = useContext(LivePreviewContext);

  const previewData = useMemo(
    () =>
      Object.values(state.collections.Pages || {}).find((entry) => entry.slug === slug) ||
      state.collections.Pages?.[slug] ||
      undefined,
    [slug, state.collections.Pages],
  );

  return useMemo(
    () => (previewData ? ({ ...initialData, ...previewData } as T) : initialData),
    [initialData, previewData],
  );
}

export function useLivePreviewCollectionDocs<T extends { id?: string | number }>(
  collectionSlug: string,
  initialDocs: T[],
) {
  const state = useContext(LivePreviewContext);

  return useMemo(() => {
    const previewDocs = state.collections[collectionSlug] || {};
    const docs = [...initialDocs];

    for (const previewDoc of Object.values(previewDocs)) {
      const previewId = previewDoc.id;

      if (typeof previewId !== "string" && typeof previewId !== "number") {
        continue;
      }

      const index = docs.findIndex((doc) => String(doc.id) === String(previewId));

      if (index >= 0) {
        docs[index] = {
          ...docs[index],
          ...previewDoc,
        } as T;
      } else {
        docs.push(previewDoc as T);
      }
    }

    return docs;
  }, [collectionSlug, initialDocs, state.collections]);
}
