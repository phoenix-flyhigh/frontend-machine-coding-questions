import { useEffect, useState } from "react";

const hasNumber = /\d/;
const hasUppercaseLetters = /[A-Z]/;
const hasLowercaseLetters = /[a-z]/;
const hasSymbols = /[$&+,:;=?@#|'<>.^*()%!-]/;

export const PasswordStrengthChecker = () => {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    if (password.length < 4) {
      setStrength(0);
      return;
    }
    /* strength increases by 1 for every 3 characters 
     (max strength is 10, so max strength by length can only be 6, excluding character strength) */
    const strengthByLength = Math.min(6, Math.floor(password.length / 3));

    let strengthByCharacters = 0;
    if (hasNumber.test(password)) {
      strengthByCharacters += 1;
    }
    if (hasLowercaseLetters.test(password)) {
      strengthByCharacters += 1;
    }
    if (hasUppercaseLetters.test(password)) {
      strengthByCharacters += 1;
    }
    if (hasSymbols.test(password)) {
      strengthByCharacters += 1;
    }

    setStrength(strengthByCharacters + strengthByLength);
  }, [password]);

  return (
    <div className="flex flex-col gap-6 items-center w-1/3">
      <h1 className="text-xl font-bold">Password Strength Checker</h1>
      <input
        className="w-4/5 px-4 py-2 text-lg border-2 border-black rounded-lg"
        type="password"
        value={password}
        maxLength={32}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
      />
      <div className="w-full h-1 bg-slate-300 rounded-lg relative overflow-hidden">
        <div
          className={`absolute inset-0 w-full ${
            strength > 8
              ? "bg-green-600"
              : strength > 6
              ? "bg-amber-400"
              : "bg-red-500"
          }`}
          style={{ transform: `translateX(-${100 - strength * 10}%)` }}
        />
      </div>
      <p className="text-lg font-semibold">
        Strength of your password (out of 10) is {strength}
      </p>
    </div>
  );
};
