"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  async function sendMessage() {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setReply(data.reply);
  }

  return (
    <main className="p-10 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        App
      </h1>

      <textarea
        className="border w-full p-3 rounded"
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={sendMessage}
        className="bg-black text-white px-4 py-2 mt-4 rounded"
      >
        Send
      </button>

      {reply && (
        <div className="mt-6 border p-4 rounded">
          {reply}
        </div>
      )}
    </main>
  );
}