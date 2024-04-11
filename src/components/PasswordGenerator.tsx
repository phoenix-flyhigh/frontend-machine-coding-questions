import { useState } from "react";
import useGeneratePassword from "./useGeneratePassword";
import strengthChecker from "./StrengthChecker";

export type CheckboxOption = { title: string; checked: boolean };

const PasswordGenerator = () => {
  const [length, setLength] = useState(4);
  const [isCopied, setIsCopied] = useState(false);

  const [checkboxData, setCheckboxData] = useState<CheckboxOption[]>([
    { title: "Include uppercase letters", checked: false },
    { title: "Include lowercase letters", checked: false },
    { title: "Include numbers", checked: false },
    { title: "Include symbols", checked: false },
  ]);

  const { password, errorMessage, generatePassword } = useGeneratePassword(
    length,
    checkboxData
  );

  const handleCheck = (option: CheckboxOption) => {
    setCheckboxData((prev) =>
      prev.map((s) =>
        s.title === option.title ? { ...s, checked: !s.checked } : s
      )
    );
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setIsCopied(true);

    setTimeout(() => setIsCopied(false), 1500);
  };

  return (
    <div className="bg-black p-4 text-white flex flex-col gap-4 items-center">
      {password && (
        <div className="flex justify-between w-full">
          <span className="text-lg font-semibold text-green-400">
            {password}
          </span>
          <button
            className="bg-cyan-600 text-sm py-1 px-3"
            onClick={handleCopy}
          >
            {isCopied ? "Copied !!" : "Copy"}
          </button>
        </div>
      )}
      <form
        className="flex flex-col gap-8 w-full"
        onSubmit={(e) => {
          e.preventDefault();
          generatePassword();
        }}
      >
        <div className="flex flex-col gap-4">
          <label className="flex justify-between text-lg font-semibold">
            Character length
            <span>{length}</span>
          </label>
          <input
            type="range"
            step={1}
            min={4}
            max={20}
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          {checkboxData.map((s) => (
            <div className="flex gap-4" key={s.title}>
              <input
                type="checkbox"
                checked={s.checked}
                onChange={() => handleCheck(s)}
              />
              <label>{s.title}</label>
            </div>
          ))}
        </div>
        {errorMessage && (
          <div className="self-start text-red-400">{errorMessage}</div>
        )}
        {password && (
          <div className="flex justify-between">
            <span>Strength:</span>
            <span className="font-semibold">{strengthChecker(password)}</span>
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-cyan-600 text-md py-3 font-semibold uppercase"
        >
          Generate Password
        </button>
      </form>
    </div>
  );
};

export default PasswordGenerator;
