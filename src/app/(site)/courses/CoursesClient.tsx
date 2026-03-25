"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import heroCampus from "@/assets/hero-campus.jpg";
import {
  ArrowRight,
  BookOpen,
  Compass,
  Filter,
  GraduationCap,
  Search,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  filterSearchPlaceholder: "Search by course name",
  filterHelperTitle: "Need help choosing the right level?",
  filterHelperBody:
    "Tell us your background and goals, and we will guide you to the best starting point.",
  filterHelperCtaLabel: "Get course guidance",
  filterHelperCtaHref: "/contact",
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

type HeroImage = {
  url?: string;
} | null | string;

type CoursesPageData = typeof defaultCoursesContent & {
  heroImage?: HeroImage;
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
  const [searchQuery, setSearchQuery] = useState("");

  const courseLevels = useMemo(
    () => ["All", ...new Set(liveCourses.map((course) => course.level).filter(Boolean))],
    [liveCourses],
  );

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredCourses = liveCourses.filter((course) => {
    const matchesLevel = selectedLevel === "All" || course.level === selectedLevel;
    const matchesSearch =
      normalizedQuery.length === 0 ||
      (course.name || "").toLowerCase().includes(normalizedQuery);

    return matchesLevel && matchesSearch;
  });

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

  const totalLevels = courseLevels.filter((level) => level !== "All").length;
  const heroImage =
    typeof livePageData.heroImage === "string"
      ? livePageData.heroImage
      : livePageData.heroImage?.url || heroCampus.src;
  const activeDescription =
    selectedLevel !== "All"
      ? levelDescriptionMap[selectedLevel]
      : "Browse every available pathway and compare options by level.";
  const hasActiveFilters = selectedLevel !== "All" || normalizedQuery.length > 0;
  const heroStats = [
    { label: "Courses available", value: String(liveCourses.length) },
    { label: "Qualification levels", value: String(totalLevels) },
    { label: "Guided support", value: "1:1" },
  ];
  const featuredLevelGuides = Object.entries(levelDescriptionMap).slice(0, 4);

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden py-16 text-primary-foreground md:py-20">
        <div className="hero-orb hero-orb--gold left-[8%] top-[16%] h-36 w-36 md:h-48 md:w-48" />
        <div className="hero-orb hero-orb--blue bottom-[8%] right-[12%] h-44 w-44 md:h-56 md:w-56" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.72)_0%,rgba(15,23,42,0.82)_48%,rgba(15,23,42,0.9)_100%)]" />

        <div className="container relative z-10">
          <div className="mx-auto max-w-5xl">
            <Reveal className="px-4 py-6 md:px-8 md:py-10">
              <div className="mx-auto max-w-3xl text-center">
                <div className="mb-6 flex justify-center">
                  <div className="motion-chip rounded-full bg-accent/20 p-4">
                    <GraduationCap className="h-12 w-12 text-accent" />
                  </div>
                </div>

                <h1 className="mb-4 text-4xl font-display font-bold md:text-5xl">
                  {livePageData.heroTitle || defaultCoursesContent.heroTitle}
                </h1>

                <p className="mx-auto max-w-2xl text-lg leading-relaxed text-primary-foreground/90 md:text-xl">
                  {livePageData.heroSubtitle || defaultCoursesContent.heroSubtitle}
                </p>
              </div>

              <div className="mx-auto mt-8 grid max-w-4xl gap-4 md:grid-cols-3">
                {heroStats.map((stat, index) => (
                  <Reveal
                    key={stat.label}
                    delay={120 + index * 70}
                    className="hero-sheen rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-center backdrop-blur-sm"
                  >
                    <div className="text-3xl font-display font-bold text-accent">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-sm text-primary-foreground/75">
                      {stat.label}
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-10 bg-background pb-10">
        <div className="container">
          <Reveal className="rounded-[1.75rem] border border-border/70 bg-card p-6 shadow-[0_22px_60px_rgba(15,23,42,0.12)] md:p-8">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.9fr)]">
              <div>
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Filter className="h-4 w-4 text-secondary" />
                    <span>{livePageData.filterLabel || defaultCoursesContent.filterLabel}</span>
                  </div>

                  <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
                    {filteredCourses.length} match{filteredCourses.length === 1 ? "" : "es"}
                  </Badge>

                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedLevel("All");
                        setSearchQuery("");
                      }}
                      className="motion-link inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                      Clear filters
                    </button>
                  )}
                </div>

                <div className="mb-5 grid gap-4 md:grid-cols-[minmax(0,1fr)_auto]">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder={
                        livePageData.filterSearchPlaceholder ||
                        defaultCoursesContent.filterSearchPlaceholder
                      }
                      className="h-12 rounded-xl border-border/70 pl-11"
                    />
                  </div>

                  <div className="flex items-center rounded-xl bg-muted px-4 py-3 text-sm text-muted-foreground">
                    {activeDescription}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {courseLevels.map((level) => {
                    const count =
                      level === "All"
                        ? liveCourses.length
                        : liveCourses.filter((course) => course.level === level).length;

                    return (
                      <Button
                        key={level}
                        variant={selectedLevel === level ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedLevel(level)}
                        className="rounded-full px-4 py-2 transition-all duration-200"
                      >
                        {level}
                        <Badge
                          variant={selectedLevel === level ? "secondary" : "outline"}
                          className="ml-2 rounded-full border-0 bg-background/20 text-[11px]"
                        >
                          {count}
                        </Badge>
                      </Button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-[1.4rem] bg-gradient-to-br from-secondary/8 via-secondary/5 to-accent/10 p-6">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-background/75 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                  <Compass className="h-3.5 w-3.5" />
                  Course Guidance
                </div>

                <h2 className="mb-3 text-2xl font-display font-bold text-foreground">
                  {livePageData.filterHelperTitle || defaultCoursesContent.filterHelperTitle}
                </h2>

                <p className="mb-5 text-sm leading-6 text-muted-foreground">
                  {livePageData.filterHelperBody || defaultCoursesContent.filterHelperBody}
                </p>

                <div className="mb-5 space-y-3">
                  <div className="flex items-center gap-3 rounded-xl bg-background/80 px-4 py-3">
                    <Sparkles className="h-4 w-4 text-accent" />
                    <span className="text-sm text-foreground">
                      Understand UK levels faster
                    </span>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl bg-background/80 px-4 py-3">
                    <Users className="h-4 w-4 text-secondary" />
                    <span className="text-sm text-foreground">
                      Get 1:1 support before enrolling
                    </span>
                  </div>
                </div>

                <Button variant="accent" className="w-full" asChild>
                  <Link
                    href={
                      livePageData.filterHelperCtaHref ||
                      defaultCoursesContent.filterHelperCtaHref
                    }
                  >
                    {livePageData.filterHelperCtaLabel ||
                      defaultCoursesContent.filterHelperCtaLabel}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-background py-12 md:py-16">
        <div className="container">
          <Reveal className="mb-10 grid gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)] lg:items-end">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                Qualification Guide
              </p>
              <h2 className="text-3xl font-display font-bold text-foreground">
                Explore the course catalogue with more confidence
              </h2>
            </div>

            <p className="text-muted-foreground">
              Each level group below reflects a different stage in the UK education
              pathway. Use the filters to narrow the list, or reach out if you want
              help choosing the best route.
            </p>
          </Reveal>

          <div className="mb-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {featuredLevelGuides.map(([level, description], index) => (
              <Reveal
                key={level}
                delay={index * 70}
                className="motion-card rounded-2xl border border-border/70 bg-card p-5"
              >
                <div className="mb-3 inline-flex rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
                  {level}
                </div>
                <p className="text-sm leading-6 text-muted-foreground">{description}</p>
              </Reveal>
            ))}
          </div>

          {filteredCourses.length === 0 ? (
            <Reveal className="rounded-[1.5rem] border border-dashed border-border bg-muted/40 px-6 py-12 text-center">
              <div className="mx-auto max-w-xl">
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-secondary/10 p-4">
                    <Search className="h-8 w-8 text-secondary" />
                  </div>
                </div>

                <h3 className="mb-3 text-2xl font-display font-bold text-foreground">
                  No courses match your search yet
                </h3>

                <p className="mb-6 text-muted-foreground">
                  Try another keyword, switch to a different level, or clear the
                  filters to explore the full catalogue.
                </p>

                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedLevel("All");
                    setSearchQuery("");
                  }}
                >
                  Reset course filters
                </Button>
              </div>
            </Reveal>
          ) : (
            <div className="space-y-14">
              {Object.entries(groupedCourses).map(([level, levelCourses], groupIndex) => (
                <Reveal key={level} delay={groupIndex * 50}>
                  <div className="rounded-[1.75rem] border border-border/70 bg-card/65 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] md:p-8">
                    <div className="mb-8 flex flex-col gap-4 border-b border-border/70 pb-6 md:flex-row md:items-end md:justify-between">
                      <div>
                        <div className="mb-3 inline-flex rounded-full bg-primary/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                          {level}
                        </div>

                        <h2 className="mb-2 text-3xl font-display font-bold text-foreground">
                          {level}
                        </h2>

                        <p className="max-w-2xl text-muted-foreground">
                          {levelDescriptionMap[level]}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-muted px-4 py-3 text-sm text-muted-foreground">
                        {levelCourses.length} course
                        {levelCourses.length === 1 ? "" : "s"} in this level
                      </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                      {levelCourses.map((course, index) => (
                        <Reveal
                          key={course.id ?? `${level}-${course.name ?? "course"}-${index}`}
                          delay={index * 55}
                          className="h-full"
                        >
                          <Card className="motion-card h-full rounded-[1.4rem] border-border/80 bg-background/90">
                            <CardContent className="flex h-full flex-col p-6">
                              <div className="mb-5 flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/8">
                                  <BookOpen className="h-5 w-5 text-primary" />
                                </div>

                                <div className="min-w-0">
                                  <div className="mb-2 flex flex-wrap items-center gap-2">
                                    {course.level && (
                                      <Badge variant="outline" className="rounded-full text-[11px]">
                                        {course.level}
                                      </Badge>
                                    )}

                                    {course.credits && (
                                      <Badge
                                        variant="secondary"
                                        className="rounded-full text-[11px]"
                                      >
                                        {course.credits}
                                      </Badge>
                                    )}
                                  </div>

                                  <h3 className="text-lg font-semibold leading-snug text-foreground">
                                    {course.name}
                                  </h3>
                                </div>
                              </div>

                              <p className="mb-6 text-sm leading-6 text-muted-foreground">
                                {levelDescriptionMap[level]}
                              </p>

                              <div className="mt-auto flex items-center justify-between gap-4 border-t border-border/70 pt-5">
                                <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                                  Guidance available
                                </div>

                                <Button variant="outline" size="sm" asChild>
                                  <Link href={livePageData.ctaPrimaryHref || "/contact"}>
                                    Enquire
                                    <ArrowRight className="h-4 w-4" />
                                  </Link>
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </Reveal>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          <Reveal className="mt-16 rounded-[1.5rem] border border-border/70 bg-secondary/5 p-6 md:p-8">
            <p className="text-center text-sm leading-6 text-muted-foreground">
              {livePageData.disclaimerText || defaultCoursesContent.disclaimerText}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container">
          <Reveal className="text-center">
            <h2 className="mb-4 text-3xl font-display font-bold">
              {livePageData.ctaTitle || defaultCoursesContent.ctaTitle}
            </h2>

            <p className="mx-auto mb-8 max-w-2xl text-primary-foreground/90">
              {livePageData.ctaBody || defaultCoursesContent.ctaBody}
            </p>

            <Button variant="accent" size="lg" asChild>
              <Link href={livePageData.ctaPrimaryHref || "/contact"}>
                {livePageData.ctaPrimaryLabel || defaultCoursesContent.ctaPrimaryLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
