import { useState } from "react";
import { Question } from "../Interfaces";
import QuestionCard from "./QuestionCard";
import ResultPage from "./ResultPage";

interface QuizProps {
  questions: Question[];
}

const Quiz = ({ questions }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [verifiedUserAnswers, setVerifiedUserAnswers] = useState<boolean[]>([]);

  const handleAnswerClick = (isCorrectAnswer: boolean) => {
    setVerifiedUserAnswers((prev) => [...prev, isCorrectAnswer]);
    setCurrentQuestion((prev) => prev + 1);
  };

  return currentQuestion < questions.length ? (
    <QuestionCard
      question={questions[currentQuestion]}
      onAnswerClick={handleAnswerClick}
    />
  ) : (
    <ResultPage answers={verifiedUserAnswers} questions={questions} />
  );
};

export default Quiz;
