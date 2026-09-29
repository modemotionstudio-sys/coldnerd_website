import { createBrowserRouter, RouterProvider, useLocation, useNavigate, Outlet } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { lazy, Suspense, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Home from "../imports/Home";
import Dashboard from "../imports/Frame1000005560";
import Login from "../imports/Login";
import Signup from "../imports/Signup";
import Blog from "../imports/Blog";
import BlogPost from "../imports/BlogPost";
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
import Pricing from "../imports/Pricing";
import TermsAndConditions from "../imports/TermsAndConditions";
import { gaPageView } from "../lib/analytics";

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

function AnimatedLayout() {
  const location = useLocation();

  useEffect(() => {
    gaPageView(location.pathname + location.search);
  }, [location.pathname, location.search]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="w-full min-h-screen relative"
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
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
        element: <Dashboard />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/blog/:slug",
        element: <BlogPost />,
      },
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
        element: <Signup />,
      },
      {
        path: "/pricing",
        element: <ProtectedRoute><Pricing /></ProtectedRoute>,
      },
      {
        path: "/terms-and-conditions",
        element: <ProtectedRoute><TermsAndConditions /></ProtectedRoute>,
      }
    ],
  },
]);