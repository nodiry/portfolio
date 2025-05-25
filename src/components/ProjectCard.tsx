import { Project } from "@/config/types";
import { formatDate } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Calendar, ExternalLink, Github, Tag } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavigationOverlay = ({
  isVisible,
  onComplete,
}: {
  isVisible: boolean;
  onComplete: () => void;
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ scaleX: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 bg-black z-50 origin-left"
          onAnimationComplete={onComplete}
        />
      )}
    </AnimatePresence>
  );
};
export const ProjectCard = ({ project }: { project: Project }) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <motion.article
        whileHover={{ y: -8 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate("/project/" + project.slug)}
        className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group"
      >
        {/* Thumbnail */}
        <div className="relative overflow-hidden">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-48 object-cover"
          />
          {/* Fallback gradient */}
          <div className="hidden w-full h-48 bg-gradient-to-br from-gray-100 to-gray-300 items-center justify-center">
            <span className="text-gray-500 text-lg font-medium">
              {project.title.charAt(0)}
            </span>
          </div>

          {/* Project links overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/20 flex items-center justify-center gap-3"
          >
            {project.demo && (
              <motion.a
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1 }}
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
              >
                <ExternalLink className="w-5 h-5 text-gray-800" />
              </motion.a>
            )}
            {project.github && (
              <motion.a
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1 }}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
              >
                <Github className="w-5 h-5 text-gray-800" />
              </motion.a>
            )}
          </motion.div>
        </div>

        <div className="p-6">
          {/* Date */}
          <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(project.createdAt)}</span>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors line-clamp-2">
            {project.title}
          </h2>

          {/* Short description */}
          <p className="text-gray-600 mb-4 line-clamp-3">{project.short}</p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="bg-black text-white px-2 py-1 rounded-full text-xs font-medium"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="text-gray-500 text-xs">
                +{project.tech.length - 4} more
              </span>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="text-gray-500 text-xs">
                +{project.tags.length - 3} more
              </span>
            )}
          </div>

          {/* View project */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-black font-medium group-hover:gap-2 transition-all">
              <span>View Project</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>

            {/* External links */}
            <div className="flex gap-2">
              {project.demo && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.demo, "_blank");
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              )}
              {project.github && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.github, "_blank");
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Github className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.article>

      <NavigationOverlay
        isVisible={isNavigating}
        onComplete={() => setIsNavigating(false)}
      />
    </>
  );
};
