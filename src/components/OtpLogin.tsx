import { useEffect, useRef, useState } from "react";

interface OtpLoginProps {
  phoneNumber: string;
  onSubmit: (otp: string) => void;
  length: number;
}

const OtpLogin = ({ phoneNumber, onSubmit, length }: OtpLoginProps) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleChange = (input: string, index: number) => {
    if (isNaN(Number(input))) return;

    const newOtp = [...otp];
    newOtp[index] = input.substring(input.length - 1);
    setOtp(newOtp);

    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) onSubmit(combinedOtp);

    if (input && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index: number) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    if (index > 0 && otp.includes("")) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  useEffect(() => {
    inputRefs.current && inputRefs.current[0].focus();
  }, []);

  return (
    <div className="flex flex-col gap-12 items-center justify-center w-full">
      <p className="text-white text-2xl font-semibold">
        Enter otp sent to {phoneNumber}
      </p>
      <div className="flex justify-center gap-4">
        {otp.map((x, index) => (
          <input
            key={index}
            ref={(input: HTMLInputElement) =>
              (inputRefs.current[index] = input)
            }
            type="text"
            value={x}
            onClick={() => handleClick(index)}
            onChange={(e) => handleChange(e.target.value.trim(), index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="appearance-none w-16 rounded-lg h-16 p-3 focus:outline-none focus:ring focus:border-blue-400 border-2"
          />
        ))}
      </div>
    </div>
  );
};

export default OtpLogin;
