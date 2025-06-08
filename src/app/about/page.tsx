import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ContactCard from "@/components/ContactCard";

export default function AboutMePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 mt-10">About Me</h1>
      <p className="text-lg mb-4">
        I'm <strong>Nodirbek Bokiev</strong>, a backend engineer obsessed with
        system performance, control, and clean structure. My journey started in
        2018 with Kotlin (and a broken calculator app that couldn’t divide).
        Since then, I’ve grown into a builder who deeply values minimalism,
        brutalist structure, and real hands-on experimentation.
      </p>

      <Separator className="my-6" />

      <h2 className="text-2xl font-semibold mb-2">🚀 Philosophy</h2>
      <p className="mb-4">
        I love to be in control — and backend development gives me that. From
        orchestrating complex APIs to handling TBs of data, backend work is an
        act of discipline and creativity. If I hadn’t chosen computer science,
        I’d be in architecture — structure, order, and brutalism attract me.
      </p>

      <h2 className="text-2xl font-semibold mb-2">📚 Education & Career</h2>
      <p className="mb-2">
        I joined <strong>Busan Dongseo University</strong> in 2021, starting in
        Computer Engineering, which later became the Computer Science
        department. In 2024, I started working as a full-stack developer at{" "}
        <strong>SRZ Memor</strong>, a powerful Uzbek construction manufacturing
        company operating as a conglomerate under the label "Xususiy Korxona".
      </p>

      <h2 className="text-2xl font-semibold mb-2">🧠 Learning Stack</h2>
      <p className="mb-2">
        I learned most of my skills hands-on. While I took multiple in-depth
        courses from CodeWithMosh (React, Node.js, SQL, TypeScript, Docker, DSA,
        Git, etc.), my real learning came from building. Experimenting with both
        new and mature technologies helped me solidify my stack.
      </p>
      <p className="mb-2">
        The most powerful realization for me wasn’t about which tech to use —
        but the importance of
        <strong> design patterns </strong> and architecture. The "Gang of Four"
        book on design patterns had a huge influence on how I think. No single
        paradigm fits all. Knowing when to use what — that’s power.
      </p>

      <h2 className="text-2xl font-semibold mb-2">🧰 My Tech Stack</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
        {[
          "TypeScript",
          "Rust",
          "Go",
          "Java",
          "React + Vite",
          "Bun",
          "Express",
          "Fastify",
          "MongoDB",
          "PostgreSQL",
          "Memcached",
          "Valkey",
          "GRPC",
          "Socket.IO",
          "WS",
          "Docker",
        ].map((tech) => (
          <Badge key={tech} className="text-sm py-1 px-2">
            {tech}
          </Badge>
        ))}
      </div>
      <p className="mb-4">
        I began with Node.js, JS, Redis, MySQL, EJS — then moved to Next.js, and
        later dropped it for
        <strong>React + Vite</strong> due to performance and bundle size issues.
        Node was replaced by
        <strong>Bun</strong> — it's faster, has built-in essentials, and simply
        makes more sense for modern backend work. Redis was replaced by{" "}
        <strong>Memcached</strong> due to licensing changes and better
        performance.
      </p>

      <h2 className="text-2xl font-semibold mb-2">🖥️ Tools & Workflow</h2>
      <p className="mb-4">
        I use <strong>Neovim</strong> with a fully customized terminal setup,
        built from scratch to match all the capabilities of an IDE. I moved away
        from VSCode and Chrome due to RAM usage on my MacBook. For me, working
        in the terminal isn’t just efficient — it’s a requirement.
      </p>

      <h2 className="text-2xl font-semibold mb-2">🐧 OS Preference</h2>
      <p className="mb-2">
        My dev servers run on <strong>Ubuntu/Debian</strong> because they’re
        stable, flexible, and production-grade. I appreciate their structure and
        community. I do plan to explore RHEL in the future — I respect robust
        systems.
      </p>

      <ContactCard />
    </div>
  );
}
