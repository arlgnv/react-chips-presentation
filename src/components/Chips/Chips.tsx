import { useRef } from "react";

import { Chip } from "@/components";

import { NoItemsMessage, ShowMoreButton } from "./components";
import { useVisibleItemsNumber } from "./hooks";
import type { Props } from "./types";
import { CONTAINER_COLUMN_GAP, ITEMS_COLUMN_GAP } from "./constants";
import styles from "./styles.module.css";

function Chips({ items, onChipToggle }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const allItemsRef = useRef<HTMLUListElement>(null);
  const visibleItemsNumber = useVisibleItemsNumber(
    containerRef,
    allItemsRef,
    items,
  );
  const visibleItems = items.slice(0, visibleItemsNumber);
  const hiddenItems = items.slice(visibleItemsNumber);

  return (
    <div
      className={styles.container}
      style={{ columnGap: CONTAINER_COLUMN_GAP }}
      ref={containerRef}
    >
      {items.length === 0 ? (
        <NoItemsMessage />
      ) : (
        <>
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
          {visibleItems.length > 0 && (
            <ul
              className={styles.items}
              style={{ columnGap: ITEMS_COLUMN_GAP }}
            >
              {visibleItems.map(({ id, text, pressed }) => (
                <li key={id} className={styles.item}>
                  <Chip
                    pressed={pressed}
                    onPressedChange={() => {
                      onChipToggle(id);
                    }}
                  >
                    {text}
                  </Chip>
                </li>
              ))}
            </ul>
          )}
          {hiddenItems.length > 0 && (
            <ShowMoreButton items={hiddenItems} onChipToggle={onChipToggle} />
          )}
        </>
      )}
    </div>
  );
}

export default Chips;
