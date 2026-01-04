export function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Top left */}
      <div className="absolute -left-32 top-[15%] h-125 w-125 animate-blob rounded-full bg-linear-to-br from-cyan-500/15 via-blue-500/10 to-transparent blur-3xl" />

      {/* Top right */}
      <div className="animation-delay-2000 absolute -right-20 top-[20%] h-150 w-150 animate-blob rounded-full bg-linear-to-br from-purple-500/15 via-pink-500/10 to-transparent blur-3xl" />

      {/* Bottom center */}
      <div className="animation-delay-4000 absolute left-[30%] top-[70%] h-137.5 w-137.5 animate-blob rounded-full bg-linear-to-br from-blue-500/12 via-indigo-500/8 to-transparent blur-3xl" />
    </div>
  );
}
