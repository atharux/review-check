import type { ScreenType } from "../types";

interface ScreenChipProps {
  filename: string;
  type: ScreenType;
}

/** A classified screenshot: filename in, screen type out. */
export function ScreenChip({ filename, type }: ScreenChipProps) {
  return (
    <span className="screen-chip">
      {filename}
      <span className="type">{type}</span>
    </span>
  );
}
