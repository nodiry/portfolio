import { useState } from "react";
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


export default function AddBlog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (b: boolean) => void;
}) {
  const [title, setTitle] = useState("");
  const [key, setKey] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState<string>("");
  const [content, setContent] = useState<{ type: string; data: string }[]>([]);
  const [newType, setNewType] = useState("p");

  const handleAddContent = () => {
    setContent([...content, { type: newType, data: "" }]);
  };

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

    const blog = {
      title,
      slug: slugify(title),
      description,
      content,
      thumbnail: thumbnail || "",
      tags,
      author: "Bokiev Nodirbek",
      key,
    };

    try {
      const res = await fetch(siteConfig.links.blog, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(blog),
      });

      if (!res.ok) throw new Error("Failed to create blog");

      toast.success("Blog created successfully");
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
          <DialogTitle>Add New Blog</DialogTitle>
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
                  />
                )}
              </div>
            ))}
          </div>

          {/* ADD CONTENT SELECTOR (AT THE BOTTOM NOW) */}
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
            />
          </div>

          <Button className="w-full mt-2" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
