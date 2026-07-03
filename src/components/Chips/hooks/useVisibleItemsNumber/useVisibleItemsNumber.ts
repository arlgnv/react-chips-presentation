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

    const containerStyles = getComputedStyle(containerElement);
    const containerWidth =
      containerElement.clientWidth -
      parseFloat(containerStyles.paddingLeft) -
      parseFloat(containerStyles.paddingRight);

    updateVisibleItemsNumber(containerWidth);
  }, []);

  useEffect(() => {
    const containerElement = containerRef.current;

    if (!containerElement) {
      return;
    }

    const resizeObserver = new ResizeObserver(([entry]) => {
      const containerWidth = entry.contentBoxSize[0].inlineSize;

      updateVisibleItemsNumber(containerWidth);
    });

    resizeObserver.observe(containerElement);

    return () => {
      resizeObserver.unobserve(containerElement);
    };
  }, [updateVisibleItemsNumber]);

  return visibleItemsNumber;
}

export default useVisibleItemsNumber;
