"use client";

import { Suspense } from "react";
import PersonalPageContent from "./PersonalPageContent";

export default function PersonalPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PersonalPageContent />
    </Suspense>
  );
}
