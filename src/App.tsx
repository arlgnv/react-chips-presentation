import { useState } from "react";

import Chips, { type Item } from "./components/Chips";
import styles from "./styles.module.css";

function App() {
  const [items, setItems] = useState<Item[]>([]);

  function handleItemAdd() {
    if (items.length === 0) {
      setItems([{ id: 1, text: "Chip 1", pressed: false }]);
    }

    const lastItem = items.at(-1);

    if (!lastItem) {
      return;
    }

    const newItemId = lastItem.id + 1;

    setItems([
      ...items,
      { id: newItemId, text: `Chip ${newItemId}`, pressed: false },
    ]);
  }

  function handleItemRemove() {
    setItems(items.slice(0, -1));
  }

  function handleItemsClear() {
    setItems([]);
  }

  function handleItemToggle(id: number, pressed: boolean) {
    const itemToToggle = items.find((item) => item.id === id);

    if (!itemToToggle) {
      return;
    }

    // todo: write logic for changing `items` local state
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Test assignment for Сириус.Курсы</h1>
      <ul className={styles.buttons}>
        <li>
          <button type="button" onClick={handleItemAdd}>
            Add chip
          </button>
        </li>
        <li>
          <button type="button" onClick={handleItemRemove}>
            Remove chip
          </button>
        </li>
        <li>
          <button type="button" onClick={handleItemsClear}>
            Clear chips
          </button>
        </li>
      </ul>
      <Chips items={items} onItemToggle={handleItemToggle} />
    </main>
  );
}

export default App;
