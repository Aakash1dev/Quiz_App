import { useNavigate, NavLink } from "react-router-dom";
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
  MessageSquare
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleLogout = () => {
        localStorage.removeItem("user");
        toast({
            title: "Logged out successfully",
            description: "See you soon!",
        });
        navigate("/login");
    };

    const sidebarItems = [
        {
            title: "Dashboard",
            icon: Home,
            href: "/dashboard",
        },
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
                            <BrainCircuit className="h-8 w-8 text-[#10bc00]"/>
                            <span className="text-xl font-bold text-slate-900">EduVisio</span>
                        </NavLink>
                    )}
                    {isCollapsed && (
                        <NavLink to="/dashboard" className="flex justify-center w-full">
                            <BrainCircuit className="h-8 w-8 text-[#10bc00]"/>
                        </NavLink>
                    )}
                </div>
                <ScrollArea className="h-[calc(100vh-10rem)]">
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
                                            ? "bg-[#10bc00] text-white hover:bg-[#0b7c00]"
                                            : "text-gray-700 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                    )
                                }
                            >
                                <item.icon className={cn("h-5 w-5", isCollapsed ? "" : "mr-2")}/>
                                {!isCollapsed && <span>{item.title}</span>}
                            </NavLink>
                        ))}
                    </div>
                </ScrollArea>
            </div>
            <div className="p-3 pt-0">
                <Button
                    variant="outline"
                    onClick={handleLogout}
                    className={cn("w-full border-slate-200 text-slate-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors", isCollapsed ? "px-0 justify-center" : "")}
                >
                    <LogOut className={cn("h-4 w-4", isCollapsed ? "" : "mr-2")}/>
                    {!isCollapsed && <span>Logout</span>}
                </Button>
            </div>
        </aside>
    );
};

export default Sidebar;
