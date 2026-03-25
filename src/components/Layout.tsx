import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { getSiteSettings } from "@/lib/site-content";

interface LayoutProps {
  children: ReactNode;
}

export async function Layout({ children }: LayoutProps) {
  const siteSettings = await getSiteSettings();

  return (
    <div className="min-h-screen flex flex-col">
      <Header siteSettings={siteSettings} />
      <main className="flex-1">{children}</main>
      <Footer siteSettings={siteSettings} />
    </div>
  );
}
