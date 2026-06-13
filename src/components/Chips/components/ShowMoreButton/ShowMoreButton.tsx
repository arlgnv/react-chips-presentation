import { Popover } from "@base-ui/react/popover";

import { Chip } from "@/components";

import type { Props } from "./types";
import { BUTTON_WIDTH } from "./constants";
import styles from "./styles.module.css";

function ShowMoreButton({ items }: Props) {
  return (
    <Popover.Root>
      <Popover.Trigger
        className={styles.trigger}
        style={{ width: BUTTON_WIDTH }}
      >
        ...
      </Popover.Trigger>
      <Popover.Portal keepMounted>
        <Popover.Positioner align="end" sideOffset={8}>
          <Popover.Popup className={styles.popup}>
            <Popover.Title className="visually-hidden">
              Rest chips
            </Popover.Title>
            <Popover.Description className="visually-hidden">
              Here are the chips that didn't fit to the main container
            </Popover.Description>
            <ul className={styles.items}>
              {items.map(({ id, text }) => (
                <li key={id} className={styles.item}>
                  <Chip>{text}</Chip>
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
