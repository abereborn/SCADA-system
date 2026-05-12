import { AnimatedSection } from "./AnimatedSection";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "center" | "left";
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  className = "",
  align = "center",
}: SectionTitleProps) {
  return (
    <AnimatedSection
      className={`${align === "center" ? "text-center" : ""} ${className}`}
    >
      {eyebrow && (
        <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">{title}</h2>
      {subtitle && (
        <p
          className={`text-muted-foreground leading-relaxed ${
            align === "center" ? "max-w-xl mx-auto" : "max-w-xl"
          }`}
        >
          {subtitle}
        </p>
      )}
    </AnimatedSection>
  );
}
