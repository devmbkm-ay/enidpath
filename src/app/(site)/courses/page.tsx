import CoursesClient, { defaultCoursesContent } from "./CoursesClient";
import { getPayload } from "@/lib/payload";
import { getPageContent } from "@/lib/site-content";

export default async function CoursesPage() {
  const payload = await getPayload();
  const [{ docs: courses }, pageContent] = await Promise.all([
    payload.find({
      collection: "CourseItems",
      limit: 100,
    }),
    getPageContent("courses"),
  ]);

  const pageData = {
    ...defaultCoursesContent,
    ...pageContent,
    levelDescriptions:
      pageContent?.levelDescriptions?.length ? pageContent.levelDescriptions : [],
  };

  return <CoursesClient courses={courses} pageData={pageData} />;
}
