import { useTheme } from "../ThemeContext";
import "../App.css";

const About = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div
      className={`${
        isDark ? "dark-theme" : "light-theme"
      } w-full h-full text-2xl`}
    >
      About page
    </div>
  );
};

export default About;
