import CoursesClient, { defaultCoursesContent } from "./CoursesClient";
import { getCollectionDocs, getPageContent } from "@/lib/site-content";

export default async function CoursesPage() {
  const [courses, pageContent] = await Promise.all([
    getCollectionDocs("CourseItems"),
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
