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

  const chipWrappers = measureBoxElement.querySelectorAll("div");

  for (const item of chipWrappers) {
    const width = item.offsetWidth;

    occupiedWidth +=
      visibleItemsNumber === 0 ? width : ITEMS_COLUMN_GAP + width;

    if (occupiedWidth > availableWidth) {
      break;
    }

    visibleItemsNumber++;
  }

  return visibleItemsNumber;
}

export default calculateVisibleItemsNumber;
