import { useState, useEffect } from "react";
import { UserDashboard } from "@/components/dashboard/UserDashboard";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";

export const Dashboard = () => {
  const [role, setRole] = useState<"user" | "admin">("user");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const u = JSON.parse(storedUser);
        if (u.role === "admin") {
          setRole("admin");
        } else {
          setRole("user");
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  return (
    <div className={`container mx-auto pb-10 transition-colors ${role === "admin" ? "admin-theme" : ""}`}>
      {role === "admin" ? <AdminDashboard /> : <UserDashboard />}
    </div>
  );
};

export default Dashboard;
