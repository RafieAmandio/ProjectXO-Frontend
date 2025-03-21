"use client";

import { useState, useEffect } from "react";

export default function PersonalityQuiz() {
  // Store questions fetched from the API
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Track pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Store user’s selected answers
  const [selectedAnswers, setSelectedAnswers] = useState({});

  // Fetch questions from /api/questions
  useEffect(() => {
    async function loadQuestions() {
      try {
        const res = await fetch("/api/questions");
        const data = await res.json();
        setQuestions(data.content.entries || []);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    }
    loadQuestions();
  }, []);

  // 5 questions per page
  const QUESTIONS_PER_PAGE = 5;

  // Compute total pages, e.g. if 12 questions => 3 pages
  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);

  // Current slice of questions for this page
  const pageStartIndex = (currentPage - 1) * QUESTIONS_PER_PAGE;
  const pageQuestions = questions.slice(pageStartIndex, pageStartIndex + QUESTIONS_PER_PAGE);

  // Progress bar calculation (page-based):
  // e.g. currentPage=1 of totalPages=3 => 1/3 => 33.3% wide
  const progressPercent = totalPages > 0 ? (currentPage / totalPages) * 100 : 0;

  // Handler to update state for the selected answer
  function handleSelect(questionId, answer) {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answer }));
  }

  function handleNext() {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  }

  function handlePrevious() {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading questions...
      </div>
    );
  }

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
          <h1 className="text-xl font-medium mb-4 font-glancyr">
            Personality Quiz
          </h1>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-[#d1d1d1] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#f26241] rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-sm mt-2">
            Page {currentPage} of {totalPages}
          </p>
        </div>

        {/* Questions for the current page */}
        <div className="space-y-16">
          {pageQuestions.map((q) => (
            <div key={q.id} className="space-y-4">
              <h2 className="font-medium">Question {q.display_order}</h2>
              <p className="text-[#0d141c] mb-6">{q.question_text}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Option A */}
                <div
                  onClick={() => handleSelect(q.id, "A")}
                  className={`
                    cursor-pointer bg-[#ffb494] rounded-2xl overflow-hidden border-2
                    transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg flex
                    ${
                    selectedAnswers[q.id] === "A"
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
                  <div className="bg-[#F7FAFC] p-4 flex-1 h-full flex items-center">
                    <p className="text-[#0d141c] text-justify text-sm">
                      {q.option_a_text}
                    </p>
                  </div>
                </div>

                {/* Option B */}
                <div
                  onClick={() => handleSelect(q.id, "B")}
                  className={`
                    cursor-pointer bg-[#ffb494] rounded-2xl overflow-hidden border-2
                    transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg flex
                    ${
                    selectedAnswers[q.id] === "B"
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
                  <div className="bg-[#F7FAFC] p-4 flex-1 h-full flex items-center">
                    <p className="text-[#0d141c] text-justify text-sm">
                      {q.option_b_text}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-16">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`
              px-8 py-2 rounded-md
              ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#ff8e5e] text-white"
            }
            `}
          >
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`
              px-8 py-2 rounded-md
              ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#5effde] text-[#0d141c]"
            }
            `}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
