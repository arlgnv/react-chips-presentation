import { useState, useLayoutEffect } from "react";

import type { Item } from "../types";
import { calculateVisibleItemsNumber } from "./utilities";

function useVisibleItemsNumber(
  containerRef: React.RefObject<HTMLDivElement | null>,
  allItemsRef: React.RefObject<HTMLUListElement | null>,
  items: Item[],
) {
  const [visibleItemsNumber, setVisibleItemsNumber] = useState(0);

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
        const newVisibleItemsNumber = calculateVisibleItemsNumber(
          containerWidth,
          allItemsElement,
          items.length,
        );
        setVisibleItemsNumber(newVisibleItemsNumber);
      }
    });

    resizeObserver.observe(containerElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, [items]);

  return visibleItemsNumber;
}

export default useVisibleItemsNumber;
