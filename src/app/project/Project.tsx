import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Github, Globe, Tag, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Loader from "@/components/Loading";
import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { Project } from "@/config/types";
const handleGoBack = () => window.history.back();
interface Content {
  type: string;
  data: string;
}

const renderContent = (item: Content, index: number) => {
  const { type, data } = item;

  switch (type) {
    case "h2":
      return (
        <h2
          key={index}
          className="text-2xl font-semibold mt-8 mb-4 text-foreground"
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
          <img
            src={data}
            alt={data || "Project Image"}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      );
    case "video":
      return (
        <div key={index} className="my-6">
          <video controls className="w-full rounded-lg shadow-lg" src={data} />
          {data && (
            <p className="text-sm text-muted-foreground text-center mt-2 italic">
              {data}
            </p>
          )}
        </div>
      );
    case "link":
      return (
        <div key={index} className="my-4">
          <a
            href={data}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            {data || data}
          </a>
        </div>
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

const ProjectPage = () => {
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(siteConfig.links.project + slug, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch project");

        const data = await res.json();
        setProject(data.project);
      } catch (err) {
        console.error(err);
        setError("Could not load project.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [slug]);
  if (!project) return <div> No Project Details </div>;
  return (
    <div className="min-h-screen bg-background">
      {/* Blurred backdrop */}
      <div className="fixed inset-0 z-0 mt-20">
        <img
          src={project?.thumbnail}
          alt=""
          className="w-full h-full object-cover opacity-10 blur-3xl"
        />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      </div>

      {/* Content */}
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
            <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b">
              <div className="container mx-auto px-4 py-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleGoBack}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
              </div>
            </div>

            <article className="container mx-auto px-4 py-8 max-w-4xl">
              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  {project.title}
                </h1>

                {project.short && (
                  <p className="text-xl text-muted-foreground mb-6">
                    {project.short}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(project.createdAt)}</span>
                  </div>

                  {project.tech?.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Wrench className="w-4 h-4" />
                      {project.tech.map((t, i) => (
                        <Badge key={i} variant="outline">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {project.tags?.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    <Tag className="w-4 h-4 text-muted-foreground" />
                    {project.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {project.thumbnail && (
                  <div className="mb-8">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                    />
                  </div>
                )}
              </div>

              {/* Content blocks */}
              <div className="prose prose-lg max-w-none">
                {project.full.map((item, index) => renderContent(item, index))}
              </div>

              {/* Links */}
              <div className="mt-10 flex gap-4">
                {project.github && (
                  <Button asChild variant="outline">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-4 h-4 mr-2" /> GitHub
                    </a>
                  </Button>
                )}
                {project.demo && (
                  <Button asChild>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Globe className="w-4 h-4 mr-2" /> Live Demo
                    </a>
                  </Button>
                )}
              </div>

              {/* Footer */}
              <div className="mt-12 pt-8 border-t border-border text-sm text-muted-foreground">
                <div className="flex justify-between items-center">
                  <span>Published {formatDate(project.createdAt)}</span>
                  {project.updatedAt !== project.createdAt && (
                    <span>Updated {formatDate(project.updatedAt)}</span>
                  )}
                </div>
              </div>
            </article>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
