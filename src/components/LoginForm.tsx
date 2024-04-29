import { useState } from "react";
import OtpLogin from "./OtpLogin";

const LoginForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handleSubmit = () => {
    const regex = /[^0-9]/g;

    if (phoneNumber.trim().length > 10 && !regex.test(phoneNumber.trim())) {
      setShowOtpInput(true);
    } else {
      alert("Invalid phone number");
      return;
    }
  };

  return (
    <div className="flex flex-col gap-12 items-center justify-center w-96">
      {showOtpInput ? (
        <OtpLogin
          phoneNumber={phoneNumber}
          onSubmit={(otp: string) => {
            console.log(`Logged in successfully with otp ${otp}`);
          }}
          length={4}
        />
      ) : (
        <>
          <h1 className="text-white text-2xl font-bold">
            Login with mobile number
          </h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="w-full flex flex-col gap-12"
          >
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="appearance-none w-full focus:outline-none p-4 border-gray-300 border-4 rounded-lg focus:ring focus:border-indigo-800"
            />
            <button
              type="submit"
              className=" bg-blue-600 hover:bg-blue-700 cursor-pointer text-white text-lg font-semibold flex justify-center items-center w-full py-4 rounded-lg"
            >
              Get OTP{" "}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default LoginForm;
