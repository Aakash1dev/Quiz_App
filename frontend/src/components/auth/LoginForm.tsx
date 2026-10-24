import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { BrainCircuit, LogIn, Eye, EyeOff, Loader2 } from "lucide-react";
import { getAdminUsers } from "@/lib/adminStore";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLoginProcess = (userEmail: string, userName: string, role: "user" | "admin", provider = "Email", token?: string) => {
    const userObj = {
      email: userEmail.toLowerCase(),
      name: userName || userEmail.split("@")[0],
      role: role === "admin" ? "admin" : "user",
      provider,
      token,
    };
    localStorage.setItem("user", JSON.stringify(userObj));
    toast({
      title: `Welcome, ${userObj.name}!`,
      description: `Logged in as ${userObj.role.toUpperCase()}. Opening dashboard.`,
    });
    navigate("/dashboard");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsLoading(false);
        handleLoginProcess(data.email, data.name, data.role, "Database Auth", data.token);
        return;
      } else {
        const err = await response.json().catch(() => ({}));
        if (response.status === 401 || response.status === 403) {
          setIsLoading(false);
          toast({
            title: "Login Failed",
            description: err.message || "Invalid credentials",
            variant: "destructive",
          });
          return;
        }
      }
    } catch {
      // Backend offline or unreachable: Fallback to local user store
    }

    setTimeout(() => {
      setIsLoading(false);
      const existingUsers = getAdminUsers();
      const matched = existingUsers.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
      const role: "user" | "admin" = matched ? (matched.role === "admin" ? "admin" : "user") : (email.toLowerCase().includes("admin") ? "admin" : "user");
      const name = matched ? matched.name : email.split("@")[0];

      handleLoginProcess(email, name, role, "Email");
    }, 600);
  };

  const handleSocialLogin = (provider: string) => {
    setSocialLoading(provider);
    setTimeout(() => {
      setSocialLoading(null);
      // All social logins enter as regular 'user'
      handleLoginProcess(
        `${provider.toLowerCase()}.user@example.com`,
        `${provider} User`,
        "user",
        provider
      );
    }, 800);
  };

  return (
    <Card className="w-full max-w-md mx-auto border-slate-200/80 shadow-lg rounded-2xl bg-white">
      <CardHeader className="space-y-1 pb-4 text-center">
        <div className="flex items-center justify-center mb-1">
          <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-2xl">
            <BrainCircuit className="h-9 w-9 text-[#10bc00]" />
          </div>
        </div>
        <CardTitle className="text-2xl font-extrabold tracking-tight text-slate-900">
          Welcome to EduVisio
        </CardTitle>
        <CardDescription className="text-xs text-slate-500">
          Sign in to your learning studio or administration panel
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 pt-0">
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div className="space-y-1">
            <Label htmlFor="email" className="font-bold text-slate-800">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="e.g. admin@eduvisio.com or user@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 bg-slate-50 border-slate-200 text-xs focus:bg-white transition-all"
              required
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="font-bold text-slate-800">
                Password
              </Label>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10 bg-slate-50 border-slate-200 text-xs focus:bg-white pr-9 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#10bc00] hover:bg-[#0b7c00] text-white font-bold h-10 shadow-sm mt-2 text-xs"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying Credentials...
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" /> Sign In
              </>
            )}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase">
            <span className="bg-white px-2 text-slate-400 font-semibold">Or continue with</span>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialLogin("Google")}
            disabled={isLoading || !!socialLoading}
            className="h-9 text-[11px] font-semibold border-slate-200 hover:bg-slate-50 flex items-center justify-center gap-1.5"
          >
            <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            Google
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialLogin("Facebook")}
            disabled={isLoading || !!socialLoading}
            className="h-9 text-[11px] font-semibold border-slate-200 hover:bg-slate-50 flex items-center justify-center gap-1.5"
          >
            <svg className="h-4 w-4 shrink-0" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Facebook
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialLogin("Gmail")}
            disabled={isLoading || !!socialLoading}
            className="h-9 text-[11px] font-semibold border-slate-200 hover:bg-slate-50 flex items-center justify-center gap-1.5"
          >
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            Gmail
          </Button>
        </div>
      </CardContent>

      <CardFooter className="flex justify-center border-t border-slate-100 py-3">
        <p className="text-xs text-slate-500">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-[#0b7c00] hover:underline font-bold">
            Sign up for free
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
