import { AnimatedBackground } from "@/components/animated-background";
import { Logo } from "@/components/logo";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground dark">
      <AnimatedBackground />

      <div className="relative z-10 flex justify-center py-12">
        <Logo size="lg" />
      </div>
    </div>
  );
}
