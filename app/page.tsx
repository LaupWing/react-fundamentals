'use client';

import { useState, useCallback, memo } from 'react';

// Child component WITHOUT React.memo
function ButtonWithoutMemo({ onClick, label }: { onClick: () => void; label: string }) {
  const renderCount = ++ButtonWithoutMemo.renderCount;

  return (
    <div className="rounded border border-[#404040] bg-[#252525] p-4">
      <button
        onClick={onClick}
        className="w-full rounded bg-[#333333] px-4 py-2 text-[#e5e5e5] hover:bg-[#404040] transition-colors"
      >
        {label}
      </button>
      <p className="mt-2 text-sm text-[#a0a0a0]">
        Renders: <span className="font-mono text-[#64748b]">{renderCount}</span>
      </p>
    </div>
  );
}
ButtonWithoutMemo.renderCount = 0;

// Child component WITH React.memo
const ButtonWithMemo = memo(function ButtonWithMemo({ onClick, label }: { onClick: () => void; label: string }) {
  const renderCount = ++ButtonWithMemo.renderCount;

  return (
    <div className="rounded border border-[#404040] bg-[#252525] p-4">
      <button
        onClick={onClick}
        className="w-full rounded bg-[#333333] px-4 py-2 text-[#e5e5e5] hover:bg-[#404040] transition-colors"
      >
        {label}
      </button>
      <p className="mt-2 text-sm text-[#a0a0a0]">
        Renders: <span className="font-mono text-[#64748b]">{renderCount}</span>
      </p>
    </div>
  );
});
ButtonWithMemo.renderCount = 0;

export default function Home() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);

  // WITHOUT useCallback - creates new function every render
  const handleClickWithout = () => {
    console.log('Clicked without useCallback');
  };

  // WITH useCallback - same function reference across renders
  const handleClickWith = useCallback(() => {
    console.log('Clicked with useCallback');
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5]">
      {/* Header */}
      <header className="border-b border-[#333333] bg-[#121212] px-8 py-6">
        <h1 className="text-3xl font-semibold text-[#f5f5f5]">
          Understanding useCallback
        </h1>
        <p className="mt-2 text-[#a0a0a0]">
          Why AI uses it everywhere (and when you actually need it)
        </p>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-8 py-12 space-y-8">

        {/* Explanation */}
        <section className="rounded-lg border border-[#333333] bg-[#1a1a1a] p-6">
          <h2 className="text-xl font-semibold text-[#f5f5f5] mb-4">The Problem</h2>
          <p className="text-[#b0b0b0] leading-relaxed">
            Every time a component re-renders, all functions inside it are <span className="text-[#e5e5e5]">recreated from scratch</span>.
            This means they're <span className="text-[#e5e5e5]">new function objects</span> with different references, even if they do the exact same thing.
          </p>
          <p className="text-[#b0b0b0] leading-relaxed mt-4">
            When you pass these functions as props to child components wrapped in <span className="font-mono text-[#64748b]">React.memo</span>,
            the child thinks it received a <span className="text-[#e5e5e5]">different prop</span> and re-renders unnecessarily.
          </p>
        </section>

        {/* Interactive Demo */}
        <section className="rounded-lg border border-[#333333] bg-[#1a1a1a] p-6">
          <h2 className="text-xl font-semibold text-[#f5f5f5] mb-4">Interactive Demo</h2>

          {/* Parent Controls */}
          <div className="mb-6 rounded border border-[#404040] bg-[#0a0a0a] p-4">
            <p className="text-[#a0a0a0] mb-4">Parent Component State:</p>
            <div className="flex gap-4">
              <button
                onClick={() => setCount(c => c + 1)}
                className="rounded bg-[#64748b] px-4 py-2 text-[#f5f5f5] hover:bg-[#78716c] transition-colors"
              >
                Increment Count: {count}
              </button>
              <button
                onClick={() => setOtherState(c => c + 1)}
                className="rounded bg-[#64748b] px-4 py-2 text-[#f5f5f5] hover:bg-[#78716c] transition-colors"
              >
                Change Other State: {otherState}
              </button>
            </div>
            <p className="text-sm text-[#a0a0a0] mt-4">
              Click either button to trigger a parent re-render and watch the render counts below
            </p>
          </div>

          {/* Comparison */}
          <div className="grid gap-6 md:grid-cols-2">

            {/* Without useCallback */}
            <div>
              <h3 className="text-[#f5f5f5] font-semibold mb-3">
                WITHOUT useCallback
              </h3>
              <p className="text-sm text-[#a0a0a0] mb-4">
                Child wrapped in React.memo but function recreated every render
              </p>
              <ButtonWithMemo onClick={handleClickWithout} label="Click Me" />
              <div className="mt-4 rounded bg-[#0a0a0a] p-3 font-mono text-xs text-[#b0b0b0]">
                <code>{`const handleClick = () => {
  console.log('clicked');
};

<MemoChild onClick={handleClick} />`}</code>
              </div>
            </div>

            {/* With useCallback */}
            <div>
              <h3 className="text-[#f5f5f5] font-semibold mb-3">
                WITH useCallback
              </h3>
              <p className="text-sm text-[#a0a0a0] mb-4">
                Same function reference prevents unnecessary re-renders
              </p>
              <ButtonWithMemo onClick={handleClickWith} label="Click Me" />
              <div className="mt-4 rounded bg-[#0a0a0a] p-3 font-mono text-xs text-[#b0b0b0]">
                <code>{`const handleClick = useCallback(() => {
  console.log('clicked');
}, []);

<MemoChild onClick={handleClick} />`}</code>
              </div>
            </div>

          </div>
        </section>

        {/* When to Use */}
        <section className="rounded-lg border border-[#333333] bg-[#1a1a1a] p-6">
          <h2 className="text-xl font-semibold text-[#f5f5f5] mb-4">When Do You Actually Need It?</h2>

          <div className="space-y-4">
            <div className="border-l-2 border-[#64748b] pl-4">
              <p className="text-[#e5e5e5] font-semibold">✓ Child wrapped in React.memo</p>
              <p className="text-[#a0a0a0] text-sm">Without React.memo, useCallback does nothing useful</p>
            </div>

            <div className="border-l-2 border-[#64748b] pl-4">
              <p className="text-[#e5e5e5] font-semibold">✓ Function is a dependency in useEffect</p>
              <p className="text-[#a0a0a0] text-sm">Prevents infinite loops in effects</p>
            </div>

            <div className="border-l-2 border-[#404040] pl-4">
              <p className="text-[#a0a0a0] font-semibold">✗ Regular onClick handlers</p>
              <p className="text-[#a0a0a0] text-sm">Creating functions is cheap, useCallback adds overhead</p>
            </div>

            <div className="border-l-2 border-[#404040] pl-4">
              <p className="text-[#a0a0a0] font-semibold">✗ Non-memoized components</p>
              <p className="text-[#a0a0a0] text-sm">They re-render anyway, so it doesn't help</p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
