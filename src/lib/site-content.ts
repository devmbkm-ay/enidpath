import { getPayload } from "@/lib/payload";
import { defaultSiteSettings } from "@/lib/site-settings";

function logContentLoadError(scope: string, error: unknown) {
  console.error(`[site-content] Failed to load ${scope}`, error);
}

export async function getPageContent(slug: string) {
  try {
    const payload = await getPayload();
    const { docs } = await payload.find({
      collection: "Pages",
      overrideAccess: true,
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    });

    return docs[0] ?? null;
  } catch (error) {
    logContentLoadError(`page content for "${slug}"`, error);
    return null;
  }
}

export async function getHomeContent() {
  try {
    const payload = await getPayload();
    return await payload.findGlobal({
      slug: "HomeSettings",
      depth: 1,
      overrideAccess: true,
    });
  } catch (error) {
    logContentLoadError("home settings", error);
    return null;
  }
}

export async function getCollectionDocs<T>(collection: "CourseItems" | "Programmes") {
  try {
    const payload = await getPayload();
    const { docs } = await payload.find({
      collection,
      limit: 100,
      overrideAccess: true,
    });

    return docs as T[];
  } catch (error) {
    logContentLoadError(`${collection} collection`, error);
    return [] as T[];
  }
}

export async function getSiteSettings() {
  try {
    const payload = await getPayload();
    const settings = await payload.findGlobal({
      slug: "SiteSettings",
      overrideAccess: true,
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
  } catch (error) {
    logContentLoadError("site settings", error);
    return defaultSiteSettings;
  }
}
