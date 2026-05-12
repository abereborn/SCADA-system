interface ScanLineProps {
  className?: string;
}

export function ScanLine({ className = "" }: ScanLineProps) {
  return (
    <div
      className={`h-px w-full ${className}`}
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, hsl(var(--primary)/.5) 40%, hsl(var(--primary)/.5) 60%, transparent 100%)",
      }}
    />
  );
}
