import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Tag, ArrowRight, User, Eye } from "lucide-react";
import { Blog } from "@/config/types";
import { useNavigate } from "react-router-dom";
import { formatDate } from "@/lib/utils";

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
export const BlogCard = ({ blog }: { blog: Blog }) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();

  // Calculate reading time based on content
  const calculateReadingTime = (content: any[]) => {
    if (!content || !Array.isArray(content)) return "5 min read";
    const wordCount = content.reduce((acc, item) => {
      return acc + (item.data ? item.data.split(" ").length : 0);
    }, 0);
    const readingTime = Math.ceil(wordCount / 200); // Average reading speed
    return `${readingTime} min read`;
  };

  return (
    <>
      <motion.article
        whileHover={{ y: -8 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate("/blog/" + blog.slug)}
        className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group"
      >
        {/* Thumbnail */}
        <div className="relative overflow-hidden">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full h-48 object-cover"
          />
          {/* Fallback gradient */}
          <div className="hidden w-full h-48 bg-gradient-to-br from-gray-100 to-gray-300 items-center justify-center">
            <span className="text-gray-500 text-lg font-medium">
              {blog.title.charAt(0)}
            </span>
          </div>

          {/* Hover overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/20 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              whileHover={{ scale: 1 }}
              className="bg-white/90 p-2 rounded-full"
            >
              <Eye className="w-5 h-5 text-gray-800" />
            </motion.div>
          </motion.div>
        </div>

        <div className="p-6">
          {/* Meta info */}
          <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(blog.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{calculateReadingTime(blog.content)}</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors line-clamp-2">
            {blog.title}
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-4 line-clamp-3">{blog.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
            {blog.tags.length > 3 && (
              <span className="text-gray-500 text-xs">
                +{blog.tags.length - 3} more
              </span>
            )}
          </div>

          {/* Read more */}
          <div className="flex items-center text-black font-medium group-hover:gap-2 transition-all">
            <span>Read More</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
