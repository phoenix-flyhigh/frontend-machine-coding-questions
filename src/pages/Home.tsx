import { useTheme } from "../ThemeContext";
import "../App.css";

const Home = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div
      className={`${
        isDark ? "dark-theme" : "light-theme"
      } w-full h-full text-2xl`}
    >
      Home page
    </div>
  );
};

export default Home;
