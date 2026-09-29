import { Link, useParams } from "react-router";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Calendar, Check, Clock, Link2, Pencil } from "lucide-react";
import { BlogNavbar } from "../blog/BlogNavbar";
import {
  categoryClass,
  ensureBlogFonts,
  fetchPostBySlug,
  fetchPublishedPosts,
  formatPostDate,
  sanitizeHtml,
  useIsManager,
  type BlogPost as Post,
} from "../lib/blog";

function setMeta(name: string, content: string) {
  let tag = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.name = name;
    document.head.appendChild(tag);
  }
  tag.content = content;
}

export default function BlogPost() {
  const { slug = "" } = useParams();
  const [post, setPost] = useState<Post | null | undefined>(undefined);
  const [related, setRelated] = useState<Post[]>([]);
  const [copied, setCopied] = useState(false);
  const isManager = useIsManager();

  useEffect(() => {
    ensureBlogFonts();
    setPost(undefined);
    fetchPostBySlug(slug).then(setPost);
    fetchPublishedPosts().then((all) => setRelated(all.filter((p) => p.slug !== slug)));
  }, [slug]);

  useEffect(() => {
    if (!post) return;
    document.title = `${post.seo_title || post.title} - ColdNerd Blog`;
    setMeta("description", post.seo_description || post.excerpt);
  }, [post]);

  const html = useMemo(() => (post ? sanitizeHtml(post.content) : ""), [post]);

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    const same = related.filter((p) => p.category === post.category);
    const others = related.filter((p) => p.category !== post.category);
    return [...same, ...others].slice(0, 3);
  }, [related, post]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  if (post === undefined) {
    return (
      <div className="bg-white min-h-screen">
        <BlogNavbar backTo="/blog" backLabel="All Articles" />
        <div className="max-w-[760px] mx-auto px-4 pt-40 animate-pulse space-y-4">
          <div className="h-5 w-32 bg-gray-100 rounded" />
          <div className="h-12 w-full bg-gray-100 rounded" />
          <div className="h-12 w-3/4 bg-gray-100 rounded" />
          <div className="h-72 w-full bg-gray-100 rounded-2xl mt-8" />
        </div>
      </div>
    );
  }

  if (post === null) {
    return (
      <div className="bg-[#f8fbff] min-h-screen">
        <BlogNavbar backTo="/blog" backLabel="All Articles" />
        <div className="max-w-[600px] mx-auto px-4 pt-44 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Article not found</h1>
          <p className="text-gray-500 mb-8">This article may have been moved or unpublished.</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2a6ff3] text-white font-semibold no-underline hover:bg-[#1f5ccf]"
          >
            <ArrowLeft className="w-4 h-4" /> Browse all articles
          </Link>
        </div>
      </div>
    );
  }

  const isDraft = post.status !== "published" || (post.published_at && new Date(post.published_at) > new Date());

  return (
    <div className="bg-white min-h-screen w-full overflow-x-hidden">
      <BlogNavbar backTo="/blog" backLabel="All Articles" />

      {isManager && (
        <div className="fixed bottom-6 right-6 z-[90] flex items-center gap-2">
          {isDraft && (
            <span className="px-3 py-2 rounded-full bg-amber-100 text-amber-800 text-sm font-semibold shadow">
              {post.status === "draft" ? "Draft preview" : "Scheduled"} — not visible to visitors
            </span>
          )}
          {!post.id.startsWith("seed-") && (
            <Link
              to={`/admin/edit/${post.id}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#0d0d0d] text-white text-sm font-semibold shadow-lg no-underline hover:bg-black"
            >
              <Pencil className="w-4 h-4" /> Edit article
            </Link>
          )}
        </div>
      )}

      <article className="pt-32 sm:pt-36 pb-16">
        {/* Header */}
        <header className="max-w-[760px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-[#2a6ff3] no-underline mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> All articles
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryClass(post.category)}`}>
                {post.category}
              </span>
            </div>
            <h1 className="font-bold text-[#0d0d0d] text-3xl sm:text-4xl lg:text-[46px] leading-[1.15] tracking-tight mb-5">
              {post.title}
            </h1>
            {post.excerpt && <p className="text-lg sm:text-xl text-[#5e5e5e] leading-relaxed mb-7">{post.excerpt}</p>}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2a6ff3] text-white flex items-center justify-center font-bold">
                  {post.author_name.charAt(0).toUpperCase()}
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-gray-900">{post.author_name}</p>
                  <p className="text-gray-500 flex items-center gap-3">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatPostDate(post.published_at ?? post.updated_at)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.read_time_minutes} min read
                    </span>
                  </p>
                </div>
              </div>
              <button
                onClick={copyLink}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-600 hover:border-[#2a6ff3] hover:text-[#2a6ff3] transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy link"}
              </button>
            </div>
          </motion.div>
        </header>

        {/* Cover */}
        {post.cover_image_url && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-[960px] mx-auto px-4 sm:px-6 mt-10"
          >
            <div className="rounded-3xl bg-[#eef4ff] flex items-center justify-center p-8 sm:p-12 max-h-[520px] overflow-hidden">
              <img src={post.cover_image_url} alt={post.title} className="max-h-[440px] w-auto max-w-full object-contain drop-shadow-xl" />
            </div>
          </motion.div>
        )}

        {/* Body */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-[760px] mx-auto px-4 sm:px-6 mt-12"
        >
          <div className="cn-prose" dangerouslySetInnerHTML={{ __html: html }} />
        </motion.div>

        {/* CTA */}
        <div className="max-w-[760px] mx-auto px-4 sm:px-6 mt-16">
          <div className="rounded-3xl bg-[#2a6ff3] text-white p-8 sm:p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to automate your Instagram outreach?</h2>
            <p className="text-white/80 mb-6 max-w-[520px] mx-auto">
              Personalised DMs, smart follow-ups and built-in safety controls — all in one place.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-white text-[#2a6ff3] font-semibold no-underline hover:bg-blue-50 transition-colors"
            >
              Get started with ColdNerd
            </Link>
          </div>
        </div>
      </article>

      {/* Related */}
      {relatedPosts.length > 0 && (
        <section className="bg-[#f8fbff] py-16 px-4 sm:px-8">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Keep reading</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((p) => (
                <Link key={p.id} to={`/blog/${p.slug}`} className="group no-underline">
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 h-full flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <span className={`self-start text-xs font-semibold px-3 py-1 rounded-full mb-4 ${categoryClass(p.category)}`}>
                      {p.category}
                    </span>
                    <h3 className="font-bold text-gray-900 text-lg leading-snug mb-2 group-hover:text-[#2a6ff3] transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 flex-1">{p.excerpt}</p>
                    <span className="text-[#2a6ff3] font-semibold text-sm mt-4">Read article &rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
