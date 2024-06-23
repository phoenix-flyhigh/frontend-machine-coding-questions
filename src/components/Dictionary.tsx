import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { RxSpeakerLoud } from "react-icons/rx";

type TResult = {
  phonetics: { text: string; audio: string }[];
  meanings: {
    partOfSpeech: string;
    definitions: { definition: string }[];
  }[];
};

export const Dictionary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState<TResult | null>(null);
  const debouncedSearchTerm = useDebounce(() => searchTerm, 2000);
  const [status, setStatus] = useState<"idle" | "success" | "error" | "loading">("idle");

  useEffect(() => {
    if (!debouncedSearchTerm) return;
    fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${debouncedSearchTerm}`
    )
      .then((res) => res.json())
      .then((data) => {
        setResult(data[0]);
        setStatus("success");
      })
      .catch(() => setStatus("error"));
  }, [debouncedSearchTerm]);

  const playAudio = () => {
    return new Audio(result?.phonetics[0].audio).play();
  };

  return (
    <div className="w-full flex flex-col gap-6 items-center text-lg">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setResult(null);
          setStatus("loading");
        }}
        className="bg-transparent w-3/5 border-b-2 border-white text-2xl outline-none"
        placeholder="Enter search text"
      />
      {status === "success" && result && (
        <div className="flex flex-col gap-4 items-center">
          <section className="bg-gray-700 p-4 flex flex-col gap-4 items-start w-4/5">
            <h3 className="text-xl font-bold">{debouncedSearchTerm}</h3>
            <p className="flex gap-4">
              Pronunciations: {result.phonetics[0].text}
              <button onClick={playAudio}>
                <RxSpeakerLoud />
              </button>
            </p>
          </section>
          {result.meanings.map((meaning) => (
            <div className="bg-gray-700 p-4 flex flex-col gap-4 items-start w-4/5">
              <h3 className="text-xl font-bold">{meaning.partOfSpeech}</h3>
              <ul className="list-disc pl-6">
                {meaning.definitions.map((x) => (
                  <li>{x.definition}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      {status === "loading" && <p>Loading...</p>}
      {status === "error" && <p>Error occured</p>}
    </div>
  );
};
