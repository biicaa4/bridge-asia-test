"use client";

import { Suspense } from "react";
import ScorePage from "./ScorePage";

export default function ScorePageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ScorePage />
    </Suspense>
  );
}
