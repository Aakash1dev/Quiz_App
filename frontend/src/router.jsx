import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import DashboardLayout from "@/layouts/DashboardLayout";
import WebsiteLayout from "@/layouts/WebsiteLayout";
import { Brain } from "lucide-react";

// Page Loader component for smooth route transitions
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh] w-full">
    <div className="flex flex-col items-center space-y-3">
      <Brain className="h-10 w-10 animate-bounce text-[#10bc00]" />
      <p className="text-xs font-semibold text-slate-500">Loading module...</p>
    </div>
  </div>
);

// Lazy Loaded Page Components
const LandingPage = lazy(() => import("@/pages/Website/LandingPage"));
const Login = lazy(() => import("@/pages/Auth/Login"));
const Register = lazy(() => import("@/pages/Auth/Register"));
const Dashboard = lazy(() => import("@/pages/Dashboard/Dashboard"));
const Materials = lazy(() => import("@/pages/Materials/Materials"));
const Upload = lazy(() => import("@/pages/Materials/Upload"));
const Quizzes = lazy(() => import("@/pages/Quizzes/Quizzes"));
const GenerateQuiz = lazy(() => import("@/pages/Quizzes/GenerateQuiz"));
const TakeQuiz = lazy(() => import("@/pages/Quizzes/TakeQuiz"));
const Analytics = lazy(() => import("@/pages/Analytics/Analytics"));
const Profile = lazy(() => import("@/pages/Profile/Profile"));
const Settings = lazy(() => import("@/pages/Profile/Settings"));
const Membership = lazy(() => import("@/pages/MembershipManagement/Membership"));
const Faq = lazy(() => import("@/pages/Faq/Faq"));
const Support = lazy(() => import("@/pages/Support/Support"));
const FeedbackPage = lazy(() => import("@/pages/Feedback/FeedbackPage"));
const UserManagement = lazy(() => import("@/pages/UserManagement/UserManagement"));
const NotFound = lazy(() => import("@/pages/NotFound/NotFound"));

const withSuspense = (Component) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    element: <WebsiteLayout />,
    children: [
      {
        path: "/",
        element: withSuspense(LandingPage),
      },
    ],
  },
  {
    path: "/login",
    element: withSuspense(Login),
  },
  {
    path: "/register",
    element: withSuspense(Register),
  },
  {
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: withSuspense(Dashboard),
      },
      {
        path: "/materials",
        element: withSuspense(Materials),
      },
      {
        path: "/upload",
        element: withSuspense(Upload),
      },
      {
        path: "/quizzes",
        element: withSuspense(Quizzes),
      },
      {
        path: "/quiz/:id",
        element: withSuspense(TakeQuiz),
      },
      {
        path: "/generate-quiz",
        element: withSuspense(GenerateQuiz),
      },
      {
        path: "/analytics",
        element: withSuspense(Analytics),
      },
      {
        path: "/membership",
        element: withSuspense(Membership),
      },
      {
        path: "/faq",
        element: withSuspense(Faq),
      },
      {
        path: "/support",
        element: withSuspense(Support),
      },
      {
        path: "/feedback",
        element: withSuspense(FeedbackPage),
      },
      {
        path: "/user-management",
        element: withSuspense(UserManagement),
      },
      {
        path: "/profile",
        element: withSuspense(Profile),
      },
      {
        path: "/settings",
        element: withSuspense(Settings),
      },
    ],
  },
  {
    path: "*",
    element: withSuspense(NotFound),
  },
]);

export default router;
