import { getPayload } from "@/lib/payload";
import { defaultSiteSettings } from "@/lib/site-settings";

export async function getPageContent(slug: string) {
  const payload = await getPayload();
  const { docs } = await payload.find({
    collection: "Pages",
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  });

  return docs[0] ?? null;
}

export async function getHomeContent() {
  const payload = await getPayload();
  return payload.findGlobal({
    slug: "HomeSettings",
    depth: 1,
  });
}

export async function getSiteSettings() {
  const payload = await getPayload();

  try {
    const settings = await payload.findGlobal({
      slug: "SiteSettings",
    });

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
  } catch {
    return defaultSiteSettings;
  }
}
