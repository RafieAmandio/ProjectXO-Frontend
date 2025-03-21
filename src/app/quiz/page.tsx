"use client";

import { useState, useEffect } from "react";

export default function PersonalityQuiz() {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  // Minimal fetch logic (you can adjust the URL or handle errors, loading, etc.)
  useEffect(() => {
    async function loadQuestions() {
      try {
        const res = await fetch("/api/questions");
        const data = await res.json();
        setQuestions(data.content.entries || []);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }
    loadQuestions();
  }, []);

  // Handler to update state for the selected answer.
  const handleSelect = (questionNumber, answer) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionNumber]: answer }));
  };

  return (
    <div
      className="
        min-h-screen
        bg-[#F7FAFC]
        bg-[url('/images/background.svg')]
        bg-no-repeat
        bg-center
        bg-contain
        px-4
        py-20
        md:px-8
      "
    >
      <div className="max-w-4xl mx-auto">

        {/* Quiz Header */}
        <div className="mb-12">
          <h1 className="text-xl font-medium mb-4 font-glancyr">Personality Quiz</h1>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-[#d1d1d1] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#f26241] rounded-full"
              style={{ width: "6.67%" }}
            ></div>
          </div>
          <p className="text-sm mt-2">Step 1 of 15</p>
        </div>

        {/* Questions */}
        <div className="space-y-16">
          {questions.map((q) => {
            const questionNumber = q.display_order; // Use display_order as the "questionNumber"
            return (
              <div key={q.id} className="space-y-4">
                <h2 className="font-medium">Question {questionNumber}</h2>
                <p className="text-[#0d141c] mb-6">
                  {q.question_text}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Option A */}
                  <div
                    onClick={() => handleSelect(questionNumber, "A")}
                    className={`
                      cursor-pointer bg-[#ffb494] rounded-2xl overflow-hidden border-2
                      transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg flex
                      ${
                      selectedAnswers[questionNumber] === "A"
                        ? "border-[#ff8e5e]"
                        : "border-[#E0E0E0]"
                    }
                    `}
                  >
                    <div className="flex items-center justify-center p-4">
                      <div className="bg-[#ff8e5e] rounded-full w-10 h-10 flex items-center justify-center">
                        <span className="text-white font-medium">A</span>
                      </div>
                    </div>
                    <div className="bg-[#F7FAFC] p-4 flex-1 flex items-center">
                      <p className="text-[#0d141c] text-justify text-sm">
                        {q.option_a_text}
                      </p>
                    </div>
                  </div>

                  {/* Option B */}
                  <div
                    onClick={() => handleSelect(questionNumber, "B")}
                    className={`
                      cursor-pointer bg-[#ffb494] rounded-2xl overflow-hidden border-2
                      transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg flex
                      ${
                      selectedAnswers[questionNumber] === "B"
                        ? "border-[#ff8e5e]"
                        : "border-[#E0E0E0]"
                    }
                    `}
                  >
                    <div className="flex items-center justify-center p-4">
                      <div className="bg-[#ff8e5e] rounded-full w-10 h-10 flex items-center justify-center">
                        <span className="text-white font-medium">B</span>
                      </div>
                    </div>
                    <div className="bg-[#F7FAFC] p-4 flex-1 flex items-center">
                      <p className="text-[#0d141c] text-justify text-sm">
                        {q.option_b_text}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-16">
          <button className="px-8 py-2 bg-[#ff8e5e] text-[#ffffff] rounded-md">
            Previous
          </button>
          <button className="px-8 py-2 bg-[#5effde] text-[#0d141c] rounded-md">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
