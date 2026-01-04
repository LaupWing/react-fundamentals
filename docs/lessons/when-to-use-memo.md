# When to Use React.memo

You're absolutely right - **it STARTS with React.memo!** useCallback only makes sense if you're using React.memo.

## When Should You Use React.memo?

### DON'T Use It By Default (Most Cases)

❌ **Don't wrap everything in React.memo "just in case"**
- It adds overhead (comparing props costs time too)
- Makes code harder to read
- Usually unnecessary

❌ **Don't use it for fast components**
- If the component renders quickly (< 5ms)
- Re-rendering is fine and fast

❌ **Don't use it if parent rarely re-renders**
- No point preventing re-renders that barely happen

---

### ONLY Use React.memo When:

✅ **1. Component is expensive to render**
- Large lists (1000+ items)
- Heavy calculations
- Complex DOM trees
- **Measure this with React DevTools Profiler!**

✅ **2. Parent re-renders frequently**
- Parent has state that changes often
- But child's props rarely change

✅ **3. You've tried simpler solutions first**
- Component composition didn't work
- Children prop pattern didn't work
- You measured and confirmed it's slow

---

### The Decision Flow

```
Is the child component slow to render?
  └─ NO → Don't use React.memo
  └─ YES → Does the parent re-render often?
      └─ NO → Don't use React.memo
      └─ YES → Do the child's props rarely change?
          └─ NO → Don't use React.memo
          └─ YES → Try component composition first
              └─ Didn't work? → NOW use React.memo
                  └─ Passing functions? → ALSO need useCallback
```

---

### Example: When React.memo Makes Sense

```javascript
// Parent re-renders every second (timer)
function Dashboard() {
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p>Time: {time}</p>
      {/* ExpensiveChart renders 1000+ items, takes 50ms */}
      {/* But chartData never changes! */}
      <ExpensiveChart data={chartData} /> {/* Re-renders every second! */}
    </div>
  );
}

// ✅ React.memo makes sense here
const ExpensiveChart = memo(({ data }) => {
  // Heavy rendering logic
  return <ComplexVisualization />;
});
```

---

### The Truth

**React.memo is an optimization, not a default**

1. Start without it
2. Build your app
3. Use React DevTools Profiler to find slow components
4. Try component composition first
5. If that doesn't work AND you measured a problem → use React.memo
6. If you're passing functions → ALSO need useCallback

**Most apps never need React.memo at all!**

---

## Summary

- **React.memo comes FIRST** - it's the reason you'd ever need useCallback
- **Don't use it by default** - only when you have a measured performance problem
- **Always try simpler solutions first** - component composition, children props
- **useCallback is useless without React.memo** - they work together as a pair
- **Most apps never need either** - React is already fast enough!
