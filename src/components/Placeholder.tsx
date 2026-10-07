interface PlaceholderProps {
  children: React.ReactNode;
  aspectRatio?: string;
  className?: string;
}

export function Placeholder({
  children,
  aspectRatio,
  className = "",
}: PlaceholderProps) {
  return (
    <div
      className={`border-[1.5px] border-dashed rounded flex items-center justify-center text-center ${className}`}
      style={{
        borderColor: "currentColor",
        opacity: 0.4,
        aspectRatio,
        padding: "20px",
        fontSize: "13px",
        fontWeight: 500,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </div>
  );
}
