import ContactClient, { defaultContactContent } from "./ContactClient";
import { getPageContent, getSiteSettings } from "@/lib/site-content";

export default async function ContactPage() {
  const [pageContent, siteSettings] = await Promise.all([
    getPageContent("contact"),
    getSiteSettings(),
  ]);

  const pageData = {
    ...defaultContactContent,
    ...pageContent,
  };

  return <ContactClient pageData={pageData} siteSettings={siteSettings} />;
}
