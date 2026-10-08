import { cx } from "./cx";

/** Small round placeholder for a headshot that hasn't been supplied yet. */
export function AvatarSlot({ label, className }: { label: string; className?: string }) {
  return (
    <span
      role="img"
      aria-label={`${label} (photo to come)`}
      className={cx(
        "inline-block size-12 shrink-0 rounded-full border-[1.5px] border-dashed border-current opacity-60",
        className
      )}
    />
  );
}
