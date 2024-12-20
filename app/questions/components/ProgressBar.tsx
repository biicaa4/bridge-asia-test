"use client";

import { useEffect, useState } from "react";

export default function ProgressBar({ percentage }: { percentage: number }) {
  const radius = 16; // Circle radius
  const circumference = 2 * Math.PI * radius; // Circle circumference

  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    // Start always from 0 to 'percentage'
    const start = 0;
    const end = percentage;
    const duration = 1000; // Animation duration in ms
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const nextValue = start + progress * (end - start);

      setAnimatedPercentage(nextValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [percentage]); // Only depends on 'percentage'

  const displayedValue = Math.round(animatedPercentage);
  const offset = circumference - (animatedPercentage / 100) * circumference;

  return (
    <div
      className="relative flex flex-col items-center justify-center w-28 h-28"
      role="progressbar"
      aria-valuenow={displayedValue}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Outer Circle */}
      <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 40 40">
        <circle
          cx="20"
          cy="20"
          r={radius}
          strokeWidth="2"
          className="stroke-white opacity-20"
          fill="none"
        />
      </svg>

      {/* Progress Circle */}
      <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 40 40">
        <circle
          cx="20"
          cy="20"
          r={radius}
          strokeWidth="2"
          className="stroke-primary transition-[stroke-dashoffset] duration-500 ease-in-out"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>

      {/* Text Content */}
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-2xl font-bold font-poppins">{displayedValue}%</span>
        <span className="text-[10px] font-light text-gray-600 font-poppins">Progress</span>
      </div>
    </div>
  );
}
