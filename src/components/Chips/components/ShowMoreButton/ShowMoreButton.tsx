import { Popover } from "@base-ui/react/popover";

import { Chip } from "@/components";

import type { Props } from "./types";
import { BUTTON_WIDTH } from "./constants";
import styles from "./styles.module.css";

function ShowMoreButton({ items, onChipToggle }: Props) {
  return (
    <Popover.Root>
      <Popover.Trigger
        className={styles.trigger}
        style={{ width: BUTTON_WIDTH }}
        aria-label="Show more chips"
      >
        …
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner align="end" sideOffset={8}>
          <Popover.Popup className={styles.popup}>
            <Popover.Title className="visually-hidden">
              Rest chips
            </Popover.Title>
            <Popover.Description className="visually-hidden">
              Here are the chips that didn't fit to the main container
            </Popover.Description>
            <ul className={styles.items}>
              {items.map(({ id, text, pressed }) => (
                <li key={id} className={styles.item}>
                  <Chip
                    pressed={pressed}
                    onPressedChange={() => {
                      onChipToggle(id);
                    }}
                  >
                    {text}
                  </Chip>
                </li>
              ))}
            </ul>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default ShowMoreButton;
