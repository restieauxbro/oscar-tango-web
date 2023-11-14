"use client";

import { useChat } from "ai/react";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <main className="grid min-h-screen place-items-center">
      <h1 className="text-5xl font-bold">Sup skukkies</h1>
      <div>
        {messages.map((m) => (
          <div key={m.id}>
            {m.role}: {m.content}
          </div>
        ))}

        <form onSubmit={handleSubmit}>
          <input
            value={input}
            className="w-full"
            placeholder="Say something..."
            onChange={handleInputChange}
          />
        </form>
      </div>
    </main>
  );
}
