import styles from "./style.module.scss";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <a
        href="https://github.com/H4wk507/TicTacToe"
        className={styles["gh-link"]}
        target="_blank"
      >
        GitHub
      </a>
    </div>
  );
}
