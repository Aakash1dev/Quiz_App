import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { BrainCircuit, LogIn } from "lucide-react";
const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate login (would connect to backend in full implementation)
        setTimeout(() => {
            setIsLoading(false);
            localStorage.setItem("user", JSON.stringify({ email, name: email.split("@")[0] }));
            toast({
                title: "Login successful",
                description: "Welcome back to EduVisio!",
            });
            navigate("/dashboard");
        }, 1500);
    };
    const handleGuestLogin = () => {
        setIsLoading(true);
        // Simulate guest login
        setTimeout(() => {
            setIsLoading(false);
            localStorage.setItem("user", JSON.stringify({ email: "guest@eduvisio.com", name: "Guest User" }));
            toast({
                title: "Guest login successful",
                description: "Welcome to EduVisio!",
            });
            navigate("/dashboard");
        }, 1000);
    };
    return (<Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-2">
          <BrainCircuit className="h-10 w-10 text-brand-600"/>
        </div>
        <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
        <CardDescription className="text-center">
          Login to your EduVisio account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link to="/forgot-password" className="text-sm text-brand-600 hover:text-brand-700">
                Forgot password?
              </Link>
            </div>
            <Input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
            <LogIn className="ml-2 h-4 w-4"/>
          </Button>
        </form>
        <div className="mt-4 text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300"/>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or</span>
            </div>
          </div>
          <Button variant="outline" className="mt-4 w-full" onClick={handleGuestLogin} disabled={isLoading}>
            Continue as Guest
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-brand-600 hover:text-brand-700 font-medium">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>);
};
export default LoginForm;
