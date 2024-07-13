import React from "react";
import "./App.css";
import { OtpForm } from "./OtpForm";

function App() {
  return (
    <div className="bg-black h-screen w-full flex justify-center items-center">
      <OtpForm length={6} onSubmit={() => console.log("submitted")} />
    </div>
  );
}

export default App;
