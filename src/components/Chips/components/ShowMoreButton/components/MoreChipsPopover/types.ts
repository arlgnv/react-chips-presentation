import { Popover } from "@base-ui/react/popover";

import type { Props as ShowMoreButtonProps } from "../../types";

interface Props extends Pick<ShowMoreButtonProps, "items" | "onChipToggle"> {
  handle: ReturnType<typeof Popover.createHandle>;
}

export type { Props };
