import { useRef, useState, useLayoutEffect } from "react";

import Chip, { type Props as ChipProps } from "@/components/Chip";
import { ShowMoreButton } from "./components";
import type { Props } from "./types";
import { calculateVisibleItemsNumber } from "./utilities";
import { CONTAINER_COLUMN_GAP, ITEMS_COLUMN_GAP } from "./constants";
import styles from "./styles.module.css";

function Chips({ items, onChipToggle }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const allItemsRef = useRef<HTMLUListElement>(null);
  const [visibleItemsNumber, setVisibleItemsNumber] = useState(0);
  const visibleItems = items.slice(0, visibleItemsNumber);
  const hiddenItems = items.slice(visibleItemsNumber);

  useLayoutEffect(() => {
    const containerElement = containerRef.current;

    if (!containerElement) {
      return;
    }

    const allItemsElement = allItemsRef.current;

    if (!allItemsElement) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const containerWidth = entry.borderBoxSize[0].inlineSize;
        const allItemsElementWidth = allItemsElement.scrollWidth;

        setVisibleItemsNumber(
          allItemsElementWidth > containerWidth
            ? calculateVisibleItemsNumber(
                containerWidth,
                allItemsElement,
                items.length,
              )
            : items.length,
        );
      }
    });

    resizeObserver.observe(containerElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, [items]);

  function createChipPressedChangeHandler(
    itemId: number,
  ): NonNullable<ChipProps["onPressedChange"]> {
    return () => {
      onChipToggle(itemId);
    };
  }

  return (
    <div
      className={styles.container}
      style={{ columnGap: CONTAINER_COLUMN_GAP }}
      ref={containerRef}
    >
      {items.length === 0 ? (
        <p className={styles["no-items-message"]}>No chips</p>
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
                    onPressedChange={createChipPressedChangeHandler(id)}
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
