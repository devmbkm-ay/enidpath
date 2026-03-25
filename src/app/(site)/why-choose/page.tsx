import WhyChooseClient, { defaultWhyChooseContent } from "./WhyChooseClient";
import { getPageContent } from "@/lib/site-content";

export default async function WhyChoose() {
  const pageContent = await getPageContent("why-choose");
  const pageData = {
    ...defaultWhyChooseContent,
    ...pageContent,
    reasons: pageContent?.reasons?.length ? pageContent.reasons : [],
    expectationPoints:
      pageContent?.expectationPoints?.length ? pageContent.expectationPoints : [],
    commitmentBadges:
      pageContent?.commitmentBadges?.length ? pageContent.commitmentBadges : [],
  };

  return <WhyChooseClient pageData={pageData} />;
}
