'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function CoursePage({ params }: PageProps) {
  const { id } = use(params);
  const courseId = Number(id);

  const cart = useCart() as any;
  const addItem = typeof cart?.addItem === 'function' ? cart.addItem : cart?.addToCart;
  const isInCart = typeof cart?.isInCart === 'function' ? cart.isInCart : () => false;

  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = { id: courseId, title: `Course #${courseId}`, price: 99 };
        if (mounted) setCourseData(data);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [courseId]);

  if (loading) return <div className="p-6">Loading…</div>;
  if (!courseData) return <div className="p-6">Course not found.</div>;

  const inCart = isInCart(courseId);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">{courseData.title}</h1>
      <div className="text-gray-700">${courseData.price}</div>

      <Button
        className="w-full"
        disabled={inCart || !addItem}
        onClick={() =>
          addItem?.({
            id: courseId,
            name: courseData.title,
            price: courseData.price,
            qty: 1,
          })
        }
      >
        {inCart ? 'Already in Cart' : 'Add to Cart'}
      </Button>

      <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
        ← Back to Home
      </Link>
    </div>
  );
}
