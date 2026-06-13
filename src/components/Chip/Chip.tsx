import { useState } from "react";

import type { Props } from "./types";
import styles from "./styles.module.css";

function Chip({ children, pressed: pressedProp, onPressedChange }: Props) {
  const [pressed, setPressed] = useState(pressedProp ?? false);

  function handleClick() {
    const newPressed = !pressed;

    setPressed(newPressed);
    onPressedChange?.(newPressed);
  }

  return (
    <button
      className={styles.container}
      type="button"
      aria-pressed={pressed}
      data-pressed={pressed}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default Chip;
