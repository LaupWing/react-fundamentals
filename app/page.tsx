'use client';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5]">
      {/* Header */}
      <header className="border-b border-[#333333] bg-[#121212] px-8 py-6">
        <h1 className="text-3xl font-semibold text-[#f5f5f5]">
          Understanding React Hooks
        </h1>
        <p className="mt-2 text-[#a0a0a0]">
          Interactive guide to useCallback and useMemo
        </p>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-8 py-12">
        <div className="grid gap-8 lg:grid-cols-2">

          {/* useCallback Section */}
          <section className="rounded-lg border border-[#333333] bg-[#1a1a1a] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-[#f5f5f5]">
                useCallback
              </h2>
              <span className="rounded bg-[#252525] px-3 py-1 font-mono text-sm text-[#64748b]">
                Hook
              </span>
            </div>

            <p className="mb-6 text-[#b0b0b0]">
              Memoizes callback functions to prevent unnecessary re-renders of child components.
            </p>

            {/* Code Example */}
            <div className="mb-6 rounded border border-[#404040] bg-[#0a0a0a] p-4">
              <pre className="overflow-x-auto font-mono text-sm text-[#e5e5e5]">
                <code>{`const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b]
);`}</code>
              </pre>
            </div>

            {/* Interactive Demo Placeholder */}
            <div className="rounded border border-[#404040] bg-[#252525] p-8 text-center">
              <p className="text-[#a0a0a0]">Interactive demo coming soon</p>
            </div>
          </section>

          {/* useMemo Section */}
          <section className="rounded-lg border border-[#333333] bg-[#1a1a1a] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-[#f5f5f5]">
                useMemo
              </h2>
              <span className="rounded bg-[#252525] px-3 py-1 font-mono text-sm text-[#64748b]">
                Hook
              </span>
            </div>

            <p className="mb-6 text-[#b0b0b0]">
              Memoizes expensive calculations to avoid recomputing on every render.
            </p>

            {/* Code Example */}
            <div className="mb-6 rounded border border-[#404040] bg-[#0a0a0a] p-4">
              <pre className="overflow-x-auto font-mono text-sm text-[#e5e5e5]">
                <code>{`const memoizedValue = useMemo(
  () => computeExpensiveValue(a, b),
  [a, b]
);`}</code>
              </pre>
            </div>

            {/* Interactive Demo Placeholder */}
            <div className="rounded border border-[#404040] bg-[#252525] p-8 text-center">
              <p className="text-[#a0a0a0]">Interactive demo coming soon</p>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
