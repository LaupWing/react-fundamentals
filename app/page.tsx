import { AnimatedBackground } from "@/components/animated-background";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground dark">
      <AnimatedBackground />

      <div className="relative z-10">
        <h1 className="text-4xl">React Fundamentals</h1>
      </div>
    </div>
  );
}
