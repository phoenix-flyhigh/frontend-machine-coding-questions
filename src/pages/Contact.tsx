import { useTheme } from "../ThemeContext";
import "../App.css";

const Contact = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div
      className={`${
        isDark ? "dark-theme" : "light-theme"
      } w-full h-full text-2xl`}
    >
      Contact page
    </div>
  );
};

export default Contact;
