"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Lottie from "lottie-react";
import ScoreDisplay from "./components/ScoreDisplay";
import { PrimaryButton, SecondaryButton } from "../components/Button";

type AnimationData = Record<string, unknown>; // Explicit type for animation data

export default function ScorePage() {
  const [showAnimation, setShowAnimation] = useState(true);
  const [animationData, setAnimationData] = useState<AnimationData | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const name = searchParams.get("name") || "";
  const score = Number(searchParams.get("score")) || 0;
  const totalQuestions = Number(searchParams.get("total")) || 12;

  // Determine motivational quote
  let motivationQuote = "";
  if (score <= 4) {
    motivationQuote = "Don't give up!";
  } else if (score <= 7) {
    motivationQuote = "Keep trying, you’re improving!";
  } else if (score <= 10) {
    motivationQuote = "Excellent!";
  } else {
    motivationQuote = "Outstanding!";
  }

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
    router.push("/"); // Redirect to homepage or leaderboard page
  };

  useEffect(() => {
    fetch("/animations/PartyPopper.json")
      .then((res) => res.json())
      .then((data: AnimationData) => setAnimationData(data))
      .catch((error) => console.error("Failed to load animation:", error));

    const timer = setTimeout(() => setShowAnimation(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-main-gradient px-8 py-12 relative font-poppins">
      {showAnimation && animationData && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <Lottie
            animationData={animationData}
            loop={false}
            autoplay
            style={{ width: 300, height: 300 }}
          />
        </div>
      )}

      {!showAnimation && (
        <div className="text-center max-w-lg relative z-10">
          <h1 className="text-3xl font-bold mb-6 text-black">
            Congratulations, {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}!
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
      )}
    </div>
  );
}
