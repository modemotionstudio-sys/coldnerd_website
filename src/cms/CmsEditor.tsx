import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useBlocker, useNavigate, useParams } from "react-router";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import { toast } from "sonner";
import { ArrowLeft, ExternalLink, ImagePlus, Loader2, Star, Trash2, X } from "lucide-react";
import { CmsLayout } from "./CmsLayout";
import { ConfirmDialog } from "./ConfirmDialog";
import { MediaLibrary } from "./MediaLibrary";
import { Toolbar } from "./editor/Toolbar";
import { buildExtensions } from "./editor/extensions";
import {
  createPost,
  deletePost,
  ensureBlogFonts,
  estimateReadTime,
  fetchAllPostsForCms,
  fetchPostById,
  slugify,
  updatePost,
  uploadImage,
  type BlogPost,
  type BlogPostInput,
  type PostStatus,
} from "../lib/blog";
import { setPageMeta } from "../lib/seo";

interface FormState {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author_name: string;
  cover_image_url: string | null;
  status: PostStatus;
  featured: boolean;
  published_at: string; // datetime-local value, "" = not set
  seo_title: string;
  seo_description: string;
}

const EMPTY_FORM: FormState = {
  title: "",
  slug: "",
  excerpt: "",
  category: "General",
  author_name: "ColdNerd Team",
  cover_image_url: null,
  status: "draft",
  featured: false,
  published_at: "",
  seo_title: "",
  seo_description: "",
};

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function toLocalInput(iso: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function formFromPost(p: BlogPost): FormState {
  return {
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    category: p.category,
    author_name: p.author_name,
    cover_image_url: p.cover_image_url,
    status: p.status,
    featured: p.featured,
    published_at: toLocalInput(p.published_at),
    seo_title: p.seo_title ?? "",
    seo_description: p.seo_description ?? "",
  };
}

type MediaMode = "insert" | "replace" | "cover" | null;

export default function CmsEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [slugTouched, setSlugTouched] = useState(!!id);
  const [mediaMode, setMediaMode] = useState<MediaMode>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const editorRef = useRef<Editor | null>(null);
  const justCreatedId = useRef<string | null>(null); // skip re-fetching a post we just created
  const bypassBlocker = useRef(false);

  // --- image paste / drop straight into the article -----------------------
  const uploadAndInsert = useCallback(async (files: File[], pos?: number) => {
    const editor = editorRef.current;
    if (!editor) return;
    const toastId = toast.loading(files.length > 1 ? `Uploading ${files.length} images…` : "Uploading image…");
    try {
      for (const file of files) {
        const src = await uploadImage(file);
        const node = { type: "image", attrs: { src, alt: file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ") } };
        if (pos !== undefined) editor.chain().focus().insertContentAt(pos, node).run();
        else editor.chain().focus().insertContent(node).run();
      }
      toast.success("Image added", { id: toastId });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed", { id: toastId });
    }
  }, []);

  const editor = useEditor({
    extensions: buildExtensions(),
    content: "",
    editorProps: {
      attributes: { class: "cn-prose" },
      handlePaste: (_view, event) => {
        const files = Array.from(event.clipboardData?.files ?? []).filter((f) => f.type.startsWith("image/"));
        if (!files.length) return false;
        uploadAndInsert(files);
        return true;
      },
      handleDrop: (view, event, _slice, moved) => {
        if (moved) return false;
        const files = Array.from(event.dataTransfer?.files ?? []).filter((f) => f.type.startsWith("image/"));
        if (!files.length) return false;
        event.preventDefault();
        const pos = view.posAtCoords({ left: event.clientX, top: event.clientY })?.pos;
        uploadAndInsert(files, pos);
        return true;
      },
    },
    onUpdate: ({ editor }) => {
      setDirty(true);
      setWordCount(editor.getText().split(/\s+/).filter(Boolean).length);
    },
  });
  editorRef.current = editor;

  // --- load ----------------------------------------------------------------
  useEffect(() => {
    ensureBlogFonts();
    fetchAllPostsForCms()
      .then((all) => setCategories(Array.from(new Set(all.map((p) => p.category))).sort()))
      .catch(() => {});
  }, []);

  useEffect(() => {
    setPageMeta({ title: `${id ? "Edit" : "New"} article - ColdNerd CMS`, noindex: true });
    if (!editor) return;
    if (!id) {
      setForm(EMPTY_FORM);
      setSlugTouched(false);
      editor.commands.setContent("");
      setDirty(false);
      setLoading(false);
      return;
    }
    if (justCreatedId.current === id) return;
    let alive = true;
    setLoading(true);
    fetchPostById(id)
      .then((post) => {
        if (!alive) return;
        setForm(formFromPost(post));
        setSlugTouched(true);
        editor.commands.setContent(post.content);
        setWordCount(editor.getText().split(/\s+/).filter(Boolean).length);
        setDirty(false);
      })
      .catch((err) => {
        toast.error(err instanceof Error ? err.message : "Article not found");
        navigate("/admin", { replace: true });
      })
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [id, editor, navigate]);

  // --- form helpers ----------------------------------------------------------
  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => {
      const next = { ...f, [key]: value };
      if (key === "title" && !slugTouched) next.slug = slugify(String(value));
      return next;
    });
    setDirty(true);
  };

  // --- save ------------------------------------------------------------------
  const save = useCallback(
    async (mode: "save" | "publish" | "unpublish" = "save"): Promise<BlogPost | null> => {
      if (!editor) return null;
      const title = form.title.trim();
      const slug = form.slug.trim() || slugify(title);
      if (!title) {
        toast.error("Please add a title before saving.");
        return null;
      }
      if (!SLUG_RE.test(slug)) {
        toast.error("The URL slug can only contain lowercase letters, numbers and single dashes.");
        return null;
      }
      const content = editor.getHTML();
      const status: PostStatus = mode === "publish" ? "published" : mode === "unpublish" ? "draft" : form.status;
      const payload: BlogPostInput = {
        title,
        slug,
        excerpt: form.excerpt.trim(),
        content,
        category: form.category.trim() || "General",
        author_name: form.author_name.trim() || "ColdNerd Team",
        cover_image_url: form.cover_image_url,
        status,
        featured: form.featured,
        position: 0, // ignored on update, replaced on create
        read_time_minutes: estimateReadTime(content),
        published_at: form.published_at ? new Date(form.published_at).toISOString() : null,
        seo_title: form.seo_title.trim() || null,
        seo_description: form.seo_description.trim() || null,
      };

      setSaving(true);
      try {
        let saved: BlogPost;
        if (id) {
          const { position: _p, ...patch } = payload;
          saved = await updatePost(id, patch);
        } else {
          saved = await createPost(payload);
        }
        setForm(formFromPost(saved));
        setSlugTouched(true);
        setDirty(false);
        toast.success(
          mode === "publish" ? "Article published 🎉" : mode === "unpublish" ? "Article moved to drafts" : "Changes saved"
        );
        if (!id) {
          justCreatedId.current = saved.id;
          navigate(`/admin/edit/${saved.id}`, { replace: true });
        }
        return saved;
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Save failed");
        return null;
      } finally {
        setSaving(false);
      }
    },
    [editor, form, id, navigate]
  );

  // Ctrl/Cmd + S
  const saveRef = useRef(save);
  saveRef.current = save;
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        saveRef.current();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Warn before losing unsaved work
  useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      dirty &&
      !saving &&
      !bypassBlocker.current &&
      currentLocation.pathname !== nextLocation.pathname &&
      !nextLocation.pathname.startsWith("/admin/edit/")
  );

  const preview = async () => {
    const win = window.open("about:blank", "_blank");
    const saved = dirty || !id ? await save() : { slug: form.slug };
    if (saved && win) win.location.href = `/blog/${saved.slug}`;
    else win?.close();
  };

  const handleDelete = async () => {
    if (!id) return;
    try {
      await deletePost(id);
      bypassBlocker.current = true;
      setDirty(false);
      toast.success("Article deleted");
      navigate("/admin", { replace: true });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  };

  const onMediaSelect = (url: string, alt: string) => {
    if (!editor) return;
    if (mediaMode === "cover") update("cover_image_url", url);
    else if (mediaMode === "replace") {
      const current = editor.getAttributes("image");
      editor.chain().focus().updateAttributes("image", { src: url, alt: alt || current.alt }).run();
    } else editor.chain().focus().setImage({ src: url, alt }).run();
  };

  const isScheduled =
    form.status === "published" && form.published_at && new Date(form.published_at).getTime() > Date.now();
  const statusLabel = form.status === "draft" ? "Draft" : isScheduled ? "Scheduled" : "Published";
  const readTime = Math.max(1, Math.round(wordCount / 220));
  const seoTitle = form.seo_title || form.title || "Article title";
  const seoDesc = form.seo_description || form.excerpt || "Article description shown in search results.";

  const categoryOptions = useMemo(
    () => Array.from(new Set([...categories, "Automation", "Growth", "Safety", "Strategy", "Tips", "Outreach", "Templates", "Agencies"])).sort(),
    [categories]
  );

  return (
    <CmsLayout>
      {/* Action bar */}
      <div className="sticky top-16 z-30 bg-[#f5f8ff]/95 backdrop-blur border-b border-gray-200">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
          <Link to="/admin" className="p-2 -ml-2 rounded-lg text-gray-500 hover:bg-white hover:text-gray-900" title="Back to articles">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
              form.status === "draft" ? "bg-gray-200 text-gray-700" : isScheduled ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"
            }`}
          >
            {statusLabel}
          </span>
          <span className="hidden sm:inline text-xs text-gray-400">
            {saving ? "Saving…" : dirty ? "Unsaved changes" : id ? "All changes saved" : "New article"}
          </span>
          <span className="hidden md:inline text-xs text-gray-400">· {wordCount} words · {readTime} min read</span>

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={preview}
              disabled={saving || loading}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-white disabled:opacity-50"
            >
              <ExternalLink className="w-4 h-4" /> Preview
            </button>
            {form.status === "published" ? (
              <>
                <button
                  onClick={() => save("unpublish")}
                  disabled={saving || loading}
                  className="px-3 sm:px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Unpublish
                </button>
                <button
                  onClick={() => save()}
                  disabled={saving || loading}
                  className="px-4 sm:px-5 py-2 rounded-lg bg-[#2a6ff3] text-sm font-semibold text-white hover:bg-[#1f5ccf] disabled:opacity-50"
                >
                  {saving ? "Saving…" : "Update"}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => save()}
                  disabled={saving || loading}
                  className="px-3 sm:px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Save draft
                </button>
                <button
                  onClick={() => save("publish")}
                  disabled={saving || loading}
                  className="px-4 sm:px-5 py-2 rounded-lg bg-[#2a6ff3] text-sm font-semibold text-white hover:bg-[#1f5ccf] disabled:opacity-50"
                >
                  Publish
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {loading && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-[#f5f8ff]/70">
          <Loader2 className="w-8 h-8 text-[#2a6ff3] animate-spin" />
        </div>
      )}

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-6">
        {/* ---------------- Writing area ---------------- */}
        <div className="min-w-0 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200 px-5 sm:px-10 pt-8 pb-4">
            <textarea
              value={form.title}
              onChange={(e) => update("title", e.target.value.replace(/\n/g, " "))}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  editor?.commands.focus("start");
                }
              }}
              placeholder="Article title"
              rows={1}
              className="w-full resize-none overflow-hidden text-3xl sm:text-4xl font-bold text-[#0d0d0d] placeholder-gray-300 focus:outline-none leading-tight [field-sizing:content]"
            />
            <textarea
              value={form.excerpt}
              onChange={(e) => update("excerpt", e.target.value)}
              placeholder="Short summary shown on article cards and under the title…"
              rows={2}
              className="w-full resize-none mt-3 text-lg text-[#5e5e5e] placeholder-gray-300 focus:outline-none leading-relaxed [field-sizing:content]"
            />
          </div>

          {editor && (
            <Toolbar
              editor={editor}
              onInsertImage={() => setMediaMode("insert")}
              onReplaceImage={() => setMediaMode("replace")}
            />
          )}

          <div className="cn-editor bg-white rounded-2xl border border-gray-200 px-5 sm:px-10 py-8">
            <div className="max-w-[760px] mx-auto">
              <EditorContent editor={editor} />
            </div>
          </div>
        </div>

        {/* ---------------- Settings sidebar ---------------- */}
        <aside className="space-y-4">
          <Panel title="Publishing">
            <Field label="Status">
              <div className="grid grid-cols-2 gap-2">
                {(["draft", "published"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => update("status", s)}
                    className={`py-2 rounded-lg text-sm font-medium border ${
                      form.status === s ? "border-[#2a6ff3] bg-[#eef4ff] text-[#2a6ff3]" : "border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {s === "draft" ? "Draft" : "Published"}
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Publish date" hint="Leave empty to use the moment you publish. A future date schedules the article.">
              <input
                type="datetime-local"
                value={form.published_at}
                onChange={(e) => update("published_at", e.target.value)}
                className={inputClass}
              />
            </Field>
            <label className="flex items-start gap-3 p-3 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => update("featured", e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-[#2a6ff3]"
              />
              <span>
                <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-800">
                  <Star className="w-4 h-4 text-amber-500" /> Show on home page
                </span>
                <span className="block text-xs text-gray-500 mt-0.5">
                  Adds this article to "Learn, Grow &amp; Automate". Order is set on the Articles list.
                </span>
              </span>
            </label>
          </Panel>

          <Panel title="Cover image">
            {form.cover_image_url ? (
              <div className="relative group rounded-xl bg-[#eef4ff] p-4 flex items-center justify-center">
                <img src={form.cover_image_url} alt="" className="max-h-44 object-contain" />
                <div className="absolute inset-0 rounded-xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setMediaMode("cover")}
                    className="px-3 py-1.5 rounded-lg bg-white text-sm font-medium"
                  >
                    Change
                  </button>
                  <button
                    type="button"
                    onClick={() => update("cover_image_url", null)}
                    className="p-1.5 rounded-lg bg-white text-red-600"
                    title="Remove cover image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setMediaMode("cover")}
                className="w-full rounded-xl border-2 border-dashed border-gray-200 py-8 flex flex-col items-center gap-2 text-sm text-gray-500 hover:border-[#2a6ff3] hover:text-[#2a6ff3]"
              >
                <ImagePlus className="w-6 h-6" /> Add cover image
              </button>
            )}
            <p className="text-xs text-gray-400">Shown on article cards and at the top of the article.</p>
          </Panel>

          <Panel title="Details">
            <Field label="URL slug" hint={`coldnerd.com/blog/${form.slug || "your-article"}`}>
              <input
                value={form.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  update("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"));
                }}
                onBlur={() => update("slug", slugify(form.slug))}
                className={inputClass}
              />
            </Field>
            <Field label="Category">
              <input list="cn-categories" value={form.category} onChange={(e) => update("category", e.target.value)} className={inputClass} />
              <datalist id="cn-categories">
                {categoryOptions.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </Field>
            <Field label="Author">
              <input value={form.author_name} onChange={(e) => update("author_name", e.target.value)} className={inputClass} />
            </Field>
          </Panel>

          <Panel title="SEO (search engines)">
            <Field label="SEO title" hint={`${seoTitle.length}/60 characters`}>
              <input
                value={form.seo_title}
                onChange={(e) => update("seo_title", e.target.value)}
                placeholder={form.title || "Defaults to the article title"}
                className={inputClass}
              />
            </Field>
            <Field label="Meta description" hint={`${seoDesc.length}/160 characters`}>
              <textarea
                value={form.seo_description}
                onChange={(e) => update("seo_description", e.target.value)}
                placeholder={form.excerpt || "Defaults to the summary"}
                rows={3}
                className={`${inputClass} resize-none`}
              />
            </Field>
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
              <p className="text-[11px] text-gray-400 mb-1">Google preview</p>
              <p className="text-[#1a0dab] text-base leading-snug line-clamp-1">{seoTitle} - ColdNerd Blog</p>
              <p className="text-[#006621] text-xs">coldnerd.com › blog › {form.slug || "…"}</p>
              <p className="text-xs text-gray-600 line-clamp-2 mt-0.5">{seoDesc}</p>
            </div>
          </Panel>

          {id && (
            <Panel title="Danger zone">
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl border border-red-200 text-sm font-semibold text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" /> Delete article
              </button>
            </Panel>
          )}
        </aside>
      </div>

      <MediaLibrary
        open={mediaMode !== null}
        title={mediaMode === "cover" ? "Choose cover image" : mediaMode === "replace" ? "Replace image" : "Insert image"}
        onClose={() => setMediaMode(null)}
        onSelect={onMediaSelect}
      />

      <ConfirmDialog
        open={confirmDelete}
        title="Delete this article?"
        message={<>This permanently removes <strong>{form.title || "this article"}</strong> from the website.</>}
        confirmLabel="Delete article"
        danger
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(false)}
      />

      <ConfirmDialog
        open={blocker.state === "blocked"}
        title="Leave without saving?"
        message="You have unsaved changes to this article. If you leave now they'll be lost."
        confirmLabel="Leave page"
        danger
        onConfirm={() => blocker.proceed?.()}
        onCancel={() => blocker.reset?.()}
      />
    </CmsLayout>
  );
}

const inputClass =
  "w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-[#2a6ff3] focus:ring-1 focus:ring-[#2a6ff3]";

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
      <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">{title}</h2>
      {children}
    </section>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
      {children}
      {hint && <p className="text-[11px] text-gray-400 mt-1 break-all">{hint}</p>}
    </div>
  );
}
