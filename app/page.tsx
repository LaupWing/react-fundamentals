import { AnimatedBackground } from "@/components/animated-background";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground dark">
      <AnimatedBackground />

      <div className="relative z-10">
        <div className="flex justify-center py-12">
          <Logo size="lg" />
        </div>

        <div className="flex justify-center gap-4 py-12">
          <Button variant="gradient">Click Me</Button>
          <Button variant="gradient" size="lg">Large Gradient</Button>
          <Button variant="gradient" size="sm">Small</Button>
        </div>
      </div>
    </div>
  );
}
