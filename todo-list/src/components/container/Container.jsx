import { useState } from "react";
import Footer from "../footer/Footer";
import { FaSun } from "react-icons/fa";
import NavBar from "../nav-bar/NavBar";
import styles from "./Container.module.css";
import { BsFillMoonStarsFill } from "react-icons/bs";

export const Container = ({ children, theme, onToggleTheme }) => {
  const [isTheme, setIsTheme] = useState(false);

  const containerClass = `${styles.container}  ${styles[theme]}`;

  const handleToggleClick = () => {
    onToggleTheme();
    setIsTheme(!isTheme);
  };

  return (
    <main className={containerClass}>
      <NavBar />
      {children}
      {isTheme ? (
        <BsFillMoonStarsFill
          color="#fff"
          size="30px"
          title="Mudar para tema  escuro"
          onClick={handleToggleClick}
        />
      ) : (
        <FaSun
          color="yellow"
          size="30px"
          title="Mudar para tema claro"
          onClick={handleToggleClick}
        />
      )}
      <Footer />
    </main>
  );
};
