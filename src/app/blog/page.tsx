import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X } from "lucide-react";
import { Blog } from "@/config/types";
import { BlogCard } from "@/components/BlogCard";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allTags, setAllTags] = useState<any[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(siteConfig.links.blog + "all", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch blogs");

        const blogsData = await response.json();
        setBlogs(blogsData.blogs);
        setFilteredBlogs(blogsData.blogs);

        // Extract unique tags from all blogs
        const uniqueTags = Array.from(
          new Set(blogsData.blogs.flatMap((blog: Blog) => blog.tags))
        ).sort();
        setAllTags(uniqueTags);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setBlogs([]);
        setFilteredBlogs([]);
        setAllTags([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Filter blogs based on selected tags and search term
  useEffect(() => {
    let filtered = blogs;

    // Filter by tags
    if (selectedTags.length > 0)
      filtered = filtered.filter((blog) =>
        selectedTags.some((tag) => blog.tags.includes(tag))
      );

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    setFilteredBlogs(filtered);
  }, [blogs, selectedTags, searchTerm]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setSearchTerm("");
  };

  if (error && blogs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <h2 className="text-2xl font-bold mb-4">Error Loading Blogs</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 lg:mb-12"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Technical Blog
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Insights and tutorials on backend development, system architecture,
            and modern web technologies
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-6"
        >
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Tag Filters */}
          {allTags.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Filter className="w-5 h-5 text-muted-foreground" />
                <span className="text-muted-foreground font-medium">
                  Filter by tags:
                </span>
              </div>
              <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                      selectedTags.includes(tag)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Clear Filters */}
          {(selectedTags.length > 0 || searchTerm) && (
            <div className="flex justify-center">
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-lg hover:bg-accent"
              >
                <X className="w-4 h-4" />
                Clear all filters
              </button>
            </div>
          )}
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 text-center"
        >
          <p className="text-muted-foreground">
            {isLoading
              ? "Loading..."
              : `${filteredBlogs.length} blog${
                  filteredBlogs.length !== 1 ? "s" : ""
                } found`}
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoading && <Loading />}

        {/* Blogs Grid */}
        {!isLoading && (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            <AnimatePresence>
              {filteredBlogs.map((blog) => (
                <BlogCard key={blog._id || blog.slug} blog={blog} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* No Results */}
        {!isLoading && filteredBlogs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 lg:py-20"
          >
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-semibold mb-2">No blogs found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search terms or filters
              </p>
              <Button
                onClick={clearFilters}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Clear Filters
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
