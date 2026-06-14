import { useState } from "react";

import Chips, { type Item } from "@/components/Chips";

import styles from "./styles.module.css";

function App() {
  const [chips, setChips] = useState<Item[]>([]);

  function handleChipAdd() {
    if (chips.length === 0) {
      setChips([{ id: 1, text: "Chip 1", pressed: false }]);
    }

    const lastChip = chips.at(-1);

    if (!lastChip) {
      return;
    }

    const newChipId = lastChip.id + 1;

    setChips([
      ...chips,
      { id: newChipId, text: `Chip ${newChipId}`, pressed: false },
    ]);
  }

  function handleChipRemove() {
    setChips(chips.slice(0, -1));
  }

  function handleChipsClear() {
    setChips([]);
  }

  function handleChipToggle(id: number) {
    const chipIndex = chips.findIndex((chip) => chip.id === id);

    if (chipIndex === -1) {
      return;
    }

    const chip = chips[chipIndex];

    setChips(chips.with(chipIndex, { ...chip, pressed: !chip.pressed }));
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Presentation of React-Chips</h1>
      <ul className={styles.buttons}>
        <li>
          <button type="button" onClick={handleChipAdd}>
            Add chip
          </button>
        </li>
        <li>
          <button type="button" onClick={handleChipRemove}>
            Remove chip
          </button>
        </li>
        <li>
          <button type="button" onClick={handleChipsClear}>
            Clear chips
          </button>
        </li>
      </ul>
      <Chips items={chips} onChipToggle={handleChipToggle} />
    </main>
  );
}

export default App;
