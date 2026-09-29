import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ImageIcon, Link2, Loader2, Trash2, UploadCloud, X } from "lucide-react";
import { toast } from "sonner";
import { deleteLibraryImage, listLibraryImages, uploadImage, type LibraryImage } from "../lib/blog";

type Tab = "upload" | "library" | "url";

/**
 * Pick an image: upload from device, reuse one from the library, or paste a URL.
 * Calls `onSelect(url, alt)` with the chosen image.
 */
export function MediaLibrary({
  open,
  onClose,
  onSelect,
  title = "Insert image",
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string, alt: string) => void;
  title?: string;
}) {
  const [tab, setTab] = useState<Tab>("upload");
  const [images, setImages] = useState<LibraryImage[] | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [alt, setAlt] = useState("");
  const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const loadLibrary = useCallback(async () => {
    try {
      setImages(await listLibraryImages());
    } catch (err) {
      setImages([]);
      toast.error(err instanceof Error ? err.message : "Couldn't load media library");
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    setSelected(null);
    setAlt("");
    setUrl("");
    setTab("upload");
    loadLibrary();
  }, [open, loadLibrary]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleFiles = async (files: FileList | File[]) => {
    const list = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (!list.length) return;
    setUploading(true);
    let lastUrl: string | null = null;
    for (const file of list) {
      try {
        lastUrl = await uploadImage(file);
        if (!alt) setAlt(file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "));
      } catch (err) {
        toast.error(err instanceof Error ? err.message : `Upload failed: ${file.name}`);
      }
    }
    setUploading(false);
    await loadLibrary();
    if (lastUrl) {
      setSelected(lastUrl);
      setTab("library");
      toast.success(list.length > 1 ? `${list.length} images uploaded` : "Image uploaded");
    }
  };

  const removeImage = async (img: LibraryImage) => {
    if (!window.confirm(`Delete "${img.name}" from the media library? Articles already using it will show a broken image.`)) return;
    try {
      await deleteLibraryImage(img.name);
      setImages((prev) => prev?.filter((i) => i.name !== img.name) ?? prev);
      if (selected === img.url) setSelected(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  };

  const confirm = () => {
    const chosen = tab === "url" ? url.trim() : selected;
    if (!chosen) return;
    onSelect(chosen, alt.trim());
    onClose();
  };

  const canConfirm = tab === "url" ? /^https?:\/\/\S+$/.test(url.trim()) || url.trim().startsWith("/") : !!selected;

  const tabs: { key: Tab; label: string; icon: typeof UploadCloud }[] = [
    { key: "upload", label: "Upload from device", icon: UploadCloud },
    { key: "library", label: "Media library", icon: ImageIcon },
    { key: "url", label: "From URL", icon: Link2 },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">{title}</h2>
              <button onClick={onClose} className="p-2 rounded-lg text-gray-400 hover:bg-gray-100" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex gap-1 px-6 pt-4">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    tab === t.key ? "bg-[#eef4ff] text-[#2a6ff3]" : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <t.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{t.label}</span>
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {tab === "upload" && (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    handleFiles(e.dataTransfer.files);
                  }}
                  onClick={() => !uploading && fileInput.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-colors ${
                    dragOver ? "border-[#2a6ff3] bg-[#eef4ff]" : "border-gray-200 hover:border-[#2a6ff3] hover:bg-[#f5f8ff]"
                  }`}
                >
                  {uploading ? (
                    <Loader2 className="w-10 h-10 mx-auto text-[#2a6ff3] animate-spin mb-3" />
                  ) : (
                    <UploadCloud className="w-10 h-10 mx-auto text-[#2a6ff3] mb-3" />
                  )}
                  <p className="font-semibold text-gray-800">{uploading ? "Uploading…" : "Click to choose images or drag them here"}</p>
                  <p className="text-sm text-gray-500 mt-1">PNG, JPG, WEBP, GIF or AVIF — up to 10 MB each</p>
                  <input
                    ref={fileInput}
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
                    multiple
                    hidden
                    onChange={(e) => {
                      if (e.target.files) handleFiles(e.target.files);
                      e.target.value = "";
                    }}
                  />
                </div>
              )}

              {tab === "library" &&
                (images === null ? (
                  <div className="py-16 flex justify-center">
                    <Loader2 className="w-8 h-8 text-[#2a6ff3] animate-spin" />
                  </div>
                ) : images.length === 0 ? (
                  <p className="py-16 text-center text-gray-500 text-sm">No images uploaded yet.</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {images.map((img) => (
                      <div
                        key={img.name}
                        onClick={() => setSelected(img.url)}
                        onDoubleClick={() => {
                          setSelected(img.url);
                          onSelect(img.url, alt.trim());
                          onClose();
                        }}
                        className={`group relative aspect-square rounded-xl overflow-hidden bg-gray-50 border-2 cursor-pointer transition-colors ${
                          selected === img.url ? "border-[#2a6ff3]" : "border-transparent hover:border-gray-200"
                        }`}
                      >
                        <img src={img.url} alt="" loading="lazy" className="w-full h-full object-contain" />
                        {selected === img.url && (
                          <span className="absolute top-2 left-2 w-6 h-6 rounded-full bg-[#2a6ff3] text-white flex items-center justify-center">
                            <Check className="w-4 h-4" />
                          </span>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage(img);
                          }}
                          className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/90 text-gray-500 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Delete from library"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ))}

              {tab === "url" && (
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-gray-800">Image URL</label>
                  <input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://…"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#2a6ff3]"
                  />
                  {canConfirm && (
                    <div className="rounded-xl bg-gray-50 p-4 flex justify-center">
                      <img src={url.trim()} alt="" className="max-h-64 object-contain" />
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50">
              <input
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                placeholder="Alt text (describes the image for SEO & screen readers)"
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#2a6ff3]"
              />
              <div className="flex gap-3 justify-end">
                <button onClick={onClose} className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-white">
                  Cancel
                </button>
                <button
                  onClick={confirm}
                  disabled={!canConfirm}
                  className="px-5 py-2.5 rounded-xl bg-[#2a6ff3] text-white text-sm font-semibold hover:bg-[#1f5ccf] disabled:opacity-40"
                >
                  Use this image
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
