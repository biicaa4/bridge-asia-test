"use client";

const optionLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

export default function Question({
  questionText,
  options,
  questionNumber,
  totalQuestions,
  selectedOption,
  onSelectOption,
}: {
  questionText: string;
  options: { label: string; value: string }[];
  questionNumber: number;
  totalQuestions: number;
  selectedOption: string | null;
  onSelectOption: (value: string) => void;
}) {
  return (
    <div className="w-full bg-transparent p-6">
      {/* Question Header */}
      <p className="text-sm text-gray-800 mb-2">
        Question {questionNumber} of {totalQuestions}
      </p>
      <h2 className="text-2xl font-bold mb-6">{questionText}</h2>

      {/* Options */}
      <ul className="space-y-4">
        {options.map((option, index) => (
          <li key={index} className="flex items-center">
            <input
              id={`option-${index}`}
              type="radio"
              name="question"
              value={option.value}
              checked={selectedOption === option.value}
              onChange={() => onSelectOption(option.value)}
              className="hidden"
            />
            <label
              htmlFor={`option-${index}`}
              className="flex items-center space-x-4 cursor-pointer"
            >
              {/* Custom Radio Button */}
              <span
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                  selectedOption === option.value
                    ? "border-main-gradient bg-primary"
                    : "border-gray-300 bg-transparent"
                }`}
              ></span>
              <span className="text-lg font-medium">
                {optionLetters[index]}. {option.label}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
