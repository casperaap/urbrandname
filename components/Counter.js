"use client";

import { useState, useTransition } from "react";

export default function Counter({ title, counterId }) {
  const [count, setCount] = useState(0);
  const [isPending, startTransition] = useTransition();

  // ───────────────────────────── helpers
  const baseSize = 16;            // base font size (px)
  const fontSize = baseSize + count * 2;

  /** Send the action to the API route. Rolls back UI if the call fails. */
  async function postAction(action) {
    // optimistic UI update
    setCount((prev) => (action === "increment" ? prev + 1 : prev - 1));

    try {
      const res = await fetch("/api/counter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, counterId }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);
    } catch (err) {
      // roll back UI on error
      console.error(err);
      setCount((prev) => (action === "increment" ? prev - 1 : prev + 1));
      alert("Something went wrong – check the console for details.");
    }
  }

  const increment = () => startTransition(() => postAction("increment"));
  const decrement = () => startTransition(() => postAction("decrement"));

  // ───────────────────────────── mark‑up
  return (
    <div className="flex items-center space-x-4">
      {/* Controls */}
      <button
        onClick={decrement}
        className="btn btn-circle"
        disabled={isPending}
      >
        -
      </button>

      <div className="w-10 h-10 flex items-center justify-center bg-purple-500 text-white font-bold rounded">
        {count}
      </div>

      <button
        onClick={increment}
        className="btn btn-circle"
        disabled={isPending}
      >
        +
      </button>

      {/* Title with dynamic font size */}
      <span style={{ fontSize: `${fontSize}px` }}>
        {title}
      </span>
    </div>
  );
}