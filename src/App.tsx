import questions from "./questions.json";
import Quiz from "./components/quiz";

function App() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Quiz questions={questions} />
    </div>
  );
}

export default App;
