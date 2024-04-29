import Prism from "prismjs";
import "prismjs/themes/prism.css";
import { useEffect, useState } from "react";

const LANGUAGES = ["html", "javascript", "css"];
export type Language = (typeof LANGUAGES)[number];

export const CodeReader = () => {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState<Language>("javascript");

  useEffect(() => {
    Prism.highlightAll();
  }, [text, language]);

  return (
    <div className="flex flex-col gap-8 w-2/4 h-3/4">
      <h2 className="text-xl font-bold text-white">Input code:</h2>
      <div className="h-1/2 w-full">
        <textarea
          placeholder="Enter code here..."
          className="w-full h-full rounded-2xl p-3 overflow-scroll"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <h2 className="text-xl font-bold text-white">Highlighted code:</h2>
      <div className="relative h-1/2">
        <pre className={` h-full language-${language} rounded-2xl`}>
          <code className={`language-${language}`}>{text}</code>
        </pre>
        <select
          className="absolute top-4 right-4 p-2 border-2 border-black focus:ring focus:border-blue-400 rounded-lg"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          {LANGUAGES.map((lang) => (
            <option value={lang}>{lang}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
