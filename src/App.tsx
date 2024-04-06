import { useState } from "react";
import "./App.css";

const FormTeams = ({ players }: { players: string[] }) => {
  const [team1Players, setTeam1Players] = useState<string[]>([]);
  const [team2Players, setTeam2Players] = useState<string[]>([]);
  const [updatedPlayers, setUpdatedPlayers] = useState<string[]>(players);
  const [selectedTeam, setSelectedTeam] = useState(1);

  const addPlayer = (player: string) => {
    if (selectedTeam === 1) {
      setTeam1Players((prev) => [...prev, player]);
    } else {
      setTeam2Players((prev) => [...prev, player]);
    }
    setUpdatedPlayers((prev) => prev.filter((p) => p !== player));
  };

  const resetPlayers = () => {
    setUpdatedPlayers(players);
    setTeam1Players([]);
    setTeam2Players([]);
  };

  const randomizeTeams = () => {
    const shuffledPlayers = [...players].sort(() => 0.5 - Math.random());

    setUpdatedPlayers([]);
    setTeam1Players(shuffledPlayers.slice(0, Math.floor(players.length / 2)));
    setTeam2Players(
      shuffledPlayers.slice(Math.floor(players.length / 2), players.length)
    );
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-4">
        {updatedPlayers.map((player) => (
          <button onClick={() => addPlayer(player)} key={player}>
            {player}
          </button>
        ))}
      </div>
      <div className="flex gap-4">
        <button
          className="btn"
          onClick={() => setSelectedTeam((prev) => (prev === 1 ? 2 : 1))}
        >
          Now selecting for Team {selectedTeam}
        </button>
        <button className="btn" onClick={randomizeTeams}>
          Randomize teams
        </button>
        <button className="btn" onClick={resetPlayers}>
          Reset
        </button>
      </div>

      <div className="flex justify-around text-center">
        <div className="max-w-[50%]">
          <p className="font-bold text-lg">Team 1</p>
          <div className="flex gap-4 flex-wrap">
            {team1Players.map((p) => (
              <span key={p}>{p}</span>
            ))}
          </div>
        </div>
        <div className="max-w-[50%]">
          <p className="font-bold text-lg">Team 2</p>
          <div className="flex gap-4 flex-wrap">
            {team2Players.map((p) => (
              <span key={p}>{p}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const PLAYERS = [
    "Alice",
    "Bob",
    "Carol",
    "Daniel",
    "Elaine",
    "Finley",
    "Gary",
    "Hector",
  ];
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <FormTeams players={PLAYERS} />
    </div>
  );
}

export default App;
