import type { Props as ChipsProps } from "../../types";

interface Props extends Pick<ChipsProps, "items"> {
  ref: React.RefObject<HTMLDivElement | null>;
}

export type { Props };
