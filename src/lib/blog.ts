import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { supabase } from "./supabase";
import { seedPosts } from "./blogSeed";

export type PostStatus = "draft" | "published";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  category: string;
  author_name: string;
  read_time_minutes: number;
  status: PostStatus;
  featured: boolean;
  position: number;
  seo_title: string | null;
  seo_description: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export type BlogPostInput = Omit<BlogPost, "id" | "created_at" | "updated_at">;

export const IMAGE_BUCKET = "blog-images";
const TABLE = "blog_posts";

/** Columns needed for cards/listings — skips the (large) HTML content. */
const LIST_COLUMNS =
  "id,slug,title,excerpt,cover_image_url,category,author_name,read_time_minutes,status,featured,position,published_at,created_at,updated_at";

// ---------------------------------------------------------------------------
// Public reads. If the database has no published articles (or can't be
// reached), fall back to the bundled starter articles so the landing page
// cards and the blog never show up empty.
// ---------------------------------------------------------------------------

type Ordering = "manual" | "newest";

function orderPosts<T extends Pick<BlogPost, "position" | "published_at">>(posts: T[], ordering: Ordering): T[] {
  const newest = (a: T, b: T) => (b.published_at ?? "").localeCompare(a.published_at ?? "");
  return [...posts].sort((a, b) => (ordering === "manual" ? a.position - b.position || newest(a, b) : newest(a, b)));
}

/**
 * `ordering: "newest"` (blog list) puts the latest published article first.
 * `ordering: "manual"` (home page cards) follows the order set in the CMS.
 */
export async function fetchPublishedPosts(
  opts: { featuredOnly?: boolean; limit?: number; ordering?: Ordering } = {}
) {
  const ordering = opts.ordering ?? "newest";
  let query = supabase
    .from(TABLE)
    .select(LIST_COLUMNS)
    .eq("status", "published")
    .lte("published_at", new Date().toISOString());
  query =
    ordering === "manual"
      ? query.order("position", { ascending: true }).order("published_at", { ascending: false })
      : query.order("published_at", { ascending: false });
  if (opts.featuredOnly) query = query.eq("featured", true);
  if (opts.limit) query = query.limit(opts.limit);

  const { data, error } = await query;
  if (error) console.warn("[blog] falling back to starter articles:", error.message);
  if (!error && data && data.length > 0) return data as unknown as BlogPost[];

  let posts = orderPosts(seedPosts, ordering);
  if (opts.featuredOnly) posts = posts.filter((p) => p.featured);
  return opts.limit ? posts.slice(0, opts.limit) : posts;
}

/** Returns a post by slug. Drafts are only returned to CMS managers (enforced by RLS). */
export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase.from(TABLE).select("*").eq("slug", slug).maybeSingle();
  if (error) console.warn("[blog] falling back to starter articles:", error.message);
  if (!error && data) return data as BlogPost;
  return seedPosts.find((p) => p.slug === slug) ?? null;
}

// ---------------------------------------------------------------------------
// CMS (manager-only; Supabase RLS rejects these for anyone else)
// ---------------------------------------------------------------------------

export async function fetchAllPostsForCms() {
  const { data, error } = await supabase
    .from(TABLE)
    .select(LIST_COLUMNS)
    .order("position", { ascending: true })
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return data as unknown as BlogPost[];
}

export async function fetchPostById(id: string) {
  const { data, error } = await supabase.from(TABLE).select("*").eq("id", id).single();
  if (error) throw error;
  return data as BlogPost;
}

/** New posts go to the top of the manual order. */
export async function createPost(input: BlogPostInput) {
  const { data: first } = await supabase
    .from(TABLE)
    .select("position")
    .order("position", { ascending: true })
    .limit(1)
    .maybeSingle();
  const position = first ? first.position - 1 : 0;
  const { data, error } = await supabase.from(TABLE).insert({ ...input, position }).select("*").single();
  if (error) throw friendlyError(error);
  return data as BlogPost;
}

export async function updatePost(id: string, patch: Partial<BlogPostInput>) {
  const { data, error } = await supabase.from(TABLE).update(patch).eq("id", id).select("*").single();
  if (error) throw friendlyError(error);
  return data as BlogPost;
}

export async function deletePost(id: string) {
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) throw friendlyError(error);
}

/** Persists a new manual order: each id gets its index as position. */
export async function savePositions(ids: string[]) {
  const results = await Promise.all(
    ids.map((id, position) => supabase.from(TABLE).update({ position }).eq("id", id))
  );
  const failed = results.find((r) => r.error);
  if (failed?.error) throw friendlyError(failed.error);
}

export async function importStarterPosts() {
  const rows: BlogPostInput[] = seedPosts.map(({ id: _id, created_at: _c, updated_at: _u, ...rest }) => rest);
  const { error } = await supabase.from(TABLE).upsert(rows, { onConflict: "slug", ignoreDuplicates: true });
  if (error) throw friendlyError(error);
}

function friendlyError(error: { code?: string; message: string }) {
  if (error.code === "23505") return new Error("Another article already uses this URL slug. Please choose a different slug.");
  if (error.code === "42501") return new Error("You don't have permission to do that. Make sure you're logged in as a CMS manager.");
  return new Error(error.message);
}

// ---------------------------------------------------------------------------
// Manager check
// ---------------------------------------------------------------------------

export async function checkIsManager(): Promise<boolean> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return false;
  const { data, error } = await supabase.rpc("is_cms_manager");
  return !error && data === true;
}

/** Re-checks whenever the auth state changes. `null` while loading. */
export function useIsManager() {
  const [isManager, setIsManager] = useState<boolean | null>(null);
  useEffect(() => {
    let alive = true;
    const run = () => checkIsManager().then((v) => alive && setIsManager(v));
    run();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") run();
    });
    return () => {
      alive = false;
      subscription.unsubscribe();
    };
  }, []);
  return isManager;
}

// ---------------------------------------------------------------------------
// Images
// ---------------------------------------------------------------------------

export const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif", "image/avif"];
const UPLOAD_FOLDER = "uploads";

export async function uploadImage(file: File): Promise<string> {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error(`${file.name}: only PNG, JPG, WEBP, GIF or AVIF images are allowed.`);
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error(`${file.name} is larger than 10 MB.`);
  }
  const ext = file.name.split(".").pop()?.toLowerCase() || "png";
  const base = slugify(file.name.replace(/\.[^.]+$/, "")).slice(0, 40) || "image";
  const path = `${UPLOAD_FOLDER}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${base}.${ext}`;
  const { error } = await supabase.storage
    .from(IMAGE_BUCKET)
    .upload(path, file, { cacheControl: "31536000", contentType: file.type });
  if (error) throw new Error(error.message);
  return supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path).data.publicUrl;
}

export interface LibraryImage {
  name: string;
  url: string;
  created_at: string;
}

export async function listLibraryImages(): Promise<LibraryImage[]> {
  const { data, error } = await supabase.storage
    .from(IMAGE_BUCKET)
    .list(UPLOAD_FOLDER, { limit: 500, sortBy: { column: "created_at", order: "desc" } });
  if (error) throw new Error(error.message);
  return (data ?? [])
    .filter((f) => f.id) // skip folder placeholders
    .map((f) => ({
      name: f.name,
      created_at: f.created_at,
      url: supabase.storage.from(IMAGE_BUCKET).getPublicUrl(`${UPLOAD_FOLDER}/${f.name}`).data.publicUrl,
    }));
}

export async function deleteLibraryImage(name: string) {
  const { error } = await supabase.storage.from(IMAGE_BUCKET).remove([`${UPLOAD_FOLDER}/${name}`]);
  if (error) throw new Error(error.message);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "");
}

export function estimateReadTime(html: string) {
  const text = html.replace(/<[^>]+>/g, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function formatPostDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const ALLOWED_IFRAME_SRC = /^https:\/\/(www\.)?(youtube\.com|youtube-nocookie\.com)\/embed\//;

DOMPurify.addHook("uponSanitizeElement", (node, data) => {
  if (data.tagName === "iframe") {
    const src = (node as Element).getAttribute?.("src") ?? "";
    if (!ALLOWED_IFRAME_SRC.test(src)) node.parentNode?.removeChild(node);
  }
});

/** Sanitises editor HTML before rendering it on the public site. Only YouTube iframes survive. */
export function sanitizeHtml(html: string) {
  return DOMPurify.sanitize(html, {
    ADD_TAGS: ["iframe"],
    ADD_ATTR: ["target", "rel", "allow", "allowfullscreen", "frameborder"],
  });
}

export const categoryColors: Record<string, string> = {
  Automation: "bg-blue-100 text-blue-700",
  Safety: "bg-green-100 text-green-700",
  Growth: "bg-purple-100 text-purple-700",
  Tips: "bg-amber-100 text-amber-700",
  Strategy: "bg-rose-100 text-rose-700",
  Outreach: "bg-sky-100 text-sky-700",
  Templates: "bg-teal-100 text-teal-700",
  Agencies: "bg-indigo-100 text-indigo-700",
};

export function categoryClass(category: string) {
  return categoryColors[category] || "bg-gray-100 text-gray-700";
}

// Google Fonts offered in the editor. Loaded lazily on blog/CMS pages only.
export const EDITOR_FONTS = [
  { label: "Default (Inter)", value: "" },
  { label: "Inter", value: "Inter, sans-serif" },
  { label: "Poppins", value: "Poppins, sans-serif" },
  { label: "Montserrat", value: "Montserrat, sans-serif" },
  { label: "Roboto", value: "Roboto, sans-serif" },
  { label: "Open Sans", value: "'Open Sans', sans-serif" },
  { label: "Lato", value: "Lato, sans-serif" },
  { label: "Merriweather", value: "Merriweather, serif" },
  { label: "Playfair Display", value: "'Playfair Display', serif" },
  { label: "Lora", value: "Lora, serif" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Roboto Mono", value: "'Roboto Mono', monospace" },
];

const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:ital,wght@0,400;0,600;0,700;1,400&family=Montserrat:ital,wght@0,400;0,600;0,700;1,400&family=Roboto:ital,wght@0,400;0,700;1,400&family=Open+Sans:ital,wght@0,400;0,700;1,400&family=Lato:ital,wght@0,400;0,700;1,400&family=Merriweather:ital,wght@0,400;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lora:ital,wght@0,400;0,700;1,400&family=Roboto+Mono:wght@400;700&display=swap";

export function ensureBlogFonts() {
  if (typeof document === "undefined" || document.getElementById("cn-blog-fonts")) return;
  const link = document.createElement("link");
  link.id = "cn-blog-fonts";
  link.rel = "stylesheet";
  link.href = FONT_HREF;
  document.head.appendChild(link);
}
