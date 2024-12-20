"use client";

import { useSearchParams, useRouter } from "next/navigation";
import ScoreDisplay from "./components/ScoreDisplay";
import { PrimaryButton, SecondaryButton } from "../components/Button";

// Skip pre-rendering this page
export const dynamic = "force-dynamic";

export default function ScorePage() {
  const searchParams = useSearchParams(); // Wrapped in a Suspense boundary by Next.js
  const router = useRouter();

  const name = searchParams.get("name") || "";
  const score = Number(searchParams.get("score")) || 0;
  const totalQuestions = Number(searchParams.get("total")) || 12;

  // Determine motivational quote
  const motivationQuote =
    score <= 4
      ? "Don't give up!"
      : score <= 7
      ? "Keep trying, you’re improving!"
      : score <= 10
      ? "Excellent!"
      : "Outstanding!";

  const handleRetry = () => {
    router.push("/questions");
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/score?name=${encodeURIComponent(
      name
    )}&score=${score}&total=${totalQuestions}`;

    const message = encodeURIComponent(
      `Check out my quiz score: ${score}/${totalQuestions}! Can you beat it?\n${shareUrl}`
    );

    const whatsappLink = `https://wa.me/?text=${message}`;

    window.open(whatsappLink, "_blank");
  };

  const handleBackToLeaderboard = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-main-gradient px-8 py-12 font-poppins">
      <div className="text-center max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-black">
          Congratulations,{" "}
          {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}!
        </h1>
        <ScoreDisplay
          score={score}
          totalQuestions={totalQuestions}
          motivationQuote={motivationQuote}
        />
        <div className="flex flex-wrap justify-center gap-4 md:flex-nowrap mt-6">
          <PrimaryButton
            label="Not Satisfied? Retry!"
            onClick={handleRetry}
            customStyles="bg-white !text-primary border border-primary hover:bg-gray-100 hover:text-primary transition-colors px-8 py-3 rounded-full font-medium text-lg shadow-md"
          />
          <PrimaryButton
            label="Share the Glory!"
            onClick={handleShare}
            customStyles="bg-primary text-white border border-primary hover:bg-opacity-90 transition-colors px-8 py-3 rounded-full font-medium text-lg shadow-md"
          />
        </div>
        <div className="mt-6 flex flex-wrap justify-center">
          <SecondaryButton
            label="Back to leaderboard"
            onClick={handleBackToLeaderboard}
            arrowDirection="right"
          />
        </div>
      </div>
    </div>
  );
}
