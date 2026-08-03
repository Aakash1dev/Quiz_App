import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        // Check if user is already logged in
        const user = localStorage.getItem("user");
        if (user) {
            navigate("/dashboard");
        }
        // Check if this is a guest login from URL parameter
        const params = new URLSearchParams(location.search);
        if (params.get("guest") === "true") {
            localStorage.setItem("user", JSON.stringify({ email: "guest@eduvisio.com", name: "Guest User" }));
            navigate("/dashboard");
        }
    }, [location, navigate]);
    return (<div className="min-h-screen bg-gradient-to-br from-brand-50 to-accent1-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
        <h1 className="text-center text-3xl font-bold text-gray-900">
          Welcome to <span className="text-gradient">EduVisio</span>
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          AI-powered learning platform to boost your knowledge
        </p>
      </div>
      <LoginForm />
    </div>);
};
export default Login;
