import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Materials from "./pages/Materials";
import Upload from "./pages/Upload";
import Quizzes from "./pages/Quizzes";
import GenerateQuiz from "./pages/GenerateQuiz";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import TakeQuiz from "./pages/TakeQuiz";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/materials",
        element: <Materials />,
      },
      {
        path: "/upload",
        element: <Upload />,
      },
      {
        path: "/quizzes",
        element: <Quizzes />,
      },
      {
        path: "/quiz/:id",
        element: <TakeQuiz />,
      },
      {
        path: "/generate-quiz",
        element: <GenerateQuiz />,
      },
      {
        path: "/analytics",
        element: <Analytics />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/settings",
        element: <Profile />,
      },
    ],

  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <RouterProvider router={router} />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
