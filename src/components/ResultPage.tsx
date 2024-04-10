import { Question } from "../Interfaces";

const ResultPage = ({
  questions,
  answers,
}: {
  questions: Question[];
  answers: boolean[];
}) => {
  return (
    <div className="flex flex-col gap-6 items-center">
      <h2 className="text-2xl font-bold">Results</h2>
      <p className="flex gap-4 text-lg">
        You got {answers.filter(Boolean).length} out of {questions.length}{" "}
        questions right!!
        <button className="underline font-semibold">Click here to Retry</button>
      </p>
      <div className="flex flex-col gap-3">
        {questions.map((qn, i) => (
          <p
            key={1}
            className={`${answers[i] ? "text-green-500" : "text-red-500"}`}
          >
            Q{i + 1} {qn.question}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ResultPage;
