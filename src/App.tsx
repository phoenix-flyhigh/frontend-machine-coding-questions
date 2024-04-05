import { FormEvent, useState } from "react";
import "./App.css";

type UserAccount = { username: string; password: string };

const UserForm = () => {
  enum ERROR_MESSAGES {
    INVALID_INPUT = "Username and password must be more than 6 characters.",
    LENGTHY_USERNAME = "Username cannot exceed 20 characters.",
    LENGTHY_PASSWORD = "Password cannot exceed 20 characters.",
    LOGIN_FAILED = "Login failed. Please enter valid credentials"
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accounts, setAccounts] = useState<UserAccount[]>([
    { username: "abcdefg", password: "1234567" },
  ]);

  const clearInputs = () => {
    setUsername("");
    setPassword("");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (username.length < 6 || password.length < 6) {
      alert(ERROR_MESSAGES.INVALID_INPUT);
      return;
    }
    const userExists = accounts.filter((acc) => acc.username === username);
    if (userExists.length > 0) {
      if (userExists[0].password === password) {
        alert(`Logged in successfully! Hi, ${username}`);
        clearInputs();
      } else {
        alert(ERROR_MESSAGES.LOGIN_FAILED);
      }
    } else {
      setAccounts((prev) => [...prev, { username, password }]);
      alert(`New account created! Welcome ${username}`);
      clearInputs();
    }
  };

  return (
    <div className="flex flex-col items-start px-6 py-4 border-4 border-black w-80">
      <h1 className="text-3xl font-extrabold my-8">Login</h1>
      <form
        className="flex flex-col w-full items-center justify center gap-4"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          required
          value={username}
          placeholder="Enter username"
          onChange={(e) => {
            e.target.value.length > 20
              ? alert(ERROR_MESSAGES.LENGTHY_USERNAME)
              : setUsername(e.target.value);
          }}
          className="w-full border-2 border-black h-8"
        />
        <input
          type="password"
          required
          placeholder="Enter password"
          value={password}
          onChange={(e) => {
            e.target.value.length > 20
              ? alert(ERROR_MESSAGES.LENGTHY_PASSWORD)
              : setPassword(e.target.value);
          }}
          className="w-full border-2 border-black h-8"
        />
        <button
          type="submit"
          className="w-24 bg-gray-200 cursor-pointer font-semibold py-2 border-2 border-black"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

function App() {
  return (
    <div className=" h-screen w-full flex justify-center items-center">
      <UserForm />
    </div>
  );
}

export default App;
