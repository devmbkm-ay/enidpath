import { cache } from "react";
import { getPayload } from "@/lib/payload";
import { defaultSiteSettings } from "@/lib/site-settings";

const DEFAULT_PAYLOAD_TIMEOUT_MS = process.env.NODE_ENV === "development" ? 2000 : 5000;
const DEFAULT_PAYLOAD_RETRY_COOLDOWN_MS =
  process.env.NODE_ENV === "development" ? 10000 : 3000;

let payloadClientPromise: ReturnType<typeof getPayload> | null = null;
let payloadRetryAfter = 0;

function logContentLoadError(scope: string, error: unknown) {
  console.error(`[site-content] Failed to load ${scope}`, error);
}

function getPayloadTimeoutMs() {
  const rawValue = Number(process.env.PAYLOAD_FETCH_TIMEOUT_MS);

  if (Number.isFinite(rawValue) && rawValue > 0) {
    return rawValue;
  }

  return DEFAULT_PAYLOAD_TIMEOUT_MS;
}

function getPayloadRetryCooldownMs() {
  const rawValue = Number(process.env.PAYLOAD_RETRY_COOLDOWN_MS);

  if (Number.isFinite(rawValue) && rawValue > 0) {
    return rawValue;
  }

  return DEFAULT_PAYLOAD_RETRY_COOLDOWN_MS;
}

async function withTimeout<T>(scope: string, operation: Promise<T>) {
  return Promise.race<T>([
    operation,
    new Promise<T>((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Timed out after ${getPayloadTimeoutMs()}ms while loading ${scope}`));
      }, getPayloadTimeoutMs());
    }),
  ]);
}

async function getPayloadClient() {
  const now = Date.now();

  if (payloadRetryAfter > now) {
    throw new Error(
      `Skipping Payload init until ${new Date(payloadRetryAfter).toISOString()} after a recent failure.`,
    );
  }

  if (!payloadClientPromise) {
    payloadClientPromise = getPayload();
  }

  try {
    return await withTimeout("payload client", payloadClientPromise);
  } catch (error) {
    payloadClientPromise = null;
    payloadRetryAfter = Date.now() + getPayloadRetryCooldownMs();
    throw error;
  }
}

async function findPageContent(slug: string) {
  const payload = await getPayloadClient();
  const { docs } = await withTimeout(
    `page content for "${slug}"`,
    payload.find({
      collection: "Pages",
      overrideAccess: true,
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    }),
  );

  return docs[0] ?? null;
}

async function findHomeContent() {
  const payload = await getPayloadClient();

  return withTimeout(
    "home settings",
    payload.findGlobal({
      slug: "HomeSettings",
      depth: 1,
      overrideAccess: true,
    }),
  );
}

async function findCollectionDocs<T>(collection: "CourseItems" | "Programmes") {
  const payload = await getPayloadClient();
  const { docs } = await withTimeout(
    `${collection} collection`,
    payload.find({
      collection,
      limit: 100,
      overrideAccess: true,
    }),
  );

  return docs as T[];
}

async function findSiteSettings() {
  const payload = await getPayloadClient();

  return withTimeout(
    "site settings",
    payload.findGlobal({
      slug: "SiteSettings",
      overrideAccess: true,
    }),
  );
}

const getCachedPageContent = cache(findPageContent);
const getCachedHomeContent = cache(findHomeContent);
const getCachedCollectionDocs = cache(findCollectionDocs);
const getCachedSiteSettings = cache(findSiteSettings);

export async function getPageContent(slug: string) {
  try {
    return await getCachedPageContent(slug);
  } catch (error) {
    logContentLoadError(`page content for "${slug}"`, error);
    return null;
  }
}

export async function getHomeContent() {
  try {
    return await getCachedHomeContent();
  } catch (error) {
    logContentLoadError("home settings", error);
    return null;
  }
}

export async function getCollectionDocs<T>(collection: "CourseItems" | "Programmes") {
  try {
    return await getCachedCollectionDocs<T>(collection);
  } catch (error) {
    logContentLoadError(`${collection} collection`, error);
    return [] as T[];
  }
}

export async function getSiteSettings() {
  try {
    const settings = await getCachedSiteSettings();

    return {
      ...defaultSiteSettings,
      ...settings,
      officeHours:
        settings?.officeHours && settings.officeHours.length > 0
          ? settings.officeHours
          : defaultSiteSettings.officeHours,
      headerNavigation:
        settings?.headerNavigation && settings.headerNavigation.length > 0
          ? settings.headerNavigation
          : defaultSiteSettings.headerNavigation,
      footerQuickLinks:
        settings?.footerQuickLinks && settings.footerQuickLinks.length > 0
          ? settings.footerQuickLinks
          : defaultSiteSettings.footerQuickLinks,
      footerResourceLinks:
        settings?.footerResourceLinks && settings.footerResourceLinks.length > 0
          ? settings.footerResourceLinks
          : defaultSiteSettings.footerResourceLinks,
    };
  } catch (error) {
    logContentLoadError("site settings", error);
    return defaultSiteSettings;
  }
}
