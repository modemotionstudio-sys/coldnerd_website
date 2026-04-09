import { createBrowserRouter, RouterProvider, useLocation, useNavigate, Outlet } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Home from "../imports/Home";
import Dashboard from "../imports/Frame1000005560";
import Login from "../imports/Login";
import Signup from "../imports/Signup";
import Blog from "../imports/Blog";
import Pricing from "../imports/Pricing";
import TermsAndConditions from "../imports/TermsAndConditions";

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