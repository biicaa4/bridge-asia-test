"use client";

import { useEffect, useState } from "react";

interface ScoreDisplayProps {
  score: number;
  totalQuestions: number;
  motivationQuote: string;
}

export default function ScoreDisplay({
  score,
  totalQuestions,
  motivationQuote,
}: ScoreDisplayProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    const scoreIncrement = score / 100;
    const percentageIncrement = (score / totalQuestions) * 100 / 100;
    let currentScore = 0;
    let currentPercentage = 0;

    const interval = setInterval(() => {
      currentScore += scoreIncrement;
      currentPercentage += percentageIncrement;

      if (currentScore >= score || currentPercentage >= (score / totalQuestions) * 100) {
        setAnimatedScore(score);
        setAnimatedPercentage((score / totalQuestions) * 100);
        clearInterval(interval);
      } else {
        setAnimatedScore(currentScore);
        setAnimatedPercentage(currentPercentage);
      }
    }, 10); // Animates in 1 second (100ms intervals for 100 frames)

    return () => clearInterval(interval);
  }, [score, totalQuestions]);

  return (
    <div className="flex flex-col items-center justify-center w-full px-6 sm:px-8 lg:px-12 py-10">
      {/* Circular Progress Bar */}
      <div className="relative flex items-center justify-center w-64 h-64 mb-12">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 36 36">
          {/* Background Circle */}
          <circle
            cx="18"
            cy="18"
            r="16"
            strokeWidth="2"
            className="stroke-gray-300"
            fill="none"
          />
          {/* Progress Circle */}
          <circle
            cx="18"
            cy="18"
            r="16"
            strokeWidth="2.5"
            className="stroke-primary"
            fill="none"
            strokeDasharray="100"
            strokeDashoffset={100 - animatedPercentage}
            strokeLinecap="round"
          />
        </svg>

        {/* Text Inside Circle */}
        <div className="absolute flex flex-col items-center justify-center">
          <p className="text-xs font-light font-poppins text-gray-600 mb-2">
            Questions passed
          </p>
          <div className="flex items-baseline">
            <p className="text-5xl font-bold text-black">
              {Math.floor(animatedScore)}
            </p>
            <span className="text-xl font-medium text-gray-700 ml-1">
              /{totalQuestions}
            </span>
          </div>
          <div className="w-16 border-t-2 border-black mt-3 mb-4"></div>
          <p className="text-lg italic text-gray-600">{motivationQuote}</p>
        </div>
      </div>
    </div>
  );
}
