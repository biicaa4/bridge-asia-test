"use client";

import ArrowLeft from "../components/ArrowLeft";
import ArrowRight from "../components/ArrowRight";

interface ButtonProps {
  label: string;
  onClick: () => void;
  customStyles?: string; // Optional custom styles
}

export function PrimaryButton({ label, onClick, customStyles = "" }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={` ${customStyles} bg-primary text-white py-2 px-6 rounded-lg font-medium text-base hover:bg-opacity-90 focus:outline-none`}
    >
      {label}
    </button>
  );
}

interface SecondaryButtonProps extends ButtonProps {
  arrowDirection?: "left" | "right"; // Optional direction for arrows
}

export function SecondaryButton({
  label,
  onClick,
  arrowDirection,
  customStyles = "",
}: SecondaryButtonProps) {
  return (
    <button
      onClick={onClick}
      className={` ${customStyles} flex items-center text-black text-base font-medium hover:underline focus:outline-none`}
    >
      {arrowDirection === "left" && (
        <ArrowLeft className="w-5 h-5 text-black mr-2" />
      )}
      <span>{label}</span>
      {arrowDirection === "right" && (
        <ArrowRight className="w-5 h-5 text-black ml-2" />
      )}
    </button>
  );
}
