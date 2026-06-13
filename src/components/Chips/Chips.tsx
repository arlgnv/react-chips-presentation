import { useRef, useState, useLayoutEffect } from "react";

import Chip from "../Chip";
import { ShowMoreButton } from "./components";
import type { Props } from "./types";
import { calculateVisibleItemsNumber } from "./utilities";
import { CONTAINER_COLUMN_GAP, ITEMS_COLUMN_GAP } from "./constants";
import styles from "./styles.module.css";

function Chips({ items }: Props) {
  const allItemsRef = useRef<HTMLUListElement>(null);
  const [visibleItemsNumber, setVisibleItemsNumber] = useState(0);
  const visibleItems = items.slice(0, visibleItemsNumber);
  const hiddenItems = items.slice(visibleItemsNumber);

  useLayoutEffect(() => {
    const allItemsElement = allItemsRef.current;

    if (!allItemsElement) {
      return;
    }

    const parentElement = allItemsElement.parentElement;

    if (!parentElement) {
      return;
    }

    const parentWidth = parentElement.clientWidth;
    const allItemsElementWidth = allItemsElement.scrollWidth;

    setVisibleItemsNumber(
      allItemsElementWidth > parentWidth
        ? calculateVisibleItemsNumber(
            parentWidth,
            allItemsElement,
            items.length,
          )
        : items.length,
    );
  }, [items]);

  if (items.length === 0) {
    return <p className={styles["no-items-message"]}>No chips</p>;
  }

  return (
    <div
      className={styles.container}
      style={{ columnGap: CONTAINER_COLUMN_GAP }}
    >
      <ul
        className={`${styles.items} ${styles["all-items"]}`}
        style={{ columnGap: ITEMS_COLUMN_GAP }}
        ref={allItemsRef}
      >
        {items.map(({ id, text }) => (
          <li key={id} className={styles.item}>
            <Chip>{text}</Chip>
          </li>
        ))}
      </ul>
      <ul className={styles.items} style={{ columnGap: ITEMS_COLUMN_GAP }}>
        {visibleItems.map(({ id, text }) => (
          <li key={id} className={styles.item}>
            <Chip>{text}</Chip>
          </li>
        ))}
      </ul>
      {hiddenItems.length > 0 && <ShowMoreButton items={hiddenItems} />}
    </div>
  );
}

export default Chips;
