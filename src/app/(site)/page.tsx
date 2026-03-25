import HomeClient, { defaultHomeContent } from "./HomeClient";
import { getHomeContent } from "@/lib/site-content";

export default async function Home() {
  const homeContent = await getHomeContent();
  const homeData = {
    ...defaultHomeContent,
    ...homeContent,
    stats: homeContent?.stats?.length ? homeContent.stats : defaultHomeContent.stats,
    trustIndicators:
      homeContent?.trustIndicators?.length
        ? homeContent.trustIndicators
        : defaultHomeContent.trustIndicators,
    features: homeContent?.features?.length ? homeContent.features : defaultHomeContent.features,
    partnershipBadges:
      homeContent?.partnershipBadges?.length
        ? homeContent.partnershipBadges
        : defaultHomeContent.partnershipBadges,
  };

  return <HomeClient homeData={homeData} />;
}
