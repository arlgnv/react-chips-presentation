import { Popover } from "@base-ui/react/popover";

import { Chip } from "@/components";

import styles from "./styles.module.css";
import type { Props } from "./types";

function ShowMoreButton({ items }: Props) {
  return (
    <Popover.Root>
      <Popover.Trigger className={styles.trigger}>...</Popover.Trigger>
      <Popover.Portal keepMounted>
        <Popover.Positioner sideOffset={8}>
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
