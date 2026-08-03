import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "@/components/auth/RegisterForm";
const Register = () => {
    const navigate = useNavigate();
    useEffect(() => {
        // Check if user is already logged in
        const user = localStorage.getItem("user");
        if (user) {
            navigate("/dashboard");
        }
    }, [navigate]);
    return (<div className="min-h-screen bg-gradient-to-br from-brand-50 to-accent1-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
        <h1 className="text-center text-3xl font-bold text-gray-900">
          Join <span className="text-gradient">EduVisio</span> Today
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Create your account to start your learning journey
        </p>
      </div>
      <RegisterForm />
    </div>);
};
export default Register;
