"use client"; // Ensure this runs on the client side
import { useState, useEffect, useRef } from "react";
import DOMPurify from "dompurify"; // To sanitize messages
import { marked } from "marked";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [messages, setMessages] = useState([]); // Stores chat messages
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(true); // Always open chat when clicked
  
  const minimizeChat = () => setIsOpen(false); // Only hides UI, keeps messages

  const closeChat = () => {
    setIsOpen(false);
    setMessages([]); // Clears chat messages when fully closed
  };

  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    // Loading animation
    setMessages([...newMessages, { role: "bot", content: "loading..." }]);

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CHATBOT_API_KEY}`,
          "HTTP-Referer": "<YOUR_SITE_URL>",
          "X-Title": "<YOUR_SITE_NAME>",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "google/gemini-2.0-pro-exp-02-05:free",
          "messages": [{ 
            role: "system",
            content: "You are an AI career advisor. Provide clear, concise responses (~60 words) focused on job guidance. If the user requests more details, expand up to 500 words while staying precise and relevant, only go over this limit by 1000 words if exccessively insisted by user. Maintain context across the conversation to offer personalized and insightful advice." 
    }, ...newMessages]
        })
      });

      const data = await response.json();
      console.log("API Response:", data); // Log response to debug issues

      const botResponse = data?.choices?.[0]?.message?.content;
      if (botResponse) {
        setMessages([...newMessages, { role: "bot", content: botResponse }]);
      } else {
        setMessages([...newMessages, { role: "bot", content: "⚠️ API returned an empty response." }]);
      }
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setMessages([...newMessages, { role: "bot", content: "⚠️ Error: " + error.message }]);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <div className="fixed bottom-5 right-5 flex items-center justify-center">
          <button
            onClick={toggleChat}
            className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-2xl transition hover:bg-[hsl(var(--primary)/0.8)]"
          >
            <img src="/Career Compass Logo.png" alt="Career Compass Logo" className="w-12 h-12" />
          </button>
        </div>
      )}

      {/* Chat Container */}
      {isOpen && (
        <div
          className={`fixed bottom-5 right-5 bg-[hsl(var(--card))] text-[hsl(var(--foreground))] border border-[hsl(var(--border))] rounded-lg shadow-lg flex flex-col transition-all duration-300 z-[9999] ${
            isFullscreen
              ? "inset-x-0 bottom-0 w-full h-[90vh] mx-auto rounded-t-lg" // Fullscreen mode (90% height, stays below header)
              : "w-[33%] h-[80vh]" // Floating mode (bottom-right)
          }`}
        >

          {/* Chat Header */}
          <div className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] p-3 flex justify-between items-center rounded-t-lg z-[9999] ">
            <h5 className="font-semibold">Career Campus AI</h5>
            <div className="space-x-3">              
              <button onClick={minimizeChat} className="text-lg hover:opacity-80">…</button> {/* Minimize Button */}
              <button onClick={toggleFullscreen} className="text-lg hover:opacity-80">⛶ </button>
              <button onClick={closeChat} className="text-lg hover:opacity-80">✖</button> {/* Close & Clear Button */}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 bg-[hsl(var(--background))] z-[9999] ">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 my-2 rounded-md w-fit max-w-[75%] break-words text-left ${
                  msg.role === "user"
                    ? "ml-auto bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]"
                    : "mr-auto bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]"
                }`}
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(msg.content)) }}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 flex items-center border-t border-[hsl(var(--border))] bg-[hsl(var(--card))] z-[9999] ">
            <input
              type="text"
              className="w-full border border-[hsl(var(--input))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] rounded-lg p-2 outline-none focus:ring focus:ring-[hsl(var(--ring))]"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage} className="ml-2 text-2xl text-[hsl(var(--primary-foreground))] hover:opacity-80 transition">✈️</button>
          </div>
        </div>
      )}
    </>
  );
}
