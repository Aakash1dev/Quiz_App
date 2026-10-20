import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, Menu, Search, CheckCheck, ExternalLink, Megaphone, AlertTriangle, ShieldAlert, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { getAdminNotifications, markAllNotificationsAsRead } from "@/lib/adminStore";

interface HeaderProps {
    toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    const [user, setUser] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
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

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        loadNotifications();
    }, []);

    const loadNotifications = () => {
        try {
            setNotifications(getAdminNotifications());
        } catch (e) {
            console.error(e);
        }
    };

    const unreadCount = notifications.filter(n => !n.isRead).length;

    const handleMarkAllRead = () => {
        const updated = markAllNotificationsAsRead();
        setNotifications(updated);
    };

    return (
        <header className="border-b bg-white py-3 px-4 flex items-center justify-between sticky top-0 z-30">
            <div className="flex items-center">
                <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
                    <Menu className="h-5 w-5"/>
                </Button>
                <div className="relative max-w-md w-full hidden md:block">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500"/>
                    <Input type="search" placeholder="Search materials, quizzes..." className="pl-8 bg-gray-50 border-gray-200 w-full text-xs"/>
                </div>
            </div>
            <div className="flex items-center space-x-3">
                {/* Interactive Notification Popover */}
                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative text-slate-700 hover:text-slate-900"
                            aria-label="Open notifications"
                        >
                            <Bell className="h-5 w-5"/>
                            {unreadCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-4 w-4 bg-[#f97316] text-[9px] font-black text-white items-center justify-center">
                                        {unreadCount > 9 ? "9+" : unreadCount}
                                    </span>
                                </span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-80 sm:w-96 p-0 shadow-xl border-slate-200 rounded-2xl">
                        <div className="p-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 rounded-t-2xl">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-xs text-slate-900">Notifications</span>
                                {unreadCount > 0 && (
                                    <span className="px-1.5 py-0.2 bg-[#f97316] text-white text-[10px] font-bold rounded-full">
                                        {unreadCount} new
                                    </span>
                                )}
                            </div>
                            {unreadCount > 0 && (
                                <button
                                    onClick={handleMarkAllRead}
                                    className="text-[11px] text-slate-500 hover:text-[#f97316] font-medium flex items-center gap-1 transition-colors"
                                >
                                    <CheckCheck className="h-3 w-3" /> Mark all read
                                </button>
                            )}
                        </div>

                        <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                            {notifications.length === 0 ? (
                                <div className="p-6 text-center text-xs text-slate-400">
                                    No notifications yet.
                                </div>
                            ) : (
                                notifications.slice(0, 4).map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => {
                                            setIsPopoverOpen(false);
                                            navigate("/admin/notifications");
                                        }}
                                        className={`p-3 hover:bg-slate-50 transition-colors cursor-pointer flex items-start gap-2.5 text-xs ${
                                            !item.isRead ? "bg-orange-50/30" : ""
                                        }`}
                                    >
                                        <div className="p-1.5 bg-orange-100 text-[#f97316] rounded-md shrink-0 mt-0.5">
                                            {item.type === "security" ? (
                                                <ShieldAlert className="h-3.5 w-3.5 text-rose-500" />
                                            ) : item.type === "system_alert" ? (
                                                <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                                            ) : (
                                                <Megaphone className="h-3.5 w-3.5" />
                                            )}
                                        </div>
                                        <div className="space-y-0.5 flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-1">
                                                <p className="font-bold text-slate-900 text-xs truncate">
                                                    {item.title}
                                                </p>
                                                {!item.isRead && (
                                                    <span className="w-2 h-2 rounded-full bg-[#f97316] shrink-0" />
                                                )}
                                            </div>
                                            <p className="text-[11px] text-slate-500 line-clamp-1">
                                                {item.message}
                                            </p>
                                            <p className="text-[10px] text-slate-400 pt-0.5">
                                                {item.createdAt}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="p-2.5 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl text-center">
                            <Link
                                to="/admin/notifications"
                                onClick={() => setIsPopoverOpen(false)}
                                className="text-xs font-bold text-[#ea580c] hover:underline flex items-center justify-center gap-1.5 py-1"
                            >
                                Open Admin Notification Center <ExternalLink className="h-3 w-3" />
                            </Link>
                        </div>
                    </PopoverContent>
                </Popover>

                <Link to="/profile" className="flex items-center space-x-2.5 hover:opacity-80 transition-opacity">
                    <Avatar className="h-8 w-8 cursor-pointer">
                        <AvatarImage src=""/>
                        <AvatarFallback className="bg-[#10bc00]/10 text-[#0b7c00] font-bold">
                            {user?.name?.slice(0, 2).toUpperCase() || 'U'}
                        </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left leading-tight">
                        <p className="text-xs font-bold text-slate-800">{user?.name || 'User'}</p>
                        <p className="text-[10px] text-slate-500 font-medium">
                          {user?.role === 'admin' ? '🛡️ Admin Account' : '🎓 Learner Account'}
                        </p>
                    </div>
                </Link>

                <div className="h-5 w-px bg-slate-200 hidden sm:block" />

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    title="Logout"
                    className="h-8 px-2.5 text-slate-600 hover:text-red-600 hover:bg-red-50 border border-slate-200 hover:border-red-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                    <LogOut className="h-3.5 w-3.5 text-slate-500 group-hover:text-red-600" />
                </Button>
            </div>
        </header>
    );
};

export default Header;
