import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        Desenvolvido por <span>Pepson Anderson</span> | &copy; 2023
      </p>
    </footer>
  );
};

export default Footer;
