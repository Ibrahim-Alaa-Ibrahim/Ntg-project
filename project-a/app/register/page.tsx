"use client";

import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Create your account</h1>

        {/* TODO: replace with the real form */}
        <div className="rounded-lg border p-6 bg-white">
          <p className="text-sm text-gray-600">Registration form goes here.</p>
        </div>

        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
