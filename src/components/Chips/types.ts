interface Item {
  id: number;
  text: string;
}

interface Props {
  items: Item[];
}

export type { Props, Item };
