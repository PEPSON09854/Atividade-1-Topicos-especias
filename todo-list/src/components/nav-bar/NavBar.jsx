import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className={styles.nav_bar}>
      <h1>Lista de Tarefas</h1>
      <div>
        <Link to="/">Tarefas</Link>
        <Link to="/about">Sobre</Link>
      </div>
    </nav>
  );
};

export default NavBar;
