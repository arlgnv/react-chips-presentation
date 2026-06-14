import { BUTTON_WIDTH as SHOW_MORE_BUTTON_WIDTH } from "../../../components/ShowMoreButton";
import { ITEMS_COLUMN_GAP, CONTAINER_COLUMN_GAP } from "../../../constants";

function calculateVisibleItemsNumber(
  containerWidth: number,
  measureBoxElement: HTMLDivElement,
  itemsNumber: number,
) {
  if (measureBoxElement.scrollWidth <= containerWidth) {
    return itemsNumber;
  }

  const availableWidth =
    containerWidth - CONTAINER_COLUMN_GAP - SHOW_MORE_BUTTON_WIDTH;
  let occupiedWidth = 0;
  let visibleItemsNumber = 0;

  for (const child of measureBoxElement.children) {
    const childWidth = child.clientWidth;

    occupiedWidth +=
      visibleItemsNumber === 0 ? childWidth : ITEMS_COLUMN_GAP + childWidth;

    if (occupiedWidth > availableWidth) {
      break;
    }

    visibleItemsNumber++;
  }

  return visibleItemsNumber;
}

export default calculateVisibleItemsNumber;
