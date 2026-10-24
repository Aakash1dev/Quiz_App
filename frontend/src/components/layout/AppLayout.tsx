import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const AppLayout: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user) {
            navigate("/login");
        } else {
            setIsAuthenticated(true);
            try {
                const u = JSON.parse(user);
                setIsAdmin(u.role === "admin");
            } catch {
                setIsAdmin(false);
            }
        }
    }, [navigate]);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className={`flex h-screen overflow-hidden ${isAdmin ? "admin-theme" : ""}`}>
            <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}/>
            <div className="flex flex-col flex-1 overflow-hidden">
                <Header toggleSidebar={toggleSidebar}/>
                <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
