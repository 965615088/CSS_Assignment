import styles from "./Navbar.module.css";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link className={styles.navitem} href="/">
        Home
      </Link>
      <Link className={styles.navitem} href="/settings">
        Settings
      </Link>
      <Link className={styles.navitem} href="/guide">
        Game guide
      </Link>
      <Link className={styles.navitem} href="/scoreboard">
        Scoreboard
      </Link>
    </nav>
  );
}
