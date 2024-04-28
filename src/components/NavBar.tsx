import { Link } from "react-router-dom";
import { useTheme } from "../ThemeContext";

const NavBar = () => {
  const { toggleTheme, theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <nav
      className={`justify-between flex px-6 items-center ${
        isDark ? "dark-theme" : "light-theme"
      }`}
    >
      <div className="flex gap-6 items-center justify-start p-4">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div className="w-12 h-6 relative inline-block">
        <label className="cursor-pointer">
          <input
            type="checkbox"
            checked={isDark}
            onChange={toggleTheme}
            className="ml-2"
          />
          <span
            className={`absolute rounded-xl p-1 inset-0 before:transition before:delay-100 before:ease-out before:rounded-full before:p-2 before:absolute before:no-content ${
              isDark
                ? "bg-blue-400 before:bg-white before:translate-x-6"
                : "bg-gray-300 before:bg-black"
            }`}
          />
        </label>
      </div>
    </nav>
  );
};

export default NavBar;
