import { createBrowserRouter, useLocation, useNavigate, useOutlet } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { lazy, Suspense, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Home from "../imports/Home";
import { appPageMeta, seoPageList } from "../seo/links";
import { ManagerRoute } from "../cms/ManagerRoute";

// CMS pages (and the rich-text editor) load only when a manager opens them.
const CmsLogin = lazy(() => import("../cms/CmsLogin"));
const CmsDashboard = lazy(() => import("../cms/CmsDashboard"));
const CmsEditor = lazy(() => import("../cms/CmsEditor"));

function CmsPage({ children, protect = true }: { children: React.ReactNode; protect?: boolean }) {
  const fallback = (
    <div className="min-h-screen bg-[#f5f8ff] flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-[#2a6ff3] border-t-transparent rounded-full animate-spin" />
    </div>
  );
  const page = <Suspense fallback={fallback}>{children}</Suspense>;
  return protect ? <ManagerRoute>{page}</ManagerRoute> : page;
}
import { gaPageView } from "../lib/analytics";
import { setPageMeta, usePageMeta } from "../lib/seo";

const pageVariants = {
  initial: { opacity: 0, y: 15 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -15 }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4
};

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setAuthenticated(true);
      } else {
        navigate("/signup", { replace: true });
      }
      setLoading(false);
    });
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#2a6ff3] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return authenticated ? <>{children}</> : null;
}

/** Sets the page's title / description / canonical / robots for routes whose components don't. */
function Meta({ children, ...meta }: { children: React.ReactNode } & Parameters<typeof setPageMeta>[0]) {
  usePageMeta(meta);
  return <>{children}</>;
}

function AnimatedLayout() {
  const location = useLocation();

  useEffect(() => {
    gaPageView(location.pathname + location.search);
  }, [location.pathname, location.search]);

  return (
    <AnimatePresence
      mode="wait"
      // New page starts at the top (the blog page scrolls itself to a highlighted card).
      onExitComplete={() => window.scrollTo({ top: 0, left: 0, behavior: "instant" })}
    >
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="w-full min-h-screen relative"
      >
        <FrozenOutlet />
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Keeps rendering the page this wrapper was created for. Without this, the
 * page that is fading out would switch to the *next* route's content mid-exit
 * and that page's own animations could stall the transition (blank screen).
 */
function FrozenOutlet() {
  const outlet = useOutlet();
  const [frozen] = useState(outlet);
  return frozen;
}

/**
 * Every page except the homepage is downloaded only when it's opened, so phones
 * get a much smaller first download. react-router loads the page before it
 * navigates, so page transitions look the same. After the homepage has loaded,
 * the other pages are fetched in the background (see preloadPages).
 */
const pages = {
  dashboard: () => import("../imports/Frame1000005560"),
  login: () => import("../imports/Login"),
  signup: () => import("../imports/Signup"),
  blog: () => import("../imports/Blog"),
  blogPost: () => import("../imports/BlogPost"),
  seoPage: () => import("../imports/SeoPage"),
  pricing: () => import("../imports/Pricing"),
  terms: () => import("../imports/TermsAndConditions"),
  notFound: () => import("../imports/NotFound"),
};

const lazyElement =
  <P,>(load: () => Promise<{ default: React.ComponentType<P> }>, render: (Page: React.ComponentType<P>) => React.ReactNode) =>
  async () => ({ element: render((await load()).default) });

/** Fetches the other pages once the browser is idle, so later clicks open instantly. */
export function preloadPages() {
  const run = () => Object.values(pages).forEach((load) => load().catch(() => {}));
  if ("requestIdleCallback" in window) window.requestIdleCallback(run, { timeout: 8000 });
  else setTimeout(run, 4000);
}

export const router = createBrowserRouter([
  {
    element: <AnimatedLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        lazy: lazyElement(pages.dashboard, (Dashboard) => <Meta title="Dashboard demo - ColdNerd" noindex><Dashboard /></Meta>),
      },
      {
        path: "/login",
        lazy: lazyElement(pages.login, (Login) => <Meta {...appPageMeta.login}><Login /></Meta>),
      },
      {
        path: "/blog",
        lazy: lazyElement(pages.blog, (Blog) => <Blog />),
      },
      {
        path: "/blog/:slug",
        lazy: lazyElement(pages.blogPost, (BlogPost) => <BlogPost />),
      },
      // SEO landing pages (/instagram-outreach, /for-agencies, …)
      ...seoPageList.map((p) => ({ path: `/${p.slug}`, lazy: lazyElement(pages.seoPage, (SeoPage) => <SeoPage slug={p.slug} />) })),
      {
        path: "/admin/login",
        element: <CmsPage protect={false}><CmsLogin /></CmsPage>,
      },
      {
        path: "/admin",
        element: <CmsPage><CmsDashboard /></CmsPage>,
      },
      {
        path: "/admin/new",
        element: <CmsPage><CmsEditor /></CmsPage>,
      },
      {
        path: "/admin/edit/:id",
        element: <CmsPage><CmsEditor /></CmsPage>,
      },
      {
        path: "/signup",
        lazy: lazyElement(pages.signup, (Signup) => <Meta {...appPageMeta.signup}><Signup /></Meta>),
      },
      {
        path: "/pricing",
        // Behind sign-up by the owner's choice, so kept out of search results.
        lazy: lazyElement(pages.pricing, (Pricing) => (
          <Meta {...appPageMeta.pricing}>
            <ProtectedRoute><Pricing /></ProtectedRoute>
          </Meta>
        )),
      },
      {
        path: "/terms-and-conditions",
        // Public so visitors and search engines can read the Terms & Privacy Policy.
        lazy: lazyElement(pages.terms, (TermsAndConditions) => (
          <Meta {...appPageMeta["terms-and-conditions"]}>
            <TermsAndConditions />
          </Meta>
        )),
      },
      {
        path: "*",
        lazy: lazyElement(pages.notFound, (NotFound) => <NotFound />),
      },
    ],
  },
]);