interface PulseDotProps {
  color?: string;
  size?: number;
}

export function PulseDot({ color = "#34d399", size = 8 }: PulseDotProps) {
  return (
    <span className="relative flex" style={{ width: size, height: size }}>
      <span
        className="absolute inline-flex h-full w-full rounded-full animate-ping opacity-60"
        style={{ background: color }}
      />
      <span
        className="relative inline-flex rounded-full"
        style={{ width: size, height: size, background: color }}
      />
    </span>
  );
}
