export function LandingBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base Background */}
      <div className="absolute inset-0 bg-white dark:bg-black" />

      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-40 dark:opacity-30 bg-[linear-gradient(to_right,rgba(14,165,233,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,165,233,0.18)_1px,transparent_1px)] bg-[size:70px_70px] animate-[gridMove_20s_linear_infinite]" />

      {/* Cyan Glow */}
      <div className="absolute top-[-200px] left-[-100px] w-[600px] h-[600px] rounded-full bg-cyan-500/15 dark:bg-cyan-500/20 blur-[140px]" />

      {/* Blue Glow */}
      <div className="absolute bottom-[-250px] right-[-100px] w-[600px] h-[600px] rounded-full bg-blue-500/10 dark:bg-blue-600/20 blur-[160px]" />

      {/* Indonesia Hologram Map */}
      <div className="absolute right-[4%] top-[32%] hidden lg:block w-[560px] opacity-90 dark:opacity-80">
        {/* ambient glow */}
        <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-[140px]" />
        <img
          src="/indonesia-map.svg"
          alt="Indonesia Map"
          className="
            relative
            w-full
            h-auto
            object-contain
            opacity-75
            animate-[mapGlow_4s_ease-in-out_infinite]
            brightness-125
            contrast-125
            saturate-150
            [filter:drop-shadow(0_0_18px_rgba(34,211,238,0.45))]
        "
        />
        {/* nodes */}
        <div className="absolute left-[33%] top-[58%] w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <div className="absolute left-[47%] top-[43%] w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <div className="absolute left-[67%] top-[50%] w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-white/30 dark:bg-black/40" />
    </div>
  );
}
