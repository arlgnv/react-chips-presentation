import Chip from "../Chip";
import type { Props } from "./types";
import styles from "./styles.module.css";

function Chips({ items }: Props) {
  if (items.length === 0) {
    return <p className={styles["no-items-message"]}>No chips</p>;
  }

  return (
    <ul className={styles.container}>
      {items.map(({ id, text }) => (
        <li key={id}>
          <Chip>{text}</Chip>
        </li>
      ))}
    </ul>
  );
}

export default Chips;
