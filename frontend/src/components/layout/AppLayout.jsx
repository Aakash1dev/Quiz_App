import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
const AppLayout = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user) {
            navigate("/login");
        }
        else {
            setIsAuthenticated(true);
        }
    }, [navigate]);
    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };
    if (!isAuthenticated) {
        return null;
    }
    return (<div className="flex h-screen overflow-hidden">
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}/>
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header toggleSidebar={toggleSidebar}/>
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          <Outlet />
        </main>
      </div>
    </div>);
};
export default AppLayout;
