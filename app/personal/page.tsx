"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { addScore } from "@/lib/queries";
import { PrimaryButton } from "../components/Button";

export default function PersonalPage() {
  const [name, setName] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const score = Number(searchParams.get("score")) || 0;
  const totalQuestions = Number(searchParams.get("total")) || 12;

  const handleSubmit = async () => {
    if (name.trim()) {
      // Add score to Supabase
      await addScore(name, score);
      router.push(`/score?name=${encodeURIComponent(name)}&score=${score}&total=${totalQuestions}`);
    } else {
      alert("Please enter your name!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-main-gradient px-6 sm:px-8 lg:px-12">
      <div className="container mx-auto max-w-full sm:max-w-lg lg:max-w-5xl">
        <h1 className="text-lg md:text-xl font-medium mb-6 text-black leading-relaxed text-left">
          Before we reveal your score, let’s make it personal! Please enter your name below.
        </h1>
        <div className="flex flex-col items-start">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full max-w-lg p-4 mb-6 text-lg text-black bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder-gray-400"
          />
          <PrimaryButton label="SUBMIT" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
