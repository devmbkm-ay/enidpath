import ServicesClient, { defaultServicesContent } from "./ServicesClient";
import { getPageContent } from "@/lib/site-content";

export default async function Services() {
  const pageContent = await getPageContent("services");
  const pageData = {
    ...defaultServicesContent,
    ...pageContent,
    serviceCards: pageContent?.serviceCards?.length ? pageContent.serviceCards : [],
    processSteps: pageContent?.processSteps?.length ? pageContent.processSteps : [],
  };

  return <ServicesClient pageData={pageData} />;
}
