import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Plus, Trash } from "lucide-react";
import { toast } from "sonner";
import { CONTENT_TYPES, siteConfig } from "@/config/site";
import { slugify } from "@/lib/utils";
import MediaHandler from "./MediaHandler";
import { Project } from "@/config/types";

export default function EditProject({
  open,
  setOpen,
  project,
}: {
  open: boolean;
  setOpen: (b: boolean) => void;
  project: Project;
}) {
  const [title, setTitle] = useState("");
  const [key, setKey] = useState("");
  const [short, setShort] = useState("");
  const [tech, setTech] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [demo, setDemo] = useState("");
  const [github, setGithub] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [full, setFull] = useState<{ type: string; data: string }[]>([]);
  const [newType, setNewType] = useState("p");

  useEffect(() => {
    if (project) {
      setTitle(project.title || "");
      setShort(project.short || "");
      setTech(project.tech || []);
      setTags(project.tags || []);
      setDemo(project.demo || "");
      setGithub(project.github || "");
      setThumbnail(project.thumbnail || "");
      setFull(project.full || []);
    }
  }, [project]);

  const handleAddContent = () =>
    setFull([...full, { type: newType, data: "" }]);

  const handleUpdateContent = (index: number, value: string) => {
    const updated = [...full];
    updated[index].data = value;
    setFull(updated);
  };

  const handleRemoveContent = (index: number) => {
    const updated = [...full];
    updated.splice(index, 1);
    setFull(updated);
  };

  const handleSubmit = async () => {
    if (!key) {
      toast.error("Secret key is required");
      return;
    }

    const updatedProject = {
      id: project._id,
      title,
      slug: slugify(title),
      short,
      full,
      demo,
      github,
      thumbnail: thumbnail || "",
      tags,
      tech,
      key,
    };

    try {
      const res = await fetch(siteConfig.links.project, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updatedProject),
      });

      if (!res.ok) throw new Error("Failed to update project");

      toast.success("Project updated successfully");
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Secret Key"
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input placeholder="Slug" value={slugify(title)} disabled />
          <Textarea
            placeholder="Short Description"
            value={short}
            onChange={(e) => setShort(e.target.value)}
          />
          <Input
            placeholder="Demo URL"
            value={demo}
            onChange={(e) => setDemo(e.target.value)}
          />
          <Input
            placeholder="GitHub URL"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
          />

          <div className="space-y-4">
            {full.map((c, i) => (
              <div
                key={i}
                className="flex flex-col gap-1 border p-2 rounded-lg relative"
              >
                <div className="flex justify-between items-center mb-1">
                  <div className="text-sm font-bold">
                    {c.type.toUpperCase()}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveContent(i)}
                    className="text-red-500"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>

                {["p", "code", "quote", "h2"].includes(c.type) ? (
                  <Textarea
                    rows={4}
                    placeholder={`Write your ${c.type} here...`}
                    value={c.data}
                    onChange={(e) => handleUpdateContent(i, e.target.value)}
                  />
                ) : (
                  <MediaHandler
                    keyProp={key}
                    onChange={(url) => handleUpdateContent(i, url || "")}
                    initialUrl={c.data}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Select value={newType} onValueChange={(v) => setNewType(v)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Content Type" />
              </SelectTrigger>
              <SelectContent>
                {CONTENT_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleAddContent}>
              <Plus className="w-4 h-4 mr-1" /> Add Content Block
            </Button>
          </div>

          <Input
            placeholder="Tags"
            defaultValue={tags.join(" ")}
            onChange={(e) =>
              setTags(
                e.target.value
                  .trim()
                  .split(/[#\s]+/)
                  .filter(Boolean)
              )
            }
          />
          <Input
            placeholder="Tech Used"
            defaultValue={tech.join(" ")}
            onChange={(e) =>
              setTech(
                e.target.value
                  .trim()
                  .split(/[#\s]+/)
                  .filter(Boolean)
              )
            }
          />

          <div>
            <div className="text-sm font-medium mb-1">Thumbnail</div>
            <MediaHandler
              keyProp={key}
              onChange={(url) => setThumbnail(url || "")}
              initialUrl={thumbnail}
            />
          </div>

          <Button className="w-full mt-2" onClick={handleSubmit}>
            Update
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
