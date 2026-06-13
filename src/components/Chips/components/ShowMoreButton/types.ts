import type { Props as ChipProps } from "../../types";

import type { Item } from "../../types";

interface Props extends Pick<ChipProps, "onItemToggle"> {
  items: Item[];
}

export type { Props };
