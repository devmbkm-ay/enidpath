import AboutClient, { defaultAboutContent } from "./AboutClient";
import { getPageContent } from "@/lib/site-content";

export default async function About() {
  const pageContent = await getPageContent("about");
  const pageData = {
    ...defaultAboutContent,
    ...pageContent,
    overviewParagraphs:
      pageContent?.overviewParagraphs?.length
        ? pageContent.overviewParagraphs
        : defaultAboutContent.overviewParagraphs,
  };

  return <AboutClient pageData={pageData} />;
}
