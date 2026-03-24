"use client";

import Link from "next/link";
import { useState } from "react";
import { BookOpen, GraduationCap, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { courses, courseLevels } from "@/data/courses";
import { CourseLevel } from "@/types/course";

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

const Courses = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>("All");

  const filteredCourses = selectedLevel === "All"
    ? courses
    : courses.filter((course) => course.level === selectedLevel);

  const groupedCourses = filteredCourses.reduce((acc, course) => {
    if (!acc[course.level]) {
      acc[course.level] = [];
    }
    acc[course.level].push(course);
    return acc;
  }, {} as Record<CourseLevel, typeof courses>);

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
              Available Courses
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Explore the full range of UK-accredited programmes delivered by Online Business School (UK). 
              EnidPath International provides guidance and support throughout your learning journey.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-secondary/50 border-b border-border py-6 sticky top-0 z-10">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium text-foreground">Filter by Level:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {courseLevels.map((level) => (
              <Button
                key={level}
                variant={selectedLevel === level ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLevel(level as string)}
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
            {Object.entries(groupedCourses).map(([level, levelCourses]) => (
              <div key={level}>
                <div className="mb-6">
                  <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                    {level}
                  </h2>
                  <p className="text-muted-foreground">
                    {levelDescriptions[level]}
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {levelCourses.map((course) => (
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
            ))}
          </div>

          {/* Disclaimer */}
          <div className="mt-16 p-6 bg-secondary/50 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground text-center">
              All courses listed are delivered and accredited by <strong>Online Business School (UK)</strong>. 
              EnidPath International is an authorised recruitment and student support partner. 
              Contact us for guidance on course selection and enrolment support.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-display font-bold mb-4">
            Need Help Choosing a Course?
          </h2>
          <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Our counsellors are here to help you find the right programme for your career goals. 
            Get personalised guidance from EnidPath International.
          </p>
          <Button variant="accent" size="lg" asChild>
            <Link href="/contact">Contact Our Team</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Courses;
