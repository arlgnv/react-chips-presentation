import { BUTTON_WIDTH as SHOW_MORE_BUTTON_WIDTH } from "../components/ShowMoreButton";
import { CHIPS_COLUMN_GAP } from "../constants";

function calculateVisibleItemsNumber(
  parentWidth: number,
  itemsElement: HTMLUListElement,
  itemsNumber: number,
) {
  let result = 0;
  let occupiedWidth = 0;
  const itemsWidths: number[] = [];

  for (const item of itemsElement.children) {
    const isFirst = result === 0;
    const itemWidth = item.clientWidth;
    const canBeAdded = isFirst
      ? itemWidth < parentWidth
      : occupiedWidth + CHIPS_COLUMN_GAP + itemWidth < parentWidth;

    if (!canBeAdded) {
      break;
    }

    result++;
    occupiedWidth = isFirst
      ? occupiedWidth + itemWidth
      : occupiedWidth + CHIPS_COLUMN_GAP + itemWidth;
    itemsWidths.push(itemWidth);
  }

  const showMoreShouldAdded = result < itemsNumber;

  if (!showMoreShouldAdded) {
    return result;
  }

  const showMoreButtonCanBeAdded =
    result === 0 ||
    occupiedWidth + CHIPS_COLUMN_GAP + SHOW_MORE_BUTTON_WIDTH < parentWidth;

  if (showMoreButtonCanBeAdded) {
    return result;
  }

  for (let i = itemsWidths.length - 1; i >= 0; i--) {
    const isFirst = i === 0;

    result--;
    occupiedWidth = isFirst
      ? occupiedWidth - itemsWidths[i]
      : occupiedWidth - CHIPS_COLUMN_GAP - itemsWidths[i];
    itemsWidths.pop();

    if (
      result === 0 ||
      occupiedWidth + CHIPS_COLUMN_GAP + SHOW_MORE_BUTTON_WIDTH < parentWidth
    ) {
      break;
    }
  }

  return result;
}

export default calculateVisibleItemsNumber;
