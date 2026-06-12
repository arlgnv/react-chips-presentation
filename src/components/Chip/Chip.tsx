import { useState } from "react";

import type { Props } from "./types";
import styles from "./styles.module.css";

function Chip({ children }: Props) {
  const [pressed, setPressed] = useState(false);

  function handleClick() {
    setPressed(!pressed);
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
