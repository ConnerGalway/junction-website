import { cx } from "./ui/cx";

interface PlaceholderProps {
  children: React.ReactNode;
  aspectRatio?: string;
  className?: string;
}

/** Dashed stand-in for media or content that doesn't exist yet. */
export function Placeholder({ children, aspectRatio, className }: PlaceholderProps) {
  return (
    <div
      className={cx(
        "flex items-center justify-center rounded-card border-[1.5px] border-dashed border-current p-5 text-center text-[13px] font-medium uppercase tracking-[0.08em] text-(--tone-muted)",
        className
      )}
      style={{ aspectRatio }}
    >
      {children}
    </div>
  );
}
