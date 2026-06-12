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
            <ul className={styles.items}>
              {items.map(({ id, text }) => (
                <li key={id}>
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
