import { Link } from "react-router";
import { BlogNavbar } from "../blog/BlogNavbar";
import { usePageMeta } from "../lib/seo";

/** Shown for any URL that doesn't exist. Vercel also serves it with a real 404 status. */
export default function NotFound() {
  usePageMeta({ title: "Page not found - ColdNerd", noindex: true });

  return (
    <div className="bg-[#f8fbff] min-h-screen">
      <BlogNavbar />
      <main className="max-w-[600px] mx-auto px-4 pt-44 pb-24 text-center">
        <p className="text-[#2a6ff3] font-semibold text-sm uppercase tracking-widest mb-3">404</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Page not found</h1>
        <p className="text-gray-500 mb-8">The page you're looking for doesn't exist or has moved.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/" className="px-6 py-3 rounded-full bg-[#2a6ff3] text-white font-semibold no-underline hover:bg-[#1f5ccf]">
            Go to homepage
          </Link>
          <Link to="/blog" className="px-6 py-3 rounded-full border border-gray-200 bg-white text-gray-800 font-semibold no-underline hover:border-[#2a6ff3] hover:text-[#2a6ff3]">
            Read the blog
          </Link>
        </div>
      </main>
    </div>
  );
}
