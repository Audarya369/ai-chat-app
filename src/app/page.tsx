"use client";

import { useState } from "react";
import type { Message } from "@/types/chat";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  async function sendMessage() {
    if (!input.trim()) return;

    console.log("Sending message:", input);

    const newMessages: Message[] = [
      ...messages,
      {
        role: "user",
        content: input,
      },
    ];

    setMessages(newMessages);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: newMessages,
      }),
    });

    const data = await res.json();

    setMessages([
      ...newMessages,
      {
        role: "assistant",
        content: data.reply,
      },
    ]);
  }

  return (
    <main className="p-10 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        AI Chat App
      </h1>

      <div className="space-y-3 mb-6">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={
              msg.role === "user"
                ? "text-right"
                : "text-left"
            }
          >
            <div
              className={
                msg.role === "user"
                  ? "bg-black text-white inline-block p-3 rounded-lg"
                  : "bg-gray-200 inline-block p-3 rounded-lg"
              }
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <textarea
        className="border w-full p-3 rounded"
        rows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
      />

      <button
        onClick={sendMessage}
        className="bg-black text-white px-4 py-2 mt-4 rounded"
      >
        Send
      </button>
    </main>
  );
}