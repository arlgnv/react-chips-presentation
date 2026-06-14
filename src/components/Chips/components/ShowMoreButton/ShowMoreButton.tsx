import { Popover } from "@base-ui/react/popover";

import { MoreChipsPopover } from "./components";
import type { Props } from "./types";
import { BUTTON_WIDTH } from "./constants";
import styles from "./styles.module.css";

const moreChipsPopoverHandle = Popover.createHandle();

function ShowMoreButton({ items, onChipToggle }: Props) {
  return (
    <>
      <Popover.Trigger
        className={styles.container}
        style={{ width: BUTTON_WIDTH }}
        handle={moreChipsPopoverHandle}
        aria-label="Show more chips"
      >
        …
      </Popover.Trigger>
      <MoreChipsPopover
        handle={moreChipsPopoverHandle}
        items={items}
        onChipToggle={onChipToggle}
      />
    </>
  );
}

export default ShowMoreButton;
