import { useEffect, useRef, useState, type JSX } from "react";

export default function HomeTab({ lang }: { lang: "en" | "ko" }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleLines, setVisibleLines] = useState<number>(0);

  // These are your terminal output lines (can be text or JSX)
  const lines: (string | JSX.Element)[] = [
    `boot@resume:~$ echo "Welcome to Robert's Terminal Resume"`,
    `Welcome to Robert's Terminal Resume`,
    ``,
    `Name: Bokiev Nodirbek`,
    `Title: Senior Backend Developer & System Architect`,
    `Location: Busan, South Korea`,
    `Education: Dongseo University`,
    `Current Role: Fullstack Developer`,
    ``,
    `Tech Stack & Expertise:`,
    ` - Backend: Bun.js, Node.js, TypeScript, Go, Java`,
    ` - Frameworks: Express, Fastify, Go Fiber, Spring Boot, Actix`,
    ` - Frontend: Next.js, React, Vite`,
    ` - Databases: MongoDB, PostgreSQL, Memcached`,
    ` - Protocols: gRPC, WebSocket, REST API`,
    ``,
    `Download Resume: [link]`,
    `Contact: worknadir95@gmail.com`,
    `Social: GitHub, LinkedIn, Telegram`,
  ];

  // reveal one line every 100ms
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev < lines.length) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // auto scroll to bottom on new line
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [visibleLines]);

  return (
    <div
      ref={containerRef}
      className="overflow-y-auto h-[calc(100vh-100px)] p-2 bg-black text-terminal-green font-mono text-sm leading-relaxed"
    >
      {lines.slice(0, visibleLines).map((line, i) => (
        <div key={i} className="whitespace-pre-wrap">{line}</div>
      ))}
      <div className="h-4" /> {/* small pad at bottom for smooth scroll */}
    </div>
  );
}
