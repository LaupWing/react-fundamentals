import { AnimatedBackground } from "@/components/animated-background";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground dark">
      <AnimatedBackground />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-center py-12">
          <Logo size="lg" />
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-4xl px-6">
          {/* Glass Container */}
          <div className="rounded-3xl border border-white/10 bg-white/60 p-8 shadow-lg backdrop-blur-xl dark:bg-neutral-900/60">
            <h1 className="mb-6 text-3xl font-bold tracking-tight">
              Understanding useCallback
            </h1>

            <div className="space-y-4 text-lg leading-relaxed text-foreground/90">
              <p>
                Here's the thing about useCallback that finally clicked for me...
              </p>

              <p>
                [Add your explanation and perspective here]
              </p>
            </div>

            {/* Next Button */}
            <div className="mt-8 flex justify-end">
              <Button variant="gradient" size="lg">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
