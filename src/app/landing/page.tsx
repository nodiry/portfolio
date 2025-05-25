import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  ExternalLink
} from 'lucide-react';

const LandingPage = () => {
  const [latestContent, setLatestContent] = useState({ blogs: [], projects: [] });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch latest content when component mounts
  useEffect(() => {
    const fetchLatestContent = async () => {
      try {
        const response = await fetch('/latest');
        const data = await response.json();
        setLatestContent(data);
      } catch (error) {
        console.error('Failed to fetch latest content:', error);
        setLatestContent({
          blogs: [
            { title: "Building High-Performance APIs with Bun.js" },
            { title: "TypeScript Best Practices for Backend Development" },
            { title: "Microservices Architecture with gRPC" }
          ],
          projects: [
            { title: "Real-time Chat Application with Socket.io" },
            { title: "E-commerce API with Fastify and MongoDB" },
            { title: "Task Management System with Next.js and PostgreSQL" }
          ]
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestContent();
  }, []);

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Tech stack data organized by category
  const techStack = {
    backend: ['Bun.js', 'Node.js', 'TypeScript', 'Go', 'Java'],
    frameworks: ['Express', 'Fastify', 'Go Fiber', 'Spring Boot', 'Actix'],
    frontend: ['Next.js', 'React', 'Vite'],
    databases: ['MongoDB', 'PostgreSQL', 'Memcached'],
    protocols: ['gRPC', 'WebSocket', 'REST API']
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Main content container */}
      <div className="container mx-auto px-6 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          {/* Hero Section */}
          <div className="text-center mb-20">
            <motion.div
              variants={itemVariants}
              className="mb-8"
            >
              {/* Profile image placeholder - replace with your actual image */}
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-4xl font-bold shadow-2xl">
                YN
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              Your Name
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Senior Backend Developer & System Architect
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              {/* Location and status info */}
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-gray-300">
                <MapPin className="w-4 h-4" />
                <span>Busan, South Korea</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-gray-300">
                <GraduationCap className="w-4 h-4" />
                <span>Dongseo University</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-gray-300">
                <Briefcase className="w-4 h-4" />
                <span>Fullstack Developer</span>
              </div>
            </motion.div>

            {/* Action buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-4 mb-16"
            >
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg">
                <Download className="w-5 h-5" />
                Download Resume
              </button>
              <button className="border-2 border-purple-500 text-purple-300 hover:bg-purple-500 hover:text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 transition-all">
                <Mail className="w-5 h-5" />
                Contact Me
              </button>
            </motion.div>
          </div>

          {/* Tech Stack Section */}
          <motion.div
            variants={itemVariants}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Tech Stack & Expertise</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(techStack).map(([category, technologies]) => (
                <motion.div
                  key={category}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all"
                >
                  <div className="flex items-center gap-2 mb-4">
                    {category === 'backend' && <Server className="w-5 h-5 text-purple-400" />}
                    {category === 'databases' && <Database className="w-5 h-5 text-purple-400" />}
                    {category === 'frontend' && <Globe className="w-5 h-5 text-purple-400" />}
                    {(category === 'frameworks' || category === 'protocols') && <Code2 className="w-5 h-5 text-purple-400" />}
                    <h3 className="text-lg font-semibold text-white capitalize">{category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Latest Projects and Blogs Section */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Latest Projects */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Latest Projects</h2>
                <button className="text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors">
                  View All <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                {isLoading ? (
                  // Loading skeleton
                  Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 animate-pulse">
                      <div className="h-4 bg-white/10 rounded w-3/4"></div>
                    </div>
                  ))
                ) : (
                  latestContent.projects.map((project, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 5 }}
                      className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-purple-500/50 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-white font-medium group-hover:text-purple-300 transition-colors">
                          {project.title}
                        </h3>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-400 transition-colors" />
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>

            {/* Latest Blogs */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Latest Blogs</h2>
                <button className="text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors">
                  View All <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                {isLoading ? (
                  // Loading skeleton
                  Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 animate-pulse">
                      <div className="h-4 bg-white/10 rounded w-4/5"></div>
                    </div>
                  ))
                ) : (
                  latestContent.blogs.map((blog, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 5 }}
                      className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-purple-500/50 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-white font-medium group-hover:text-purple-300 transition-colors">
                          {blog.title}
                        </h3>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-400 transition-colors" />
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-6 mt-20"
          >
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="bg-white/10 backdrop-blur-sm p-3 rounded-full text-gray-300 hover:text-white hover:bg-white/20 transition-all"
            >
              <Github className="w-6 h-6" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="bg-white/10 backdrop-blur-sm p-3 rounded-full text-gray-300 hover:text-white hover:bg-white/20 transition-all"
            >
              <Linkedin className="w-6 h-6" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="bg-white/10 backdrop-blur-sm p-3 rounded-full text-gray-300 hover:text-white hover:bg-white/20 transition-all"
            >
              <Mail className="w-6 h-6" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;