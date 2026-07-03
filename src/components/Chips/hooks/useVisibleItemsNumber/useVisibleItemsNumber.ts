import { useState, useLayoutEffect } from "react";

import type { Item } from "../../types";
import { calculateVisibleItemsNumber } from "./utilities";

function useVisibleItemsNumber(
  containerRef: React.RefObject<HTMLDivElement | null>,
  measureBoxRef: React.RefObject<HTMLDivElement | null>,
  items: Item[],
) {
  const [visibleItemsNumber, setVisibleItemsNumber] = useState(0);

  useLayoutEffect(() => {
    const containerElement = containerRef.current;

    if (!containerElement) {
      return;
    }

    const measureBoxElement = measureBoxRef.current;

    if (!measureBoxElement) {
      return;
    }

    const resizeObserver = new ResizeObserver(([entry]) => {
      const containerWidth = entry.borderBoxSize[0].inlineSize;
      const newVisibleItemsNumber = calculateVisibleItemsNumber(
        containerWidth,
        measureBoxElement,
        items.length,
      );
      setVisibleItemsNumber(newVisibleItemsNumber);
    });

    resizeObserver.observe(containerElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, [items]);

  return visibleItemsNumber;
}

export default useVisibleItemsNumber;
