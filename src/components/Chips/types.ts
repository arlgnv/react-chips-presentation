interface Item {
  id: number;
  text: string;
  pressed: boolean;
}

interface Props {
  items: Item[];
  onItemToggle: (id: number) => void;
}

export type { Props, Item };
