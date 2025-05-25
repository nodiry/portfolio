import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-full mt-52">
      <div className="relative w-16 h-16">
        {[...Array(2)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-full h-full border-4 border-gray-500 rounded-full"
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              repeatDelay: 0.4,
              ease: "easeInOut",
              delay: i * 0.6,
            }}
          />
        ))}
        <span className="absolute w-full h-full border-4 border-t-transparent border-white rounded-full animate-spin" />
      </div>
    </div>
  );
};

export default Loading;
