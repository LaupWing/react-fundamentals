# The Only Moments You Should Use React.memo and useCallback

## TL;DR
**Don't reach for these hooks first.** Use component composition and children props instead. Only use `React.memo` and `useCallback` as a last resort.

---

## Better Solutions First!

### 1. Component Composition (BEST SOLUTION)

Move state down to where it's actually used. Keep components small and focused.

#### Before (Bad):
```javascript
function Parent() {
  const [count, setCount] = useState(0);
  const [name] = useState('John');

  return (
    <div>
      {/* Count changes cause EVERYTHING to re-render */}
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <Child name={name} /> {/* Re-renders unnecessarily! */}
    </div>
  );
}
```

#### After (Good):
```javascript
// Button in its own component - only THIS re-renders
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}

function Parent() {
  const [name] = useState('John');

  return (
    <div>
      <Counter /> {/* Re-renders independently */}
      <Child name={name} /> {/* Doesn't re-render! */}
    </div>
  );
}
```

**Benefits:**
- No React.memo needed
- No useCallback needed
- Cleaner code
- Easier to understand and maintain

---

### 2. Lift Children (Children Prop Pattern)

When you can't move state down, lift stable content up as children.

#### How it works:
```javascript
function Parent({ children }) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      {children} {/* Children DON'T re-render when count changes! */}
    </div>
  );
}

// Usage
function App() {
  return (
    <Parent>
      <Child name="John" /> {/* Created in App, not Parent */}
    </Parent>
  );
}
```

#### Why it works:
When `Parent` re-renders, the `children` prop is the same object reference created in `App`. React sees no change and skips re-rendering the children.

#### Real-world example:
```javascript
// Layout component with sidebar state
function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <Sidebar isOpen={sidebarOpen} onToggle={setSidebarOpen} />
      <main>
        {children} {/* Page content doesn't re-render when sidebar toggles! */}
      </main>
    </div>
  );
}

// Usage
<Layout>
  <ExpensivePageContent /> {/* Safe from Layout re-renders */}
</Layout>
```

**Benefits:**
- No React.memo needed
- No useCallback needed
- Natural React pattern
- Great for layout components

---

## When Better Solutions Don't Work

### 3. React.memo + useCallback (LAST RESORT)

Only use when you've tried composition and children props but still have performance issues.

---

## Understanding The Problem

### What's NOT the problem:
Creating new functions is **cheap**. JavaScript does this all the time. Don't worry about it.

### What IS the problem:
**Unnecessary component re-renders** are expensive (DOM updates, calculations, running component logic).

---

## How React.memo Works (Without useCallback)

`React.memo` wraps a component and compares its props. If props haven't changed, it skips re-rendering.

### Works great with primitive values:

```javascript
const Child = memo(function Child({ name, age }) {
  console.log('Child rendered!');
  return <div>{name} is {age}</div>;
});

function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <Child name="John" age={25} />
      {/* Child DOESN'T re-render when count changes! */}
    </div>
  );
}
```

**Why it works:** Primitives (strings, numbers, booleans) are compared by value.
- `"John" === "John"` → `true`
- `25 === 25` → `true`

---

## The Function Problem

### React.memo BREAKS with functions:

```javascript
const Child = memo(function Child({ onClick }) {
  console.log('Child rendered!');
  return <button onClick={onClick}>Click</button>;
});

function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    console.log('clicked');
  };

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <Child onClick={handleClick} />
      {/* Child RE-RENDERS every time! React.memo is useless here! */}
    </div>
  );
}
```

**Why it breaks:** Functions are objects. Each render creates a NEW function object.
- `() => {} === () => {}` → `false` (different references!)

React.memo sees a "different" function and thinks the prop changed, so it re-renders anyway.

---

## Enter useCallback

`useCallback` memoizes the function, keeping the same reference across renders.

```javascript
const Child = memo(function Child({ onClick }) {
  console.log('Child rendered!');
  return <button onClick={onClick}>Click</button>;
});

function Parent() {
  const [count, setCount] = useState(0);

  // Same function reference across renders
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <Child onClick={handleClick} />
      {/* Child DOESN'T re-render! */}
    </div>
  );
}
```

**Now it works:** `handleClick` has the same reference, React.memo sees no change, skips re-render.

---

## The Truth About useCallback

### useCallback is USELESS without React.memo:

```javascript
function RegularChild({ onClick }) {
  // This re-renders every time parent re-renders
  // useCallback doesn't help at all!
  return <button onClick={onClick}>Click</button>;
}

function Parent() {
  const [count, setCount] = useState(0);

  // WASTED EFFORT - useCallback does nothing here
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <RegularChild onClick={handleClick} />
    </div>
  );
}
```

**Why:** Regular components always re-render when parent re-renders, regardless of props.

---

## React.memo + useCallback: When They Work Together

### You need BOTH when:
1. Child is wrapped in `React.memo`
2. You're passing a function as a prop

```javascript
// Need useCallback because we're passing a function
const handleClick = useCallback(() => {}, []);

// Need React.memo to skip re-renders
const MemoChild = memo(({ onClick }) => {});

<MemoChild onClick={handleClick} />
```

### React.memo alone works when:
- Only passing primitives (strings, numbers, booleans)
- Only passing stable references (context values, refs)

---

## The Exception: useEffect Dependencies

useCallback is useful for `useEffect` dependencies, even without React.memo:

```javascript
function Component({ userId }) {
  // Without useCallback, this would be a new function every render
  const fetchData = useCallback(() => {
    fetch(`/api/users/${userId}`);
  }, [userId]);

  useEffect(() => {
    fetchData();
    // This effect only runs when fetchData changes
    // Without useCallback, it would run every render (infinite loop!)
  }, [fetchData]);
}
```

---

## The Decision Tree

```
Need to prevent re-renders?
│
├─ 1. Can you move state to a child component?
│  └─ YES → Component Composition! (Best solution)
│     Example: Extract <Counter /> component
│
├─ 2. Can you use children prop pattern?
│  └─ YES → Lift Children! (Good solution)
│     Example: <Layout>{children}</Layout>
│
└─ NO → OK, now consider React.memo
   │
   ├─ Passing only primitives?
   │  └─ React.memo alone is fine
   │
   └─ Passing functions?
      └─ Need React.memo + useCallback together
```

---

## Why AI Uses Them Everywhere

AI code generators err on the side of "optimization" without understanding context:
- They don't know your component structure
- They can't measure if there's an actual performance problem
- They default to "safe" patterns that feel professional
- **Result:** Overuse of React.memo and useCallback

**Better approach:** Start simple, optimize only when you have a proven performance issue.

---

## Summary Table

| Scenario | Solution | Need React.memo? | Need useCallback? |
|----------|----------|------------------|-------------------|
| State in parent, child doesn't use it | **Component Composition** | No | No |
| Static children in dynamic parent | **Children Prop Pattern** | No | No |
| Passing primitives to child | React.memo | Yes | No |
| Passing functions to memoized child | React.memo + useCallback | Yes | Yes |
| Function in useEffect deps | useCallback only | No | Yes |
| Regular onClick handlers | Nothing | No | No |

---

## Golden Rules

1. **Try component composition first** - move state down
2. **Try children props second** - lift content up
3. **Use React.memo + useCallback last** - only when needed
4. **Premature optimization is waste** - optimize when you measure a problem, not before

**If you're not sure whether you need these hooks, you probably don't.**
