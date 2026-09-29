import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchPublishedPosts, type BlogPost } from "../../lib/blog";

type Article = Pick<BlogPost, "slug" | "title" | "cover_image_url"> & { bg: string; textColor: string };

// Cards alternate light / blue in the order the manager sets in the CMS.
function toArticles(posts: BlogPost[]): Article[] {
  return posts.map((p, i) => ({
    slug: p.slug,
    title: p.title,
    cover_image_url: p.cover_image_url,
    bg: i % 2 === 0 ? "bg-[#eef4ff]" : "bg-[#2a6ff3]",
    textColor: i % 2 === 0 ? "text-gray-900" : "text-white",
  }));
}

// Swap cards in each row pair on mobile (2 columns) so colours stay checkered.
function toMobileOrder(articles: Article[]) {
  const out = [...articles];
  for (let i = 2; i + 1 < out.length; i += 4) {
    [out[i], out[i + 1]] = [out[i + 1], out[i]];
  }
  return out;
}

function CardImage({ article, className }: { article: Article; className: string }) {
  if (!article.cover_image_url) {
    return (
      <div className={`${className} rounded-xl bg-gradient-to-br from-[#6c9dff] to-[#2a6ff3] w-3/4 h-3/4 opacity-80`} />
    );
  }
  return <img src={article.cover_image_url} alt={article.title} loading="lazy" className={className} />;
}

function MobileBlogCard({ article }: { article: Article }) {
  const [tapped, setTapped] = useState(false);
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5 },
        },
      }}
      onTouchStart={() => setTapped(true)}
      onTouchEnd={() => setTimeout(() => setTapped(false), 300)}
    >
      <Link to={`/blog?highlight=${article.slug}`} className="block group no-underline h-full">
        <motion.div
          animate={tapped ? { y: -6, scale: 1.03 } : { y: 0, scale: 1 }}
          whileHover={{ y: -6, scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
          className={`${article.bg} rounded-2xl overflow-hidden shadow-sm active:shadow-lg transition-shadow duration-300 h-full flex flex-col`}
        >
          <div className="relative h-32 sm:h-56 flex items-center justify-center p-3 sm:p-6 pt-4 sm:pt-8 overflow-hidden">
            <CardImage
              article={article}
              className={`max-h-full max-w-full object-contain drop-shadow-lg transition-transform duration-500 ${tapped ? "scale-105" : ""}`}
            />
          </div>
          <div className="px-3 sm:px-6 pb-3 sm:pb-6 pt-0 mt-auto">
            <h3 className={`text-sm sm:text-lg font-semibold ${article.textColor} leading-snug line-clamp-3`}>
              {article.title}
            </h3>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export function BlogSection() {
  const [articles, setArticles] = useState<Article[] | null>(null);

  useEffect(() => {
    fetchPublishedPosts({ featuredOnly: true, limit: 6, ordering: "manual" }).then((posts) =>
      setArticles(toArticles(posts))
    );
  }, []);

  if (articles !== null && articles.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-[#2a6ff3] text-sm font-medium mb-4">
            Blog &amp; Resources
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Learn, Grow &amp; Automate
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Expert guides on Instagram growth, DM automation, and scaling outreach
          </p>
        </motion.div>

        {articles === null ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-44 sm:h-72 rounded-2xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            {/* Blog Grid - Desktop (lg+) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
              className="hidden lg:grid grid-cols-3 gap-8"
            >
              {articles.map((article) => (
                <motion.div
                  key={article.slug}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5 },
                    },
                  }}
                >
                  <Link to={`/blog?highlight=${article.slug}`} className="block group no-underline h-full">
                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`${article.bg} rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col`}
                    >
                      <div className="relative h-56 flex items-center justify-center p-6 pt-8 overflow-hidden">
                        <CardImage
                          article={article}
                          className="max-h-full max-w-full object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="px-6 pb-6 pt-0 mt-auto">
                        <h3 className={`text-lg font-semibold ${article.textColor} leading-snug line-clamp-3`}>
                          {article.title}
                        </h3>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Blog Grid - Mobile (< lg) with swapped middle cards + tap hover */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
              className="grid grid-cols-2 gap-3 sm:gap-6 lg:hidden"
            >
              {toMobileOrder(articles).map((article) => (
                <MobileBlogCard key={article.slug} article={article} />
              ))}
            </motion.div>
          </>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 text-gray-700 hover:border-[#2a6ff3] hover:text-[#2a6ff3] transition-colors font-medium no-underline"
          >
            View All Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
