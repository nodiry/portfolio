import { useRef, useState } from "react";
import { Plus, Trash } from "lucide-react";
import { toast } from "sonner";
import { site, siteConfig } from "@/config/site";

interface Props {
  onChange: (url: string | null) => void;
  initialUrl?: string;
  keyProp: string;
}
export default function MediaHandler({ onChange, initialUrl, keyProp }: Props) {
  const [media, setMedia] = useState<string | null>(initialUrl || null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const isVideo = (url: string) => /\.(mp4|webm|ogg)$/.test(url);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("media", file); // backend expects this as 'image'
    formData.append("key", keyProp); // include the required secret key

    try {
      const res = await fetch(siteConfig.links.media, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      console.log(data.url);
      setMedia(data.url);
      onChange(data.url);
    } catch (err) {
      console.error(err);
      toast.error("Media upload failed" + err);
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = async () => {
    if (!media) return;

    try {
      const res = await fetch(siteConfig.links.media, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: media, key: keyProp }),
      });

      if (!res.ok) throw new Error("Delete failed");
      setMedia(null);
      onChange(null);
      toast.success("Media deleted");
    } catch (err) {
      toast.error("Failed to delete media");
    }
  };

  return (
    <div className="w-48 h-48 border rounded-md flex items-center justify-center relative overflow-hidden">
      {media ? (
        <>
          {isVideo(media) ? (
            <video
              src={site + media}
              className="w-full h-full object-cover"
              controls
            />
          ) : (
            <img
              src={site + media}
              className="w-full h-full object-cover"
              alt="uploaded-media"
            />
          )}
          <button
            onClick={handleDelete}
            className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
          >
            <Trash className="w-4 h-4 text-red-600" />
          </button>
        </>
      ) : (
        <div
          className="w-full h-full flex items-center justify-center hover:bg-gray-100 cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <Plus className="w-6 h-6 text-gray-500" />
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        className="hidden"
        onChange={handleFileSelect}
      />
    </div>
  );
}
