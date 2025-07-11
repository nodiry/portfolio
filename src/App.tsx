import { useEffect, useState } from "react";
import Shell from "./components/Shell";

export type Lang = "en" | "ko" | "uz" | "ru";

export function playSound(path: string, volume = 1) {
  const audio = new Audio(path);
  audio.volume = volume;
  audio.play();
}

function App() {
  const [booted, setBooted] = useState(false);
  const [language, setLanguage] = useState<Lang | null>(null);

  // Keyboard input for boot & language selection
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!booted && e.key === "Enter") {
        playSound("/click1.mp3");
        setBooted(true);
        playSound("/run.mp3"); // boot sound
      } else if (booted && !language) {
        if (e.key.toLowerCase() === "e") {
          playSound("/click2.mp3");
          setLanguage("en");
          document.title = "Bokiev Nodirbek";
        }
        if (e.key.toLowerCase() === "k") {
          playSound("/click2.mp3");
          setLanguage("ko");
          document.title = "보키에브 노디르벡";
        }
        if (e.key.toLowerCase() === "r") {
          playSound("/click2.mp3");
          setLanguage("ru");
          document.title = "Bokiev Nodirbek";
        }
        if (e.key.toLowerCase() === "u") {
          playSound("/click2.mp3");
          setLanguage("uz");
          document.title = "Boqiyev Nodirbek";
        }
      } else {
        playSound("/click1.mp3"); // light beep for every other key
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [booted, language]);

  if (!booted) {
    return (
      <div className="w-screen h-screen bg-black flex justify-center items-center">
        <button
          onClick={() => setBooted(true)}
          className="text-white text-xl px-6 py-3 animate-pulse shadow-[4px_4px_0px_#444]"
        >
          BOOT
        </button>
      </div>
    );
  }

  if (!language) {
    return (
      <div className="w-screen h-screen bg-black text-terminal-green font-mono flex flex-col justify-center items-center gap-4">
        <p>Select Language</p>
        <div className="flex gap-6">
          <button
            onClick={() => {
              setLanguage("en");
              document.title = "Bokiev Nodirbek";
            }}
            className="text-white px-4 py-2 shadow-[4px_4px_0px_#444]"
          >
            English (E)
          </button>
          <button
            onClick={() => {
              setLanguage("ko"), (document.title = "보키에브노디르벡");
            }}
            className="text-white px-4 py-2 shadow-[4px_4px_0px_#444]"
          >
            한국어 (K)
          </button>
          <button
            onClick={() => {
              setLanguage("ru"), (document.title = "보키에브노디르벡");
            }}
            className="text-white px-4 py-2 shadow-[4px_4px_0px_#444]"
          >
            Russian (R)
          </button>
          <button
            onClick={() => {
              setLanguage("uz"), (document.title = "보키에브노디르벡");
            }}
            className="text-white px-4 py-2 shadow-[4px_4px_0px_#444]"
          >
            O'zbekcha (U)
          </button>
        </div>
      </div>
    );
  }

  return <Shell lang={language} />;
}

export default App;
