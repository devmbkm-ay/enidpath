"use client";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { defaultSiteSettings } from "@/lib/site-settings";
import { useLivePreviewGlobalData } from "@/components/LivePreviewProvider";

type LayoutShellProps = {
  children: React.ReactNode;
  siteSettings?: typeof defaultSiteSettings;
};

export function LayoutShell({
  children,
  siteSettings = defaultSiteSettings,
}: LayoutShellProps) {
  const previewSiteSettings = useLivePreviewGlobalData("SiteSettings", siteSettings);

  return (
    <div className="min-h-screen flex flex-col">
      <Header siteSettings={previewSiteSettings} />
      <main className="flex-1">{children}</main>
      <Footer siteSettings={previewSiteSettings} />
    </div>
  );
}
