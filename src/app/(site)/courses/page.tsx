"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, GraduationCap, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const levelDescriptions: Record<string, string> = {
  "IGCSE": "International General Certificate of Secondary Education",
  "IELTS": "International English Language Testing System",
  "Level 3": "Foundation Level - Entry to Higher Education",
  "Level 4": "Certificate Level - First Year Undergraduate Equivalent",
  "Level 5": "Diploma Level - Second Year Undergraduate Equivalent",
  "Level 4 & 5": "Extended Diploma - Two Year Programme",
  "Level 6": "Bachelor's Degree Top-Up Level",
  "Level 7": "Master's Degree Level",
};

const defaultContent = {
  heroTitle: "Available Courses",
  heroSubtitle: "Explore the full range of UK-accredited programmes delivered by Online Business School (UK). EnidPath International provides guidance and support throughout your learning journey.",
  filterLabel: "Filter by Level:",
  disclaimerText:
    "All courses listed are delivered and accredited by Online Business School (UK). EnidPath International is an authorised recruitment and student support partner. Contact us for guidance on course selection and enrolment support.",
  ctaTitle: "Need Help Choosing a Course?",
  ctaBody:
    "Our counsellors are here to help you find the right programme for your career goals. Get personalised guidance from EnidPath International.",
  ctaPrimaryLabel: "Contact Our Team",
  ctaPrimaryHref: "/contact",
};

const Courses = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [pageData, setPageData] = useState<any>(defaultContent);
  const [selectedLevel, setSelectedLevel] = useState<string>("All");
  const [courseLevels, setCourseLevels] = useState<string[]>(["All"]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [coursesRes, pageRes] = await Promise.all([
          fetch('/api/CourseItems?limit=100'),
          fetch('/api/Pages?where[slug][equals]=courses')
        ]);
        
        const coursesData = await coursesRes.json();
        const pageData = await pageRes.json();

        if (coursesData.docs) {
          setCourses(coursesData.docs);
          const levels = ["All", ...new Set(coursesData.docs.map((c: any) => c.level)) as any];
          setCourseLevels(levels);
        }

        if (pageData.docs && pageData.docs.length > 0) {
          setPageData({
            ...defaultContent,
            ...pageData.docs[0],
          });
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    }
    fetchData();
  }, []);

  const filteredCourses = selectedLevel === "All"
    ? courses
    : courses.filter((course) => course.level === selectedLevel);

  const groupedCourses = filteredCourses.reduce((acc, course) => {
    if (!acc[course.level]) {
      acc[course.level] = [];
    }
    acc[course.level].push(course);
    return acc;
  }, {} as Record<string, any[]>);

  const levelDescriptionMap = (pageData.levelDescriptions || []).reduce(
    (acc: Record<string, string>, item: any) => {
      acc[item.level] = item.description;
      return acc;
    },
    { ...levelDescriptions },
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-primary-800 text-primary-foreground py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-accent/20 rounded-full">
                <GraduationCap className="h-12 w-12 text-accent" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              {pageData.heroTitle || defaultContent.heroTitle}
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              {pageData.heroSubtitle || defaultContent.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-secondary/50 border-b border-border py-6 sticky top-0 z-10">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium text-foreground">
              {pageData.filterLabel || defaultContent.filterLabel}
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
                    {courses.filter(c => c.level === level).length}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses List */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="mb-8">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredCourses.length}</span> courses
              {selectedLevel !== "All" && (
                <> in <span className="font-semibold text-foreground">{selectedLevel}</span></>
              )}
            </p>
          </div>

          <div className="space-y-12">
            {Object.entries(groupedCourses).map(([level, levelCourses]) => {
              const coursesForLevel = levelCourses as any[];

              return (
              <div key={level}>
                <div className="mb-6">
                  <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                    {level}
                  </h2>
                  <p className="text-muted-foreground">
                    {levelDescriptionMap[level]}
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {coursesForLevel.map((course) => (
                    <Card 
                      key={course.id} 
                      className="hover:shadow-lg transition-shadow border-border hover:border-primary/30"
                    >
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground mb-1 leading-tight">
                              {course.name}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {course.level}
                              </Badge>
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
              );
            })}
          </div>

          {/* Disclaimer */}
          <div className="mt-16 p-6 bg-secondary/50 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground text-center">
              {pageData.disclaimerText || defaultContent.disclaimerText}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-display font-bold mb-4">
            {pageData.ctaTitle || defaultContent.ctaTitle}
          </h2>
          <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            {pageData.ctaBody || defaultContent.ctaBody}
          </p>
          <Button variant="accent" size="lg" asChild>
            <Link href={pageData.ctaPrimaryHref || "/contact"}>
              {pageData.ctaPrimaryLabel || defaultContent.ctaPrimaryLabel}
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Courses;
