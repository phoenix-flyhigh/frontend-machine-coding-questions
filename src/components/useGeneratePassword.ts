import { useState } from "react";
import { CheckboxOption } from "./PasswordGenerator";

const useGeneratePassword = (
  length: number,
  checkboxData: CheckboxOption[]
) => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const getCharset = (option: CheckboxOption) => {
    let charSet = "";
    switch (option.title) {
      case "Include uppercase letters":
        charSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        break;
      case "Include lowercase letters":
        charSet += "abcdefghijklmnopqrstuvwxyz";
        break;
      case "Include numbers":
        charSet += "0123456789";
        break;
      case "Include symbols":
        charSet += "!@#$%^&*()";
        break;
      default:
        break;
    }

    return charSet;
  };

  const generatePassword = () => {
    const selectedOptions = checkboxData.filter((x) => x.checked);
    let newPassword = "";
    let charset = "";

    if (selectedOptions.length === 0) {
      setErrorMessage("Select atleast one option");
      setPassword("");
      return;
    }

    selectedOptions.forEach((option) => {
      charset += getCharset(option);
    });

    for (let i = 0; i < length; i++) {
      newPassword += charset[Math.floor(Math.random() * charset.length)];
    }

    setPassword(newPassword);
    setErrorMessage("");
  };

  return {
    password,
    errorMessage,
    generatePassword,
  };
};

export default useGeneratePassword;
