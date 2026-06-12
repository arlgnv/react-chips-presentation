import Chip from "../Chip";
import type { Props } from "./types";
import styles from "./styles.module.css";
import { ShowMoreButton } from "./components";

function Chips({ items }: Props) {
  if (items.length === 0) {
    return <p className={styles["no-items-message"]}>No chips</p>;
  }

  const firstThreeItems = items.slice(0, 3);
  const restItems = items.slice(3);

  return (
    <ul className={styles.items}>
      {firstThreeItems.map(({ id, text }) => (
        <li key={id}>
          <Chip>{text}</Chip>
        </li>
      ))}
      {restItems.length > 0 && (
        <li>
          <ShowMoreButton items={restItems} />
        </li>
      )}
    </ul>
  );
}

export default Chips;
