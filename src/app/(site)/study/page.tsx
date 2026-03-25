import StudyClient, {
  defaultStudyContent,
  defaultStudyProgrammes,
} from "./StudyClient";
import { getCollectionDocs, getPageContent } from "@/lib/site-content";

export default async function Study() {
  const [programmes, pageContent] = await Promise.all([
    getCollectionDocs("Programmes"),
    getPageContent("study"),
  ]);

  const pageData = {
    ...defaultStudyContent,
    ...pageContent,
    aboutParagraphs:
      pageContent?.aboutParagraphs?.length
        ? pageContent.aboutParagraphs
        : defaultStudyContent.aboutParagraphs,
    studyBenefits: pageContent?.studyBenefits?.length ? pageContent.studyBenefits : [],
  };

  return (
    <StudyClient
      pageData={pageData}
      programmes={programmes.length > 0 ? programmes : defaultStudyProgrammes}
    />
  );
}
