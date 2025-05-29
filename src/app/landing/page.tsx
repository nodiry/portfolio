import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  Server,
  Database,
  Code2,
  Globe,
  MapPin,
  GraduationCap,
  Briefcase,
  ChevronRight,
} from "lucide-react";
import { BlogCard } from "@/components/BlogCard";
import { ProjectCard } from "@/components/ProjectCard";
import { siteConfig } from "@/config/site";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type Blog = {
  _id: string;
  slug: string;
  title: string;
  summary: string;
  [key: string]: any;
};

type Project = {
  _id: string;
  slug: string;
  title: string;
  description: string;
  [key: string]: any;
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [latestBlogs, setLatestBlogs] = useState<Blog[]>([]);
  const [latestProjects, setLatestProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLatestContent = async () => {
      try {
        const response = await fetch(siteConfig.links.latest, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setLatestBlogs(data.blogs);
        setLatestProjects(data.projects);
      } catch (error) {
        toast.error("Failed to fetch latest content: " + error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLatestContent();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const techStack = {
    backend: ["Bun.js", "Node.js", "TypeScript", "Go", "Java"],
    frameworks: ["Express", "Fastify", "Go Fiber", "Spring Boot", "Actix"],
    frontend: ["Next.js", "React", "Vite"],
    databases: ["MongoDB", "PostgreSQL", "Memcached"],
    protocols: ["gRPC", "WebSocket", "REST API"],
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          {/* Hero Section */}
          <div className="text-center mb-20">
            <motion.div variants={itemVariants} className="mb-8">
              <div className="w-32 h-32 mx-auto rounded-full bg-muted flex items-center justify-center text-4xl font-bold shadow-xl">
                YN
              </div>
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              Your Name
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
            >
              Senior Backend Developer & System Architect
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full text-sm">
                <MapPin className="w-4 h-4" />
                <span>Busan, South Korea</span>
              </div>
              <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full text-sm">
                <GraduationCap className="w-4 h-4" />
                <span>Dongseo University</span>
              </div>
              <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full text-sm">
                <Briefcase className="w-4 h-4" />
                <span>Fullstack Developer</span>
              </div>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-4 mb-16"
            >
              <button className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold flex items-center gap-2 transition hover:opacity-90 shadow">
                <Download className="w-5 h-5" />
                Download Resume
              </button>
              <button className="border border-border text-muted-foreground hover:bg-muted px-8 py-3 rounded-full font-semibold flex items-center gap-2 transition">
                <Mail className="w-5 h-5" />
                Contact Me
              </button>
            </motion.div>
          </div>

          {/* Tech Stack */}
          <motion.div variants={itemVariants} className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Tech Stack & Expertise
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(techStack).map(([category, technologies]) => (
                <motion.div
                  key={category}
                  whileHover={{ scale: 1.02 }}
                  className="bg-muted p-6 rounded-xl border border-border hover:border-primary/50 transition"
                >
                  <div className="flex items-center gap-2 mb-4">
                    {category === "backend" && <Server className="w-5 h-5" />}
                    {category === "databases" && (
                      <Database className="w-5 h-5" />
                    )}
                    {category === "frontend" && <Globe className="w-5 h-5" />}
                    {(category === "frameworks" ||
                      category === "protocols") && (
                      <Code2 className="w-5 h-5" />
                    )}
                    <h3 className="text-lg font-semibold capitalize">
                      {category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-muted-foreground/10 text-muted-foreground px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Latest Projects */}
          <motion.div variants={itemVariants} className="mb-20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Latest Projects</h2>
              <button
                className="text-muted-foreground hover:text-primary flex items-center gap-1 transition"
                onClick={() => navigate("/project")}
              >
                View All <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {isLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-muted animate-pulse rounded-lg p-4 border border-border"
                    />
                  ))
                : latestProjects.map((project) => (
                    <div
                      key={project._id}
                      onClick={() =>
                        (window.location.href = "/project/" + project.slug)
                      }
                    >
                      <ProjectCard project={project} />
                    </div>
                  ))}
            </div>
          </motion.div>

          {/* Latest Blogs */}
          <motion.div variants={itemVariants} className="mb-20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Latest Blogs</h2>
              <button
                className="text-muted-foreground hover:text-primary flex items-center gap-1 transition"
                onClick={() => navigate("/blog")}
              >
                View All <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {isLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-muted animate-pulse rounded-lg p-4 border border-border"
                    />
                  ))
                : latestBlogs.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                  ))}
            </div>
          </motion.div>

          {/* Socials */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-6 mt-20"
          >
            {[Github, Linkedin, Mail].map((Icon, i) => (
              <motion.a
                key={i}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="bg-muted p-3 rounded-full text-muted-foreground hover:text-primary hover:bg-muted-foreground/10 transition"
              >
                <Icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
