import { useState, useEffect } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  BarChart3,
  BrainCircuit,
  FileUp,
  Home,
  Library,
  LogOut,
  User,
  Brain,
  Crown,
  HelpCircle,
  LifeBuoy,
  MessageSquare,
  Bell,
  Users,
  ShieldCheck
} from "lucide-react";
import { getAdminNotifications } from "@/lib/adminStore";

interface SidebarProps {
    isCollapsed: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleSidebar }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [unreadCount, setUnreadCount] = useState(0);
    const [user, setUser] = useState(null);

    useEffect(() => {
        try {
            const stored = localStorage.getItem("user");
            if (stored) {
                setUser(JSON.parse(stored));
            }
            const notifs = getAdminNotifications();
            setUnreadCount(notifs.filter(n => !n.isRead).length);
        } catch (e) {
            console.error(e);
        }
    }, [location.pathname]);

    const isAdmin = user?.role === "admin";

    const sidebarItems = [
        {
            title: "Dashboard",
            icon: Home,
            href: "/dashboard",
        },
        ...(isAdmin ? [
            {
                title: "Admin Alerts",
                icon: Bell,
                href: "/admin/notifications",
                badge: unreadCount > 0 ? unreadCount : null,
                badgeColor: "bg-[#f97316]",
            },
            {
                title: "User Directory",
                icon: Users,
                href: "/user-management",
            }
        ] : []),
        {
            title: "Learning Materials",
            icon: Library,
            href: "/materials",
        },
        {
            title: "Upload Content",
            icon: FileUp,
            href: "/upload",
        },
        {
            title: "My Quizzes",
            icon: BookOpen,
            href: "/quizzes",
        },
        {
            title: "Generate Quiz",
            icon: Brain,
            href: "/generate-quiz",
        },
        {
            title: "Progress Analytics",
            icon: BarChart3,
            href: "/analytics",
        },
        {
            title: "Membership Tiers",
            icon: Crown,
            href: "/membership",
        },
        {
            title: "FAQ & Help",
            icon: HelpCircle,
            href: "/faq",
        },
        {
            title: "Support Desk",
            icon: LifeBuoy,
            href: "/support",
        },
        {
            title: "User Reviews",
            icon: MessageSquare,
            href: "/feedback",
        },
        {
            title: "Profile",
            icon: User,
            href: "/profile",
        },
    ];

    return (
        <aside className={cn("bg-sidebar border-r border-gray-200 flex flex-col justify-between transition-all duration-300", isCollapsed ? "w-16" : "w-64")}>
            <div className="px-3 py-4">
                <div className="flex items-center mb-6 justify-between">
                    {!isCollapsed && (
                        <NavLink to="/dashboard" className="flex items-center space-x-2">
                            <BrainCircuit className={cn("h-8 w-8", isAdmin ? "text-[#f97316]" : "text-[#10bc00]")}/>
                            <span className="text-xl font-bold text-slate-900">EduVisio</span>
                        </NavLink>
                    )}
                    {isCollapsed && (
                        <NavLink to="/dashboard" className="flex justify-center w-full">
                            <BrainCircuit className={cn("h-8 w-8", isAdmin ? "text-[#f97316]" : "text-[#10bc00]")}/>
                        </NavLink>
                    )}
                </div>
                <ScrollArea className="h-[calc(100vh-5rem)]">
                    <div className="space-y-1 py-2">
                        {sidebarItems.map((item) => (
                            <NavLink
                                key={item.href}
                                to={item.href}
                                className={({ isActive }) =>
                                    cn(
                                        "flex items-center w-full rounded-md text-sm font-medium transition-colors p-2.5",
                                        isCollapsed ? "justify-center" : "justify-start",
                                        isActive
                                            ? (isAdmin
                                                ? "bg-[#f97316] text-white hover:bg-[#ea580c]"
                                                : "bg-[#10bc00] text-white hover:bg-[#0b7c00]")
                                            : "text-gray-700 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                    )
                                }
                            >
                                <div className="relative flex items-center">
                                    <item.icon className={cn("h-5 w-5", isCollapsed ? "" : "mr-2")}/>
                                    {isCollapsed && item.badge && (
                                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#f97316] rounded-full animate-pulse" />
                                    )}
                                </div>
                                {!isCollapsed && (
                                    <span className="flex-1 flex items-center justify-between">
                                        <span>{item.title}</span>
                                        {item.badge && (
                                            <span className="ml-auto px-1.5 py-0.2 text-[10px] font-extrabold rounded-full bg-[#f97316] text-white shadow-sm">
                                                {item.badge}
                                            </span>
                                        )}
                                    </span>
                                )}
                            </NavLink>
                        ))}
                    </div>
                </ScrollArea>
            </div>
        </aside>
    );
};

export default Sidebar;
