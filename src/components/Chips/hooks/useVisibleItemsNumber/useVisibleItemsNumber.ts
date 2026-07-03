import { useState, useLayoutEffect, useEffect, useCallback } from "react";

import type { Item } from "../../types";
import { calculateVisibleItemsNumber } from "./utilities";

function useVisibleItemsNumber(
  containerRef: React.RefObject<HTMLDivElement | null>,
  measureBoxRef: React.RefObject<HTMLDivElement | null>,
  items: Item[],
) {
  const [visibleItemsNumber, setVisibleItemsNumber] = useState(0);

  const updateVisibleItemsNumber = useCallback((containerWidth: number) => {
    const measureBoxElement = measureBoxRef.current;

    if (!measureBoxElement) {
      return;
    }

    const newVisibleItemsNumber = calculateVisibleItemsNumber(
      containerWidth,
      measureBoxElement,
      items.length,
    );

    setVisibleItemsNumber(newVisibleItemsNumber);
  }, []);

  useLayoutEffect(() => {
    const containerElement = containerRef.current;

    if (!containerElement) {
      return;
    }

    updateVisibleItemsNumber(containerElement.offsetWidth);
  }, []);

  useEffect(() => {
    const containerElement = containerRef.current;

    if (!containerElement) {
      return;
    }

    const resizeObserver = new ResizeObserver(([entry]) => {
      const containerWidth = entry.borderBoxSize[0].inlineSize;

      updateVisibleItemsNumber(containerWidth);
    });

    resizeObserver.observe(containerElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, [updateVisibleItemsNumber]);

  return visibleItemsNumber;
}

export default useVisibleItemsNumber;
