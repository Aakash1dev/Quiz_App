import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";

export const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/dashboard");
    }
    const params = new URLSearchParams(location.search);
    if (params.get("guest") === "true") {
      localStorage.setItem("user", JSON.stringify({ email: "guest@eduvisio.com", name: "Guest User", role: "user" }));
      navigate("/dashboard");
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <LoginForm />
    </div>
  );
};

export default Login;
