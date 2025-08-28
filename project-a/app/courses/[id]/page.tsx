"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";

// Simple, local VM for the page
type CourseVM = { id: number; title: string; price: number };

export default function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { state, addItem } = useCart();

  const [id, setId] = useState<number | null>(null);
  const [courseData, setCourseData] = useState<CourseVM | null>(null);
  const [loading, setLoading] = useState(true);

  // Unwrap Next.js params (Next 15+ may pass a Promise)
  useEffect(() => {
    let mounted = true;
    params.then((p) => {
      if (!mounted) return;
      const courseId = Number(p.id);
      setId(courseId);
      // Stub: replace with real API call if available
      setCourseData({ id: courseId, title: "Introduction to Web Development", price: 80 });
      setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, [params]);

  if (loading) return <div className="p-6">Loading…</div>;
  if (!courseData || id == null) return <div className="p-6">Course not found.</div>;

  const isInCart = state.items?.some((i) => i.id === courseData.id) ?? false;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">{courseData.title}</h1>
      <div className="text-gray-700">${courseData.price.toFixed(2)}</div>

      <Button
        className="w-full"
        disabled={isInCart}
        onClick={() => addItem({ id: courseData.id, name: courseData.title, price: courseData.price, qty: 1 })}
      >
        {isInCart ? "Already in Cart" : "Add to Cart"}
      </Button>

      <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
        ← Back to Home
      </Link>
    </div>
  );
}
