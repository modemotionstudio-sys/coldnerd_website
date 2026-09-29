import { Link, useSearchParams } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import ScrollReveal from "../app/components/ScrollReveal";
import { BlogNavbar } from "../blog/BlogNavbar";
import { categoryClass, fetchPublishedPosts, formatPostDate, type BlogPost } from "../lib/blog";

const HIGHLIGHT_MS = 4500;

function BlogCard({ post, index, highlighted }: { post: BlogPost; index: number; highlighted: boolean }) {
  return (
    <motion.div
      id={`post-${post.slug}`}
      initial={{ opacity: 0, y: 30 }}
      animate={highlighted ? { opacity: 1, y: 0, scale: [1, 1.05, 1.02] } : { opacity: 1, y: 0, scale: 1 }}
      transition={highlighted ? { duration: 0.8, ease: "easeOut" } : { duration: 0.4, delay: Math.min(index, 8) * 0.06 }}
      className="relative scroll-mt-32"
    >
      {/* Highlight when arriving from a home-page card */}
      <AnimatePresence>
        {highlighted && (
          <>
            <motion.span
              aria-hidden
              className="absolute -inset-1 rounded-[20px] pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                boxShadow: [
                  "0 0 0 0px rgba(42,111,243,0.55)",
                  "0 0 0 16px rgba(42,111,243,0)",
                ],
              }}
              exit={{ opacity: 0 }}
              transition={{ boxShadow: { duration: 1.2, repeat: 3, ease: "easeOut" }, opacity: { duration: 0.3 } }}
              style={{ border: "3px solid #2a6ff3" }}
            />
            <motion.span
              className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap px-3 py-1 rounded-full bg-[#2a6ff3] text-white text-xs font-semibold shadow-lg"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              Tap to read this article
            </motion.span>
          </>
        )}
      </AnimatePresence>

      <Link to={`/blog/${post.slug}`} className="block h-full no-underline group">
        <motion.article
          whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl border border-gray-100 overflow-hidden h-full flex flex-col"
        >
          {post.cover_image_url ? (
            <div className="h-48 bg-[#eef4ff] flex items-center justify-center p-6 overflow-hidden">
              <img
                src={post.cover_image_url}
                alt=""
                loading="lazy"
                className="max-h-full max-w-full object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ) : (
            <div className="h-2 bg-gradient-to-r from-[#2a6ff3] to-[#6c9dff]" />
          )}

          <div className="p-6 sm:p-8 flex flex-col flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryClass(post.category)}`}>
                {post.category}
              </span>
              <span className="text-gray-400 text-sm">{formatPostDate(post.published_at)}</span>
            </div>

            <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[#0d0d0d] text-lg sm:text-xl leading-tight mb-3 group-hover:text-[#2a6ff3] transition-colors">
              {post.title}
            </h3>

            <p className="font-['Inter:Regular',sans-serif] text-[#757575] text-sm sm:text-base leading-relaxed flex-1 line-clamp-3">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
              <span className="text-gray-400 text-sm">{post.read_time_minutes} min read</span>
              <span className="text-[#2a6ff3] font-semibold text-sm group-hover:underline">Read More &rarr;</span>
            </div>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-100" />
      <div className="p-8 space-y-3">
        <div className="h-4 w-24 bg-gray-100 rounded" />
        <div className="h-6 w-full bg-gray-100 rounded" />
        <div className="h-4 w-4/5 bg-gray-100 rounded" />
      </div>
    </div>
  );
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[] | null>(null);
  const [category, setCategory] = useState("All");
  const [searchParams, setSearchParams] = useSearchParams();
  const [highlighted, setHighlighted] = useState<string | null>(null);
  const highlightSlug = searchParams.get("highlight");

  useEffect(() => {
    document.title = "Blog - ColdNerd";
    fetchPublishedPosts().then(setPosts);
  }, []);

  // Arriving from a home-page card (/blog?highlight=slug): glide to that card and pulse it.
  useEffect(() => {
    if (!posts || !highlightSlug) return;
    if (!posts.some((p) => p.slug === highlightSlug)) return;
    setCategory("All");
    const scrollTimer = setTimeout(() => {
      document.getElementById(`post-${highlightSlug}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 450);
    const pulseTimer = setTimeout(() => setHighlighted(highlightSlug), 900);
    const clearTimer = setTimeout(() => {
      setHighlighted(null);
      setSearchParams({}, { replace: true });
    }, 900 + HIGHLIGHT_MS);
    return () => {
      clearTimeout(scrollTimer);
      clearTimeout(pulseTimer);
      clearTimeout(clearTimer);
    };
  }, [posts, highlightSlug, setSearchParams]);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set((posts ?? []).map((p) => p.category)))],
    [posts]
  );
  const visible = (posts ?? []).filter((p) => category === "All" || p.category === category);

  return (
    <div className="bg-[#f8fbff] min-h-screen w-full overflow-x-hidden">
      <BlogNavbar />

      {/* Hero */}
      <div className="pt-32 pb-12 px-4 sm:px-8">
        <div className="max-w-[1200px] mx-auto text-center">
          <ScrollReveal variant="fadeUp">
            <p className="text-[#2a6ff3] font-['Inter:Semi_Bold',sans-serif] font-semibold text-sm uppercase tracking-widest mb-4">
              ColdNerd Blog
            </p>
            <h1 className="font-['Inter:Bold',sans-serif] font-bold text-[#0d0d0d] text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6">
              Insights & Strategies for
              <br />
              Instagram Growth
            </h1>
            <p className="font-['Inter:Regular',sans-serif] text-[#5e5e5e] text-base sm:text-lg lg:text-xl max-w-[600px] mx-auto leading-relaxed">
              Tips, guides, and best practices to help you automate smarter and grow faster.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Category filter */}
      {categories.length > 2 && (
        <div className="px-4 sm:px-8 pb-10">
          <div className="max-w-[1200px] mx-auto flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                  category === c
                    ? "bg-[#2a6ff3] text-white border-[#2a6ff3]"
                    : "bg-white text-gray-600 border-gray-200 hover:border-[#2a6ff3] hover:text-[#2a6ff3]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Blog Grid */}
      <div className="px-4 sm:px-8 pb-24">
        <div className="max-w-[1200px] mx-auto">
          {posts === null ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : visible.length === 0 ? (
            <p className="text-center text-gray-500 py-20">No articles published yet. Check back soon!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {visible.map((post, i) => (
                <BlogCard key={post.id} post={post} index={i} highlighted={highlighted === post.slug} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
