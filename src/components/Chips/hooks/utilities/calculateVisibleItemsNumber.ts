import { BUTTON_WIDTH as SHOW_MORE_BUTTON_WIDTH } from "../../components/ShowMoreButton";
import { ITEMS_COLUMN_GAP, CONTAINER_COLUMN_GAP } from "../../constants";

function calculateVisibleItemsNumber(
  containerWidth: number,
  allItemsElement: HTMLUListElement,
  itemsNumber: number,
) {
  if (allItemsElement.scrollWidth <= containerWidth) {
    return itemsNumber;
  }

  const availableWidth =
    containerWidth - CONTAINER_COLUMN_GAP - SHOW_MORE_BUTTON_WIDTH;
  let occupiedWidth = 0;
  let visibleItemsNumber = 0;

  for (const item of allItemsElement.children) {
    const itemWidth = item.clientWidth;

    occupiedWidth +=
      visibleItemsNumber === 0 ? itemWidth : ITEMS_COLUMN_GAP + itemWidth;

    if (occupiedWidth > availableWidth) {
      break;
    }

    visibleItemsNumber++;
  }

  return visibleItemsNumber;
}

export default calculateVisibleItemsNumber;
