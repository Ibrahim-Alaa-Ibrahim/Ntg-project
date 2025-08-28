"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart-context";
import { api, type Course as ApiCourse } from "@/lib/api";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star, Award, BookOpen, ArrowLeft, ShieldCheck, Globe, Lock, CheckCircle } from "lucide-react";
import Link from "next/link";

type PageProps = { params: { id: string } };

function mapApiCourseToVM(c: ApiCourse) {
  return {
    id: c.id,
    title: c.title,
    description: c.description ?? "",
    longDescription: (c.description ?? "") + " This is a detailed overview of the course. More fields can be wired from the API later.",
    price: c.basePrice,
    rating: 4.8,
    reviews: 120,
    duration: "12 hours",
    lessons: 30,
    ageGroup: "10-13",
    difficulty: "Beginner",
    prerequisites: ["Basic computer use"],
    outcomes: ["Variables", "Loops", "Functions", "Problem solving"],
    schedule: [
      { week: 1, title: "Intro", lessons: ["Setup", "Your first program"], duration: "3 hours" },
      { week: 2, title: "Variables", lessons: ["Numbers & Strings"], duration: "4 hours" },
    ],
  };
}

export default function CoursePage({ params }: PageProps) {
  const id = Number(params.id);
  const { state, addItem } = useCart();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [course, setCourse] = useState<ApiCourse | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    api.getCourse(id)
      .then(setCourse)
      .catch((e) => setError(e?.message ?? "Failed to load course"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-6">Loading course…</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;
  if (!course) return <div className="p-6">Course not found.</div>;

  const courseData = mapApiCourseToVM(course);
  const isInCart = state.items.some((item) => item.id === courseData.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white/60 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3">
          <Link href="/courses" className="inline-flex items-center gap-2 text-blue-600 hover:underline">
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{courseData.title}</CardTitle>
                  <CardDescription>{courseData.description}</CardDescription>
                </div>
                <Badge variant="secondary" className="text-base">{courseData.ageGroup}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5" /> {courseData.rating} ({courseData.reviews})
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" /> {courseData.duration}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" /> {courseData.lessons} lessons
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{courseData.longDescription}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border bg-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-green-600" />
                    <span className="font-medium">Learning outcomes</span>
                  </div>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    {courseData.outcomes.map((o, i) => (<li key={i}>{o}</li>))}
                  </ul>
                </div>

                <div className="p-4 rounded-lg border bg-white">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-5 h-5 text-indigo-600" />
                    <span className="font-medium">Prerequisites</span>
                  </div>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    {courseData.prerequisites.map((o, i) => (<li key={i}>{o}</li>))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="sticky top-6">
            <CardHeader>
              <div className="flex items-baseline justify-between">
                <CardTitle className="text-2xl">${courseData.price.toFixed(2)}</CardTitle>
                <Badge variant="secondary">Beginner</Badge>
              </div>
              <CardDescription>Lifetime access • Certificate included</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full"
                onClick={() => addItem({ id: courseData.id, name: courseData.title, price: courseData.price, qty: 1 })}
                disabled={isInCart}>
                {isInCart ? "Already in Cart" : "Add to Cart"}
              </Button>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> 30-day refund</div>
                <div className="flex items-center gap-2"><Globe className="w-4 h-4" /> Online, self-paced</div>
                <div className="flex items-center gap-2"><Lock className="w-4 h-4" /> Secure checkout</div>
                <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> Certificate included</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
