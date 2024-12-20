"use client";

import { useState } from "react";
import ProgressBar from "./components/ProgressBar";
import Question from "./components/Question";
import CountdownTimer from "../components/CountdownTimer";
import { PrimaryButton, SecondaryButton } from "../components/Button";
import { useRouter } from "next/navigation";

const TOTAL_QUESTIONS = 12;

export default function QuestionsPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  const [userAnswers, setUserAnswers] = useState<(string | null)[]>(
    Array(TOTAL_QUESTIONS).fill(null)
  );

  const [answeredStatus, setAnsweredStatus] = useState<boolean[]>(
    Array(TOTAL_QUESTIONS).fill(false)
  );

  const router = useRouter();

  const questions = [
    {
      text: "17 rounded off to the nearest 10 is...",
      options: [
        { label: "10", value: "10" },
        { label: "20", value: "20" },
        { label: "17", value: "17" },
      ],
      answer: "20",
    },
    {
      text: "75 rounded off to the nearest 10 is...",
      options: [
        { label: "70", value: "70" },
        { label: "80", value: "80" },
        { label: "175", value: "175" },
      ],
      answer: "80",
    },
    {
      text: "64 rounded off to the nearest 10 is...",
      options: [
        { label: "64", value: "64" },
        { label: "70", value: "70" },
        { label: "60", value: "60" },
      ],
      answer: "60",
    },
    {
      text: "98 rounded off to the nearest 10 is...",
      options: [
        { label: "80", value: "80" },
        { label: "100", value: "100" },
        { label: "89", value: "89" },
      ],
      answer: "100",
    },
    {
      text: "94 rounded off to the nearest 10 is...",
      options: [
        { label: "100", value: "100" },
        { label: "94", value: "94" },
        { label: "90", value: "90" },
      ],
      answer: "90",
    },
    {
      text: "445 rounded off to the nearest 10 is...",
      options: [
        { label: "450", value: "450" },
        { label: "440", value: "440" },
        { label: "500", value: "500" },
      ],
      answer: "450",
    },
    {
      text: "45 rounded off to the nearest 10 is...",
      options: [
        { label: "50", value: "50" },
        { label: "45", value: "45" },
        { label: "40", value: "40" },
      ],
      answer: "50",
    },
    {
      text: "19 rounded off to the nearest 10 is...",
      options: [
        { label: "20", value: "20" },
        { label: "10", value: "10" },
        { label: "19", value: "19" },
      ],
      answer: "20",
    },
    {
      text: "0 rounded off to the nearest 10 is...",
      options: [
        { label: "10", value: "10" },
        { label: "1", value: "1" },
        { label: "0", value: "0" },
      ],
      answer: "0",
    },
    {
      text: "199 rounded off to the nearest 10 is...",
      options: [
        { label: "190", value: "190" },
        { label: "100", value: "100" },
        { label: "200", value: "200" },
      ],
      answer: "200",
    },
    {
      text: "165 rounded off to the nearest 10 is...",
      options: [
        { label: "160", value: "160" },
        { label: "170", value: "170" },
        { label: "150", value: "150" },
      ],
      answer: "170",
    },
    {
      text: "999 rounded off to the nearest 10 is...",
      options: [
        { label: "990", value: "990" },
        { label: "1,000", value: "1,000" },
        { label: "909", value: "909" },
      ],
      answer: "1,000",
    },
  ];

  const currentQuestion = questions[currentQuestionIndex];
  const selectedOption = userAnswers[currentQuestionIndex];

  const percentage = Math.min(
    Math.floor((answeredQuestions / TOTAL_QUESTIONS) * 100),
    100
  );

  const handleCountdownComplete = () => {
    setIsQuizStarted(true);
  };

  const handleSelectOption = (value: string) => {
    const newAnswers = [...userAnswers];
    const wasPreviouslyUnanswered = userAnswers[currentQuestionIndex] === null;

    newAnswers[currentQuestionIndex] = value;
    setUserAnswers(newAnswers);

    if (wasPreviouslyUnanswered) {
      const newAnsweredStatus = [...answeredStatus];
      newAnsweredStatus[currentQuestionIndex] = true;
      setAnsweredStatus(newAnsweredStatus);
      setAnsweredQuestions(answeredQuestions + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < TOTAL_QUESTIONS - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = () => {
    return questions.reduce(
      (score, question, index) =>
        userAnswers[index] === question.answer ? score + 1 : score,
      0
    );
  };

  const handleFinish = () => {
    const finalScore = calculateScore();
    router.push(`/personal?score=${finalScore}&total=${TOTAL_QUESTIONS}`);
  };

  return (
    <div className="container min-h-screen p-8 relative flex flex-col items-center font-poppins">
      {/* Countdown Timer */}
      {!isQuizStarted && (
        <CountdownTimer
          title="Title: Rounding Off to Nearest 10"
          subtitle="Quiz starting in..."
          onComplete={handleCountdownComplete}
        />
      )}

      {isQuizStarted && (
        <div className="w-full max-w-4xl flex flex-col items-center space-y-8">
          {/* Parent Container for ProgressBar and Question */}
          <div className="w-full flex flex-col items-center space-y-8">
            {/* Progress Bar */}
            <div className="w-full max-w-3xl flex justify-end">
              <ProgressBar percentage={percentage} />
            </div>

            {/* Question Container */}
            <div className="w-full max-w-3xl mt-8">
              <Question
                questionText={currentQuestion.text}
                options={currentQuestion.options}
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={TOTAL_QUESTIONS}
                selectedOption={selectedOption}
                onSelectOption={handleSelectOption}
              />
            </div>
          </div>

          {/* Pagination Buttons */}
          <div className="flex justify-between items-center w-full max-w-3xl">
            {currentQuestionIndex > 0 ? (
              <SecondaryButton
                label="Previous"
                onClick={handlePrevious}
                arrowDirection="left"
              />
            ) : (
              <div></div>
            )}

            {currentQuestionIndex === TOTAL_QUESTIONS - 1 ? (
              <PrimaryButton label="Finish" onClick={handleFinish} />
            ) : (
              <SecondaryButton
                label="Next"
                onClick={handleNext}
                arrowDirection="right"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
