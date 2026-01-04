'use client';

import { AnimatedBackground } from "@/components/animated-background";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Sandpack } from "@codesandbox/sandpack-react";
import { useState } from "react";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="relative min-h-screen bg-background text-foreground dark">
      <AnimatedBackground />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-center py-12">
          <Logo size="lg" />
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-6xl px-6 pb-12">
          <div className="min-h-150 rounded-3xl border border-white/10 bg-white/60 p-8 shadow-lg backdrop-blur-xl dark:bg-neutral-900/60">
            {/* Step Counter */}
            <div className="mb-8">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Step {currentPage} of 2</span>
              </div>
              <div className="flex gap-2">
                <div className={`h-1 flex-1 rounded-full transition-all duration-700 ${
                  currentPage >= 1
                    ? 'bg-linear-to-r from-blue-500 to-violet-600'
                    : 'bg-muted'
                }`}></div>
                <div className={`h-1 flex-1 rounded-full transition-all duration-700 ${
                  currentPage >= 2
                    ? 'bg-linear-to-r from-blue-500 to-violet-600'
                    : 'bg-muted'
                }`}></div>
              </div>
            </div>

            {currentPage === 1 && (
              <>
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

                {/* Navigation Buttons */}
                <div className="mt-8 flex justify-between">
                  <div></div>
                  <Button variant="gradient" size="lg" onClick={() => setCurrentPage(2)}>
                    Next →
                  </Button>
                </div>
              </>
            )}

            {currentPage === 2 && (
              <>
                <h2 className="mb-6 text-2xl font-bold tracking-tight">
                  Interactive Example
                </h2>

                <Sandpack
                  theme="dark"
                  template="react"
                  files={{
                    '/App.js': `import { useState, useCallback } from 'react';
import { MemoButton } from './components/MemoButton';

export default function App() {
  const [count, setCount] = useState(0);

  // WITHOUT useCallback - new function every render
  const handleClickWithout = () => {
    console.log('Clicked without useCallback');
  };

  // WITH useCallback - same function reference
  const handleClickWith = useCallback(() => {
    console.log('Clicked with useCallback');
  }, []);

  return (
    <div style={{ padding: '20px', color: '#e5e5e5' }}>
      <div style={{
        padding: '16px',
        background: '#0a0a0a',
        borderRadius: '8px',
        marginBottom: '24px'
      }}>
        <p style={{ marginBottom: '12px', color: '#a0a0a0' }}>
          Parent Component State:
        </p>
        <button
          onClick={() => setCount(c => c + 1)}
          style={{
            padding: '8px 16px',
            background: '#64748b',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Increment Count: {count}
        </button>
        <p style={{ marginTop: '12px', fontSize: '14px', color: '#a0a0a0' }}>
          Click to trigger parent re-render
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px'
      }}>
        <div>
          <h3 style={{ color: '#f5f5f5', marginBottom: '8px' }}>
            WITHOUT useCallback
          </h3>
          <p style={{ fontSize: '14px', color: '#a0a0a0', marginBottom: '12px' }}>
            Re-renders every time
          </p>
          <MemoButton onClick={handleClickWithout} label="Click Me" />
        </div>

        <div>
          <h3 style={{ color: '#f5f5f5', marginBottom: '8px' }}>
            WITH useCallback
          </h3>
          <p style={{ fontSize: '14px', color: '#a0a0a0', marginBottom: '12px' }}>
            Doesn't re-render
          </p>
          <MemoButton onClick={handleClickWith} label="Click Me" />
        </div>
      </div>
    </div>
  );
}`,
                    '/components/MemoButton.js': `import { memo } from 'react';

// Memoized child component
export const MemoButton = memo(({ onClick, label }) => {
  const renderCount = ++MemoButton.renderCount;

  return (
    <div style={{
      padding: '16px',
      margin: '8px 0',
      background: '#1a1a1a',
      borderRadius: '8px',
      border: '1px solid #333'
    }}>
      <button
        onClick={onClick}
        style={{
          padding: '8px 16px',
          background: '#333',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          width: '100%'
        }}
      >
        {label}
      </button>
      <p style={{ marginTop: '8px', fontSize: '14px', color: '#888' }}>
        Renders: <span style={{ color: '#64748b', fontFamily: 'monospace' }}>{renderCount}</span>
      </p>
    </div>
  );
});

MemoButton.renderCount = 0;`,
                  }}
                  options={{
                    showNavigator: true,
                    showTabs: true,
                    showLineNumbers: true,
                    editorHeight: 600,
                  }}
                />

                {/* Navigation Buttons */}
                <div className="mt-8 flex justify-between">
                  <Button variant="ghost" onClick={() => setCurrentPage(1)}>
                    ← Back
                  </Button>
                  <div></div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
