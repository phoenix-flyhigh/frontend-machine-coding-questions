import { Question } from "../Interfaces";

const QuestionCard = ({
  question,
  onAnswerClick,
}: {
  question: Question;
  onAnswerClick: (isCorrectAnswer: boolean) => void;
}) => {
  return (
    <div className="flex flex-col gap-6 p-6 border-2 border-black w-1/3">
      <p className="text-lg font-semibold text-center">{question.question}</p>
      <div className="grid grid-cols-2 gap-4">
        {question.answerOptions.map((option) => (
          <button
            onClick={() => onAnswerClick(option.isCorrect)}
            className="w-full px-4 py-2 bg-gray-300 rounded-md"
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
