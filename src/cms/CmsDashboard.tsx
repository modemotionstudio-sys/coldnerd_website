import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import {
  ArrowDown,
  ArrowUp,
  Copy,
  Download,
  Eye,
  EyeOff,
  FileText,
  Home,
  Pencil,
  Plus,
  Search,
  Star,
  Trash2,
} from "lucide-react";
import { CmsLayout } from "./CmsLayout";
import { ConfirmDialog } from "./ConfirmDialog";
import {
  categoryClass,
  createPost,
  deletePost,
  fetchAllPostsForCms,
  fetchPostById,
  formatPostDate,
  importStarterPosts,
  savePositions,
  updatePost,
  type BlogPost,
} from "../lib/blog";
import { setPageMeta } from "../lib/seo";

type Filter = "all" | "published" | "draft" | "featured";

const HOME_SLOTS = 6;

export default function CmsDashboard() {
  const [posts, setPosts] = useState<BlogPost[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [toDelete, setToDelete] = useState<BlogPost | null>(null);
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const load = useCallback(async () => {
    try {
      setPosts(await fetchAllPostsForCms());
      setLoadError(null);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : String(err));
      setPosts([]);
    }
  }, []);

  useEffect(() => {
    setPageMeta({ title: "Articles - ColdNerd CMS", noindex: true });
    load();
  }, [load]);

  const stats = useMemo(() => {
    const all = posts ?? [];
    return {
      total: all.length,
      published: all.filter((p) => p.status === "published").length,
      drafts: all.filter((p) => p.status === "draft").length,
      featured: all.filter((p) => p.featured && p.status === "published").length,
    };
  }, [posts]);

  // Which published+featured posts actually appear on the home page (first 6 by order).
  const onHome = useMemo(() => {
    const ids = (posts ?? [])
      .filter((p) => p.featured && p.status === "published")
      .slice(0, HOME_SLOTS)
      .map((p) => p.id);
    return new Set(ids);
  }, [posts]);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return (posts ?? []).filter((p) => {
      if (filter === "published" && p.status !== "published") return false;
      if (filter === "draft" && p.status !== "draft") return false;
      if (filter === "featured" && !p.featured) return false;
      if (q && !`${p.title} ${p.slug} ${p.category}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [posts, filter, search]);

  const reorderEnabled = filter === "all" && !search.trim();

  const patchLocal = (id: string, patch: Partial<BlogPost>) =>
    setPosts((prev) => prev?.map((p) => (p.id === id ? { ...p, ...patch } : p)) ?? prev);

  const togglePublish = async (post: BlogPost) => {
    const status = post.status === "published" ? "draft" : "published";
    try {
      const updated = await updatePost(post.id, { status });
      patchLocal(post.id, updated);
      toast.success(status === "published" ? "Article published" : "Article moved to drafts");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Update failed");
    }
  };

  const toggleFeatured = async (post: BlogPost) => {
    try {
      await updatePost(post.id, { featured: !post.featured });
      patchLocal(post.id, { featured: !post.featured });
      toast.success(!post.featured ? "Added to home page" : "Removed from home page");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Update failed");
    }
  };

  const move = async (index: number, dir: -1 | 1) => {
    if (!posts) return;
    const target = index + dir;
    if (target < 0 || target >= posts.length) return;
    const next = [...posts];
    [next[index], next[target]] = [next[target], next[index]];
    const withPositions = next.map((p, i) => ({ ...p, position: i }));
    setPosts(withPositions);
    try {
      await savePositions(withPositions.map((p) => p.id));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save order");
      load();
    }
  };

  const duplicate = async (post: BlogPost) => {
    try {
      const full = await fetchPostById(post.id);
      const { id: _id, created_at: _c, updated_at: _u, ...rest } = full;
      const copy = await createPost({
        ...rest,
        title: `${full.title} (copy)`,
        slug: `${full.slug}-copy-${Date.now().toString(36)}`,
        status: "draft",
        featured: false,
        published_at: null,
      });
      toast.success("Draft copy created");
      navigate(`/admin/edit/${copy.id}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not duplicate");
    }
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    setBusy(true);
    try {
      await deletePost(toDelete.id);
      setPosts((prev) => prev?.filter((p) => p.id !== toDelete.id) ?? prev);
      toast.success("Article deleted");
      setToDelete(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setBusy(false);
    }
  };

  const runImport = async () => {
    setBusy(true);
    try {
      await importStarterPosts();
      toast.success("Starter articles imported");
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Import failed");
    } finally {
      setBusy(false);
    }
  };

  const filters: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: "All", count: stats.total },
    { key: "published", label: "Published", count: stats.published },
    { key: "draft", label: "Drafts", count: stats.drafts },
    { key: "featured", label: "On home page", count: (posts ?? []).filter((p) => p.featured).length },
  ];

  return (
    <CmsLayout>
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Articles</h1>
            <p className="text-gray-500 mt-1">Create, edit, publish and order the articles on your blog.</p>
          </div>
          <Link
            to="/admin/new"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#2a6ff3] text-white font-semibold no-underline hover:bg-[#1f5ccf] shadow-sm"
          >
            <Plus className="w-5 h-5" /> New article
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total articles", value: stats.total, icon: FileText },
            { label: "Published", value: stats.published, icon: Eye },
            { label: "Drafts", value: stats.drafts, icon: EyeOff },
            { label: `On home page (max ${HOME_SLOTS})`, value: Math.min(stats.featured, HOME_SLOTS), icon: Home },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#eef4ff] text-[#2a6ff3] flex items-center justify-center shrink-0">
                <s.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{posts ? s.value : "–"}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {loadError && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            <p className="font-semibold mb-1">Couldn't load articles from the database.</p>
            <p>{loadError}</p>
            <p className="mt-2 text-red-600/80">
              If this is the first setup, run <code>supabase/migrations/20260923000000_blog_cms.sql</code> in the Supabase SQL editor.
            </p>
          </div>
        )}

        {/* Toolbar */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex flex-wrap items-center gap-3 p-4 border-b border-gray-100">
            <div className="flex flex-wrap gap-1">
              {filters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    filter === f.key ? "bg-[#2a6ff3] text-white" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {f.label} <span className="opacity-70">({f.count})</span>
                </button>
              ))}
            </div>
            <div className="relative ml-auto w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles…"
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#2a6ff3]"
              />
            </div>
          </div>

          {!reorderEnabled && posts && posts.length > 1 && (
            <p className="px-4 py-2 text-xs text-gray-400 bg-gray-50 border-b border-gray-100">
              Clear the search and choose "All" to change the order of articles.
            </p>
          )}

          {/* List */}
          {posts === null ? (
            <div className="p-10 flex justify-center">
              <div className="w-8 h-8 border-4 border-[#2a6ff3] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : posts.length === 0 && !loadError ? (
            <div className="p-12 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#eef4ff] text-[#2a6ff3] flex items-center justify-center mx-auto mb-4">
                <FileText className="w-7 h-7" />
              </div>
              <h2 className="text-lg font-bold mb-1">No articles yet</h2>
              <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
                Import the 10 articles that were already on the website so you can edit them here, or start from scratch.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={runImport}
                  disabled={busy}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2a6ff3] text-white font-semibold text-sm hover:bg-[#1f5ccf] disabled:opacity-50"
                >
                  <Download className="w-4 h-4" /> {busy ? "Importing…" : "Import starter articles"}
                </button>
                <Link
                  to="/admin/new"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 no-underline hover:bg-gray-50"
                >
                  <Plus className="w-4 h-4" /> Write a new article
                </Link>
              </div>
            </div>
          ) : visible.length === 0 ? (
            <p className="p-10 text-center text-gray-500 text-sm">No articles match your filters.</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {visible.map((post) => {
                const index = posts.indexOf(post);
                return (
                  <li key={post.id} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-gray-50/70 transition-colors">
                    {/* Order */}
                    <div className="flex flex-col shrink-0">
                      <button
                        onClick={() => move(index, -1)}
                        disabled={!reorderEnabled || index === 0}
                        className="p-1 rounded text-gray-400 hover:text-[#2a6ff3] hover:bg-[#eef4ff] disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-gray-400"
                        title="Move up"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => move(index, 1)}
                        disabled={!reorderEnabled || index === posts.length - 1}
                        className="p-1 rounded text-gray-400 hover:text-[#2a6ff3] hover:bg-[#eef4ff] disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-gray-400"
                        title="Move down"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Thumb */}
                    <Link
                      to={`/admin/edit/${post.id}`}
                      className="hidden sm:flex w-20 h-14 rounded-lg bg-[#eef4ff] items-center justify-center overflow-hidden shrink-0"
                    >
                      {post.cover_image_url ? (
                        <img src={post.cover_image_url} alt="" className="max-w-full max-h-full object-contain" />
                      ) : (
                        <FileText className="w-5 h-5 text-[#2a6ff3]/50" />
                      )}
                    </Link>

                    {/* Title */}
                    <div className="min-w-0 flex-1">
                      <Link
                        to={`/admin/edit/${post.id}`}
                        className="font-semibold text-gray-900 hover:text-[#2a6ff3] no-underline line-clamp-1"
                      >
                        {post.title || "Untitled"}
                      </Link>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-gray-500">
                        <span className={`px-2 py-0.5 rounded-full font-semibold ${categoryClass(post.category)}`}>{post.category}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full font-semibold ${
                            post.status === "published" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {post.status === "published"
                            ? post.published_at && new Date(post.published_at) > new Date()
                              ? "Scheduled"
                              : "Published"
                            : "Draft"}
                        </span>
                        {onHome.has(post.id) && (
                          <span className="px-2 py-0.5 rounded-full font-semibold bg-amber-100 text-amber-700">On home page</span>
                        )}
                        <span className="hidden md:inline">/blog/{post.slug}</span>
                        <span>Updated {formatPostDate(post.updated_at)}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-0.5 shrink-0">
                      <IconButton
                        title={post.featured ? "Remove from home page" : "Show on home page"}
                        onClick={() => toggleFeatured(post)}
                        active={post.featured}
                      >
                        <Star className={`w-4 h-4 ${post.featured ? "fill-amber-400 text-amber-500" : ""}`} />
                      </IconButton>
                      <IconButton
                        title={post.status === "published" ? "Unpublish (move to drafts)" : "Publish"}
                        onClick={() => togglePublish(post)}
                      >
                        {post.status === "published" ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </IconButton>
                      <IconButton title="Preview on site" onClick={() => window.open(`/blog/${post.slug}`, "_blank")}>
                        <Search className="w-4 h-4" />
                      </IconButton>
                      <IconButton title="Duplicate" onClick={() => duplicate(post)}>
                        <Copy className="w-4 h-4" />
                      </IconButton>
                      <IconButton title="Edit" onClick={() => navigate(`/admin/edit/${post.id}`)}>
                        <Pencil className="w-4 h-4" />
                      </IconButton>
                      <IconButton title="Delete" onClick={() => setToDelete(post)} danger>
                        <Trash2 className="w-4 h-4" />
                      </IconButton>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <p className="text-xs text-gray-400 mt-4">
          The blog page always lists the newest published article first. The home page "Learn, Grow &amp; Automate" section
          shows the first {HOME_SLOTS} published articles marked with a star, in the order above (use the arrows to change it).
        </p>
      </div>

      <ConfirmDialog
        open={!!toDelete}
        title="Delete this article?"
        message={
          <>
            <strong>{toDelete?.title}</strong> will be permanently removed from the website. This can't be undone.
          </>
        }
        confirmLabel="Delete article"
        danger
        busy={busy}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </CmsLayout>
  );
}

function IconButton({
  children,
  title,
  onClick,
  danger,
  active,
}: {
  children: React.ReactNode;
  title: string;
  onClick: () => void;
  danger?: boolean;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      aria-label={title}
      className={`p-2 rounded-lg transition-colors ${
        danger
          ? "text-gray-400 hover:text-red-600 hover:bg-red-50"
          : active
            ? "text-amber-500 hover:bg-amber-50"
            : "text-gray-400 hover:text-[#2a6ff3] hover:bg-[#eef4ff]"
      }`}
    >
      {children}
    </button>
  );
}
