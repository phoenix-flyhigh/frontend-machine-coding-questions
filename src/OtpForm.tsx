import { useEffect, useRef, useState } from "react";

interface OtpFormProps {
  length: number;
  onSubmit: () => void;
}

export const OtpForm = ({ length, onSubmit }: OtpFormProps) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill("") as string[]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleChange = (input: string, index: number) => {
    if (isNaN(Number(input))) return;
    if (index === 0 && input.length === length) return;
    const newOtp = [...otp];
    newOtp[index] = input.substring(input.length - 1); // need only one character
    setOtp(newOtp);

    if (input && index + 1 < length && !otp[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  useEffect(() => {
    inputRefs.current[0] && inputRefs.current[0].focus();
  }, []);

  useEffect(() => {
    const combinedOtp = otp.join("");
    if (combinedOtp.length === length) {
      setIsSubmitted(true);
      inputRefs.current[length - 1] && inputRefs.current[length - 1].focus();
    } else {
      setIsSubmitted(false);
    }
  }, [otp]);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (index === 0 && (e.ctrlKey || e.metaKey) && e.key === "v") {
      navigator.clipboard.readText().then((data) => {
        if (data.length === length && !isNaN(Number(data))) {
          setOtp(data.split(""));
        }
      });
    }
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    }
    if (e.key === "ArrowLeft" && inputRefs.current[index - 1]) {
      setTimeout(() => {
        inputRefs.current[index - 1].focus();
        inputRefs.current[index - 1].setSelectionRange(1, 1); // to select only one character
      }, 0); // to create a slight delay for the selectionrange to come into effect
    }
    if (e.key === "ArrowRight" && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index: number) => {
    inputRefs.current[index].setSelectionRange(1, 1);
  };

  return (
    <div className="w-2/5 h-48 rounded-lg bg-violet-950 text-white flex  flex-col justify-center gap-4 items-center shadow-md">
      <p className="text-xl font-bold">Otp Login</p>

      <div className="flex gap-2 items-center">
        {otp.map((x, index) => (
          <input
            key={index}
            ref={(input: HTMLInputElement) =>
              (inputRefs.current[index] = input)
            }
            type="text"
            value={x}
            className={`bg-transparent border-b-2 border-white outline-none w-8 h-8 flex justify-center items-center  ${
              x ? "pl-2" : "pl-4"
            } pl-4}`}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
      <button
        disabled={!isSubmitted}
        onClick={onSubmit}
        className={`w-4/6 mt-6 px-4 py-2 text-white font-semibold rounded-lg  ${
          isSubmitted ? "bg-green-400" : "bg-slate-400"
        }`}
      >
        Submit
      </button>
    </div>
  );
};
