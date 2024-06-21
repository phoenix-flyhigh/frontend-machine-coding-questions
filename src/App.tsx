import React from "react";
import "./App.css";
import { PasswordStrengthChecker } from "./PasswordStrengthChecker";

function App() {
  return (
    <div className=" h-screen w-full flex justify-center items-center">
      <PasswordStrengthChecker />
    </div>
  );
}

export default App;
