import TicTacToeBoard from "./TicTacToeBoard";

function App() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <TicTacToeBoard boardSize={3} />
    </div>
  );
}

export default App;
