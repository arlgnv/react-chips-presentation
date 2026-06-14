import { Chip } from "@/components";

import { ITEMS_COLUMN_GAP } from "../../constants";
import type { Props } from "./types";
import styles from "./styles.module.css";

function MeasureBox({ ref, items }: Props) {
  return (
    <div
      ref={ref}
      className={styles.container}
      style={{ columnGap: ITEMS_COLUMN_GAP }}
    >
      {items.map(({ id, text }) => (
        <div key={id} className={styles.chipWrapper}>
          <Chip>{text}</Chip>
        </div>
      ))}
    </div>
  );
}

export default MeasureBox;
