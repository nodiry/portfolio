import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import Loader from "@/components/Loading";
import { siteConfig } from "@/config/site";
import { Blog } from "@/config/types";
const handleGoBack = () => {
  // In real app: navigate(-1) or navigate('/blog')
  console.log("Going back...");
  window.history.back();
};

interface Content {
  type: string;
  data: string;
}

// Render different content types
const renderContent = (contentItem: Content, index: any) => {
  const { type, data } = contentItem;

  switch (type) {
    case "h2":
      return (
        <h2
          key={index}
          className="text-2xl font-bold mt-8 mb-4 text-foreground"
        >
          {data}
        </h2>
      );

    case "p":
      return (
        <p key={index} className="text-muted-foreground leading-relaxed mb-4">
          {data}
        </p>
      );

    case "img":
      return (
        <div key={index} className="my-6">
          <img src={data} alt={data} className="w-full rounded-lg shadow-lg" />
        </div>
      );

    case "video":
      return (
        <div key={index} className="my-6">
          <video controls className="w-full rounded-lg shadow-lg" src={data}>
            Your browser doesn't support video playback.
          </video>
        </div>
      );

    case "code":
      return (
        <div key={index} className="my-6">
          <div className="bg-muted rounded-lg p-4 overflow-x-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">
                {data || "code"}
              </span>
            </div>
            <pre className="text-sm">
              <code className="text-foreground font-mono">{data || data}</code>
            </pre>
          </div>
        </div>
      );

    case "quote":
      return (
        <blockquote
          key={index}
          className="border-l-4 border-primary pl-6 my-6 italic"
        >
          <p className="text-lg text-muted-foreground">"{data}"</p>
        </blockquote>
      );

    default:
      return (
        <div
          key={index}
          className="my-4 p-4 border border-destructive rounded-lg"
        >
          <p className="text-destructive">Unknown content type: {type}</p>
        </div>
      );
  }
};

const BlogRenderer = () => {
  const { slug } = useParams(); // assumes route is like /blog/:slug
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(siteConfig.links.blog + slug, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch blog");

        const data = await res.json();
        setBlog(data.blog);
      } catch (err) {
        console.error(err);
        setError("Could not load blog.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);
  if (!blog) return;
  return (
    <div className="min-h-screen bg-background">
      {/* Dynamic backdrop */}
      <div className="fixed inset-0 z-0 mt-16">
        {blog?.thumbnail && (
          <>
            <img
              src={blog.thumbnail}
              alt=""
              className="w-full h-full object-cover opacity-10 blur-3xl"
            />
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          </>
        )}
      </div>

      {/* Main content */}
      <div className="relative z-10 mt-16">
        {isLoading ? (
          <div className="flex items-center justify-center h-[80vh]">
            <Loader />
          </div>
        ) : error ? (
          <div className="text-center py-20 text-destructive font-semibold">
            {error}
          </div>
        ) : (
          <>
            {/* Sticky back button */}
            <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b">
              <div className="container mx-auto px-4 py-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleGoBack}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
              </div>
            </div>

            <article className="container mx-auto px-4 py-8 max-w-4xl">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  {blog.title}
                </h1>

                {blog.description && (
                  <p className="text-xl text-muted-foreground mb-6">
                    {blog.description}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(blog.createdAt)}</span>
                  </div>
                </div>

                {blog.tags?.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 mb-8">
                    <Tag className="w-4 h-4 text-muted-foreground" />
                    {blog.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {blog.thumbnail && (
                  <div className="mb-8">
                    <img
                      src={blog.thumbnail}
                      alt={blog.title}
                      className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                    />
                  </div>
                )}
              </div>

              {/* Blog body content */}
              <div className="prose prose-lg max-w-none">
                {blog.content.map((item, index) => renderContent(item, index))}
              </div>

              {/* Footer */}
              <div className="mt-12 pt-8 border-t border-border text-sm text-muted-foreground flex justify-between">
                <span>Published {formatDate(blog.createdAt)}</span>
                {blog.updatedAt !== blog.createdAt && (
                  <span>Updated {formatDate(blog.updatedAt)}</span>
                )}
              </div>
            </article>
          </>
        )}
      </div>
    </div>
  );
};

export default BlogRenderer;
