"use client";

export default function Pagination({
  onPrevious,
  onNext,
}: {
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex justify-between items-center w-full mt-8">
      <button
        onClick={onPrevious}
        className="text-blue-600 hover:underline flex items-center space-x-1"
      >
        <span>←</span>
        <span>Previous</span>
      </button>
      <button
        onClick={onNext}
        className="text-blue-600 hover:underline flex items-center space-x-1"
      >
        <span>Next</span>
        <span>→</span>
      </button>
    </div>
  );
}
