
import React, { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">AI Prototype Starter</h1>
      <p className="mt-2 text-neutral-600">
        React + Tailwind + Vite. Ask your AI to add a small feature, then ship.
      </p>

      <section className="mt-6 grid gap-3 sm:grid-cols-2">
        <button
          onClick={() => setCount((c) => c + 1)}
          className="rounded-2xl border border-neutral-300 bg-white px-4 py-2 shadow-sm hover:shadow-md"
        >
          Clicks: <span className="font-mono">{count}</span>
        </button>

        <button
          onClick={() => alert('Now ask your AI to replace this alert with a toast. Or tabs. Or a form.')}
          className="rounded-2xl border border-neutral-300 bg-white px-4 py-2 shadow-sm hover:shadow-md"
        >
          Do something useful
        </button>
      </section>

      <div className="mt-8 rounded-2xl border border-dashed border-neutral-300 p-4">
        <h2 className="font-medium">Try these prompts</h2>
        <ul className="list-disc pl-6 text-sm text-neutral-700">
          <li>Add a simple toast component and wire it to the second button.</li>
          <li>Refactor the button styles into reusable Tailwind classes.</li>
          <li>Create a small tabs component with keyboard navigation.</li>
        </ul>
      </div>
    </main>
  )
}
