"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BookOpen, Filter, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  useLivePreviewCollectionDocs,
  useLivePreviewPageData,
} from "@/components/LivePreviewProvider";

const levelDescriptions: Record<string, string> = {
  IGCSE: "International General Certificate of Secondary Education",
  IELTS: "International English Language Testing System",
  "Level 3": "Foundation Level - Entry to Higher Education",
  "Level 4": "Certificate Level - First Year Undergraduate Equivalent",
  "Level 5": "Diploma Level - Second Year Undergraduate Equivalent",
  "Level 4 & 5": "Extended Diploma - Two Year Programme",
  "Level 6": "Bachelor's Degree Top-Up Level",
  "Level 7": "Master's Degree Level",
};

export const defaultCoursesContent = {
  heroTitle: "Available Courses",
  heroSubtitle:
    "Explore the full range of UK-accredited programmes delivered by Online Business School (UK). EnidPath International provides guidance and support throughout your learning journey.",
  filterLabel: "Filter by Level:",
  disclaimerText:
    "All courses listed are delivered and accredited by Online Business School (UK). EnidPath International is an authorised recruitment and student support partner. Contact us for guidance on course selection and enrolment support.",
  ctaTitle: "Need Help Choosing a Course?",
  ctaBody:
    "Our counsellors are here to help you find the right programme for your career goals. Get personalised guidance from EnidPath International.",
  ctaPrimaryLabel: "Contact Our Team",
  ctaPrimaryHref: "/contact",
};

type Course = {
  id?: string;
  name?: string;
  level?: string;
  credits?: string | null;
};

type LevelDescription = {
  id?: string;
  level?: string;
  description?: string;
};

type CoursesPageData = typeof defaultCoursesContent & {
  levelDescriptions?: LevelDescription[];
};

type CoursesClientProps = {
  courses: Course[];
  pageData: CoursesPageData;
};

export default function CoursesClient({
  courses,
  pageData,
}: CoursesClientProps) {
  const liveCourses = useLivePreviewCollectionDocs("CourseItems", courses);
  const livePageData = useLivePreviewPageData("courses", pageData);
  const [selectedLevel, setSelectedLevel] = useState("All");

  const courseLevels = useMemo(
    () => ["All", ...new Set(liveCourses.map((course) => course.level).filter(Boolean))],
    [liveCourses],
  );

  const filteredCourses =
    selectedLevel === "All"
      ? liveCourses
      : liveCourses.filter((course) => course.level === selectedLevel);

  const groupedCourses = filteredCourses.reduce<Record<string, Course[]>>(
    (acc, course) => {
      const level = course.level || "Other";
      if (!acc[level]) {
        acc[level] = [];
      }
      acc[level].push(course);
      return acc;
    },
    {},
  );

  const levelDescriptionMap = (livePageData.levelDescriptions || []).reduce(
    (acc: Record<string, string>, item) => {
      if (item.level && item.description) {
        acc[item.level] = item.description;
      }
      return acc;
    },
    { ...levelDescriptions },
  );

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary via-primary to-primary-800 py-20 text-primary-foreground">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-accent/20 p-4">
                <GraduationCap className="h-12 w-12 text-accent" />
              </div>
            </div>
            <h1 className="mb-6 text-4xl font-display font-bold md:text-5xl">
              {livePageData.heroTitle || defaultCoursesContent.heroTitle}
            </h1>
            <p className="text-xl leading-relaxed text-primary-foreground/90">
              {livePageData.heroSubtitle || defaultCoursesContent.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="sticky top-0 z-10 border-b border-border bg-secondary/50 py-6">
        <div className="container">
          <div className="mb-4 flex items-center gap-3">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium text-foreground">
              {livePageData.filterLabel || defaultCoursesContent.filterLabel}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {courseLevels.map((level) => (
              <Button
                key={level}
                variant={selectedLevel === level ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLevel(level)}
                className="transition-all"
              >
                {level}
                {level !== "All" && (
                  <Badge variant="secondary" className="ml-2 bg-background/20">
                    {liveCourses.filter((course) => course.level === level).length}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="container">
          <div className="mb-8">
            <p className="text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {filteredCourses.length}
              </span>{" "}
              courses
              {selectedLevel !== "All" && (
                <>
                  {" "}
                  in{" "}
                  <span className="font-semibold text-foreground">
                    {selectedLevel}
                  </span>
                </>
              )}
            </p>
          </div>

          <div className="space-y-12">
            {Object.entries(groupedCourses).map(([level, levelCourses]) => (
              <div key={level}>
                <div className="mb-6">
                  <h2 className="mb-2 text-2xl font-display font-bold text-foreground">
                    {level}
                  </h2>
                  <p className="text-muted-foreground">{levelDescriptionMap[level]}</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {levelCourses.map((course, index) => (
                    <Card
                      key={course.id ?? `${level}-${course.name ?? "course"}-${index}`}
                      className="border-border transition-shadow hover:border-primary/30 hover:shadow-lg"
                    >
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <div className="shrink-0 rounded-lg bg-primary/10 p-2">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="mb-1 font-semibold leading-tight text-foreground">
                              {course.name}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2">
                              {course.level && (
                                <Badge variant="outline" className="text-xs">
                                  {course.level}
                                </Badge>
                              )}
                              {course.credits && (
                                <Badge variant="secondary" className="text-xs">
                                  {course.credits}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-lg border border-border bg-secondary/50 p-6">
            <p className="text-center text-sm text-muted-foreground">
              {livePageData.disclaimerText || defaultCoursesContent.disclaimerText}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container text-center">
          <h2 className="mb-4 text-3xl font-display font-bold">
            {livePageData.ctaTitle || defaultCoursesContent.ctaTitle}
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-primary-foreground/90">
            {livePageData.ctaBody || defaultCoursesContent.ctaBody}
          </p>
          <Button variant="accent" size="lg" asChild>
            <Link href={livePageData.ctaPrimaryHref || "/contact"}>
              {livePageData.ctaPrimaryLabel || defaultCoursesContent.ctaPrimaryLabel}
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
