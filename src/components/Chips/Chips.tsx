import { useLayoutEffect, useRef, useState } from "react";

import Chip from "../Chip";
import type { Props } from "./types";
import styles from "./styles.module.css";
import { ShowMoreButton } from "./components";
import { calculateVisibleItemsNumber } from "./utilities";
import { CONTAINER_COLUMN_GAP, ITEMS_COLUMN_GAP } from "./constants";

function Chips({ items }: Props) {
  const itemsRef = useRef<HTMLUListElement>(null);
  const [visibleItemsNumber, setVisibleItemsNumber] = useState(items.length);
  const visibleItems = items.slice(0, visibleItemsNumber);
  const hiddenItems = items.slice(visibleItemsNumber);

  useLayoutEffect(() => {
    const itemsElement = itemsRef.current;

    if (!itemsElement) {
      return;
    }

    const parentElement = itemsElement.parentElement;

    if (!parentElement) {
      return;
    }

    const parentStyles = getComputedStyle(parentElement);
    const parentWidth =
      parentElement.clientWidth -
      parseFloat(parentStyles.paddingLeft) -
      parseFloat(parentStyles.paddingRight);

    setVisibleItemsNumber(
      itemsElement.scrollWidth > parentWidth
        ? calculateVisibleItemsNumber(parentWidth, itemsElement, items.length)
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
        className={styles.items}
        style={{ columnGap: ITEMS_COLUMN_GAP }}
        ref={itemsRef}
      >
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
