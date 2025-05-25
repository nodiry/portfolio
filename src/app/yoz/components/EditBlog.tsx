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
import { Blog } from "@/config/types";

export default function EditBlog({
  blog,
  open,
  setOpen,
}: {
  blog: Blog;
  open: boolean;
  setOpen: (b: boolean) => void;
}) {
  const [title, setTitle] = useState(blog.title || "");
  const [key, setKey] = useState("");
  const [description, setDescription] = useState(blog.description || "");
  const [tags, setTags] = useState<string[]>(blog.tags || []);
  const [thumbnail, setThumbnail] = useState(blog.thumbnail || "");
  const [content, setContent] = useState(blog.content || []);
  const [newType, setNewType] = useState("h2");

  useEffect(() => {
    setTitle(blog.title || "");
    setDescription(blog.description || "");
    setTags(blog.tags || []);
    setThumbnail(blog.thumbnail || "");
    setContent(blog.content || []);
  }, [blog]);

  const handleAddContent = () =>
    setContent([...content, { type: newType, data: "" }]);

  const handleUpdateContent = (index: number, value: string) => {
    const updated = [...content];
    updated[index].data = value;
    setContent(updated);
  };

  const handleRemoveContent = (index: number) => {
    const updated = [...content];
    updated.splice(index, 1);
    setContent(updated);
  };

  const handleSubmit = async () => {
    if (!key) {
      toast.error("Secret key is required");
      return;
    }

    const updatedBlog = {
      id: blog._id,
      title,
      slug: slugify(title),
      description,
      content,
      thumbnail,
      tags,
      author: blog?.author || "Bokiev Nodirbek",
      key,
    };

    try {
      const res = await fetch(siteConfig.links.blog, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updatedBlog),
      });

      if (!res.ok) throw new Error("Failed to update blog");

      toast.success("Blog updated successfully");
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while updating");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Blog</DialogTitle>
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
          <Input
            placeholder="Slug (auto-generated)"
            value={slugify(title)}
            disabled
          />
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="space-y-4">
            {content.map((c, i) => (
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

          {/* Content Add Selector */}
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
            placeholder="Tags (# separated or space)"
            value={tags.join(" ")}
            onChange={(e) =>
              setTags(
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
