import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BadgePlus, PackagePlus, RefreshCcw } from "lucide-react";
import Loading from "@/components/Loading";
import { toast } from "sonner";
import AddBlog from "./components/AddBlog";
import AddProject from "./components/AddProject";
import EditBlog from "./components/EditBlog";
import EditProject from "./components/EditProject";
import { siteConfig } from "@/config/site";
import { words } from "@/config/text";

export default function YozPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [openBlogs, setOpenBlogs] = useState(false);
  const [openProject, setOpenProject] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(false);

  // Selected for editing
  const [editingBlog, setEditingBlog] = useState<any | null>(null);
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [openEditBlog, setOpenEditBlog] = useState(false);
  const [openEditProject, setOpenEditProject] = useState(false);

  const fetchBlogs = async () => {
    setLoadingBlogs(true);
    try {
      const res = await fetch(siteConfig.links.blog + "all");
      const data = await res.json();
      if (!res.ok) throw new Error("error happened while fetching blogs");
      setBlogs(data.blogs);
    } catch (err) {
      toast.error("Error fetching blogs: " + err);
    } finally {
      setLoadingBlogs(false);
    }
  };

  const fetchProjects = async () => {
    setLoadingProjects(true);
    try {
      const res = await fetch(siteConfig.links.project + "all");
      const data = await res.json();
      if (!res.ok) throw new Error("error happened while fetching projects");
      setProjects(data.projects);
    } catch (err) {
      toast.error("Error fetching projects: " + err);
    } finally {
      setLoadingProjects(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen mt-20 p-4 flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-7xl">
        {/* BLOG LIST */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold">{words.blog}</h2>
            <Button variant="outline" onClick={() => setOpenBlogs(true)}>
              <BadgePlus />
            </Button>
            <Button variant="outline" onClick={fetchBlogs}>
              <RefreshCcw />
            </Button>
          </div>

          <div className="space-y-3">
            {loadingBlogs ? (
              <Loading />
            ) : blogs.length === 0 ? (
              <p>No blogs found</p>
            ) : (
              blogs.map((blog, i) => (
                <Card key={i}>
                  <CardContent
                    className="p-4 cursor-pointer"
                    onClick={() => {
                      setEditingBlog(blog);
                      setOpenEditBlog(true);
                    }}
                  >
                    <p className="font-semibold">{blog.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {blog.description}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* PROJECT LIST */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold">{words.project}</h2>
            <Button variant="outline" onClick={() => setOpenProject(true)}>
              <PackagePlus />
            </Button>
            <Button variant="outline" onClick={fetchProjects}>
              <RefreshCcw />
            </Button>
          </div>

          <div className="space-y-3">
            {loadingProjects ? (
              <Loading />
            ) : projects.length === 0 ? (
              <p>No projects found</p>
            ) : (
              projects.map((project, i) => (
                <Card key={i}>
                  <CardContent
                    className="p-4 cursor-pointer"
                    onClick={() => {
                      setEditingProject(project);
                      setOpenEditProject(true);
                    }}
                  >
                    <p className="font-semibold">{project.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {project.description}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>

      {/* MODALS */}
      <AddBlog open={openBlogs} setOpen={setOpenBlogs} />
      <AddProject open={openProject} setOpen={setOpenProject} />

      {editingBlog && (
        <EditBlog
          open={openEditBlog}
          setOpen={setOpenEditBlog}
          blog={editingBlog}
        />
      )}
      {editingProject && (
        <EditProject
          open={openEditProject}
          setOpen={setOpenEditProject}
          project={editingProject}
        />
      )}
    </div>
  );
}
