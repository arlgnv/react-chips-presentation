import { useRef } from "react";

import { Chip } from "@/components";

import { NoItemsMessage, MeasureBox, ShowMoreButton } from "./components";
import { useVisibleItemsNumber } from "./hooks";
import type { Props } from "./types";
import { CONTAINER_COLUMN_GAP, ITEMS_COLUMN_GAP } from "./constants";
import styles from "./styles.module.css";

function Chips({ items, onChipToggle }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureBoxRef = useRef<HTMLDivElement>(null);
  const visibleItemsNumber = useVisibleItemsNumber(
    containerRef,
    measureBoxRef,
    items,
  );
  const visibleItems = items.slice(0, visibleItemsNumber);
  const hiddenItems = items.slice(visibleItemsNumber);

  return (
    <div
      ref={containerRef}
      className={styles.container}
      style={{ columnGap: CONTAINER_COLUMN_GAP }}
    >
      {items.length === 0 ? (
        <NoItemsMessage />
      ) : (
        <>
          <MeasureBox ref={measureBoxRef} items={items} />
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
                      onChipToggle?.(id);
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
