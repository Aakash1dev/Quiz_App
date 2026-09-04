import { useState, useEffect } from "react";
import { UserDashboard } from "@/components/dashboard/UserDashboard";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, ShieldCheck } from "lucide-react";

export const Dashboard = () => {
  const [activeView, setActiveView] = useState("user");
  const [userRole, setUserRole] = useState("user");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const u = JSON.parse(storedUser);
        if (u.role === "admin" || u.role === "superadmin" || u.email?.includes("admin")) {
          setUserRole("admin");
          setActiveView("admin");
        } else {
          setUserRole("user");
          setActiveView("user");
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleToggleView = (view) => {
    setActiveView(view);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const u = JSON.parse(storedUser);
        u.role = view === "admin" ? "admin" : "user";
        localStorage.setItem("user", JSON.stringify(u));
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className={`container mx-auto pb-10 transition-colors ${activeView === "admin" ? "admin-theme" : ""}`}>
      {/* Top View Switcher Header Control */}
      <div className="flex items-center justify-between bg-slate-900 text-white p-3 px-5 rounded-xl mb-6 shadow-md border border-slate-800">
        <div className="flex items-center gap-3">
          <div className={`p-1.5 rounded-lg ${activeView === "admin" ? "bg-[#f97316]" : "bg-[#10bc00]"}`}>
            {activeView === "admin" ? (
              <ShieldCheck className="h-5 w-5 text-white" />
            ) : (
              <User className="h-5 w-5 text-white" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-tight">
                {activeView === "admin" ? "Admin Mode Active" : "Learner Studio Active"}
              </span>
              <Badge className={activeView === "admin" ? "bg-[#f97316] text-white" : "bg-[#10bc00] text-white"}>
                {activeView === "admin" ? "ADMIN THEME (#f97316)" : "USER THEME (#10bc00)"}
              </Badge>
            </div>
            <p className="text-[11px] text-slate-400">
              Toggle between User Dashboard and Admin Dashboard views
            </p>
          </div>
        </div>

        <div className="flex items-center bg-slate-800 p-1 rounded-lg border border-slate-700">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleToggleView("user")}
            className={`text-xs h-7 px-3 rounded-md font-semibold transition-all ${
              activeView === "user"
                ? "bg-[#10bc00] text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <User className="h-3.5 w-3.5 mr-1.5" /> Learner Dashboard
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleToggleView("admin")}
            className={`text-xs h-7 px-3 rounded-md font-semibold transition-all ${
              activeView === "admin"
                ? "bg-[#f97316] text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5 mr-1.5" /> Admin Dashboard
          </Button>
        </div>
      </div>

      {/* Render Active Dashboard */}
      {activeView === "admin" ? <AdminDashboard /> : <UserDashboard />}
    </div>
  );
};

export default Dashboard;
