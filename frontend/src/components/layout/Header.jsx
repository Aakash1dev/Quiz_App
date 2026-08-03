import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, Menu, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Header = ({ toggleSidebar }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <header className="border-b bg-white py-3 px-4 flex items-center justify-between">
            <div className="flex items-center">
                <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
                    <Menu className="h-5 w-5"/>
                </Button>
                <div className="relative max-w-md w-full hidden md:block">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500"/>
                    <Input type="search" placeholder="Search materials, quizzes..." className="pl-8 bg-gray-50 border-gray-200 w-full"/>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5"/>
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </Button>
                <Link to="/profile" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                    <Avatar className="h-8 w-8 cursor-pointer">
                        <AvatarImage src=""/>
                        <AvatarFallback className="bg-brand-100 text-brand-700">
                            {user?.name?.slice(0, 2).toUpperCase() || 'U'}
                        </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block">
                        <p className="text-sm font-medium">{user?.name || 'User'}</p>
                    </div>
                </Link>
            </div>
        </header>
    );
};

export default Header;
