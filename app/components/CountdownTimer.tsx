"use client";

import { useState, useEffect } from "react";

export default function CountdownTimer({
  title,
  subtitle,
  onComplete,
}: {
  title: string;
  subtitle: string;
  onComplete: () => void;
}) {
  const [count, setCount] = useState(5);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      onComplete();
    }
  }, [count, onComplete]);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-50 p-8">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-xl font-bold text-black text-center">{title}</h1>
        <h2 className="text-2xl font-semibold text-black text-center">{subtitle}</h2>
        <div className="text-6xl font-bold text-black font-pressstart">
          {count}
        </div>
      </div>
    </div>
  );
}
