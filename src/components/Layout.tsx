import { ReactNode } from "react";
import { LayoutShell } from "./LayoutShell";
import { getSiteSettings } from "@/lib/site-content";

interface LayoutProps {
  children: ReactNode;
}

export async function Layout({ children }: LayoutProps) {
  const siteSettings = await getSiteSettings();

  return <LayoutShell siteSettings={siteSettings}>{children}</LayoutShell>;
}
