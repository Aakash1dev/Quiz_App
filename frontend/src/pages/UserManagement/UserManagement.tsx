import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Users,
  Search,
  Plus,
  Trash2,
  Filter,
  Download,
  ShieldCheck,
  UserCheck,
  UserX,
  Mail,
  MapPin,
  Clock,
  BookOpen,
  Award,
  Crown,
  Eye,
  RefreshCw
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  getAdminUsers,
  addAdminUser,
  toggleUserStatus,
  deleteAdminUser
} from "@/lib/adminStore";

export const UserManagement = () => {
  const { toast } = useToast();
  const [usersList, setUsersList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [tierFilter, setTierFilter] = useState("all");

  // User Detail Sheet/Modal State
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Add User Modal State
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState("Student");
  const [newUserTier, setNewUserTier] = useState("Free Learner");
  const [newUserLocation, setNewUserLocation] = useState("India");

  useEffect(() => {
    setUsersList(getAdminUsers());
  }, []);

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) return;

    const updated = addAdminUser({
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      role: newUserRole,
      tier: newUserTier,
      location: newUserLocation,
      lastLogin: "Just now",
      phone: "+91 90000 00000",
    });

    setUsersList(updated);
    setNewUserName("");
    setNewUserEmail("");
    setIsAddUserOpen(false);
    toast({
      title: "🎉 Account Created!",
      description: `New user "${newUserName}" added to EduVisio system.`,
    });
  };

  const handleToggleStatus = (userId) => {
    const updated = toggleUserStatus(userId);
    setUsersList(updated);
    if (selectedUser && selectedUser.id === userId) {
      setSelectedUser({
        ...selectedUser,
        status: selectedUser.status === "active" ? "suspended" : "active",
      });
    }
    toast({
      title: "User Status Updated",
      description: "User account status toggled successfully.",
    });
  };

  const handleDeleteUser = (userId) => {
    const updated = deleteAdminUser(userId);
    setUsersList(updated);
    setIsDetailOpen(false);
    toast({
      title: "User Deleted",
      description: "User account removed from database.",
    });
  };

  const handleExportCSV = () => {
    if (usersList.length === 0) return;

    const headers = ["ID,Name,Email,Role,Tier,Status,QuizzesCount,JoinedDate,Location\n"];
    const rows = usersList.map(
      (u) => `"${u.id}","${u.name}","${u.email}","${u.role}","${u.tier}","${u.status}",${u.quizzesCount},"${u.joinedDate}","${u.location || ""}"`
    );

    const blob = new Blob([headers.concat(rows).join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `EduVisio_Users_Report_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();

    toast({
      title: "📥 CSV Report Downloaded",
      description: `Exported ${usersList.length} user records.`,
    });
  };

  const filteredUsers = usersList.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role.toLowerCase() === roleFilter.toLowerCase();
    const matchesStatus = statusFilter === "all" || u.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesTier = tierFilter === "all" || (u.tier && u.tier.toLowerCase().includes(tierFilter.toLowerCase()));
    return matchesSearch && matchesRole && matchesStatus && matchesTier;
  });

  return (
    <div className="container mx-auto space-y-8 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3.5 bg-orange-50 border border-orange-200 rounded-2xl flex items-center justify-center shrink-0 h-14 w-14">
            <Users className="h-7 w-7 text-[#f97316]" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 leading-tight">
              User Management &amp; Directory
            </h1>
            <p className="text-slate-500 text-xs md:text-sm mt-1">
              Manage accounts, roles, subscription tiers, active sessions, and access permissions.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button onClick={handleExportCSV} variant="outline" size="sm" className="text-xs">
            <Download className="h-4 w-4 mr-1.5" /> Export CSV
          </Button>
          <Button
            onClick={() => setIsAddUserOpen(true)}
            className="bg-[#f97316] hover:bg-[#ea580c] text-white text-xs font-semibold"
          >
            <Plus className="h-4 w-4 mr-1.5" /> Add New User
          </Button>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-white text-xs"
              />
            </div>

            {/* Role Filter */}
            <div>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full h-9 rounded-md border border-slate-200 bg-white px-3 text-xs font-medium"
              >
                <option value="all">All Roles</option>
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
                <option value="super admin">Super Admin</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full h-9 rounded-md border border-slate-200 bg-white px-3 text-xs font-medium"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active Only</option>
                <option value="suspended">Suspended Only</option>
              </select>
            </div>

            {/* Tier Filter */}
            <div>
              <select
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value)}
                className="w-full h-9 rounded-md border border-slate-200 bg-white px-3 text-xs font-medium"
              >
                <option value="all">All Subscription Tiers</option>
                <option value="free">Free Learner</option>
                <option value="pro">Pro Student</option>
                <option value="elite">Elite Scholar</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="py-4 px-5 border-b border-slate-100 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-bold text-slate-900">User Directory ({filteredUsers.length})</CardTitle>
            <CardDescription className="text-xs">Live system user list with quick actions.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-semibold uppercase text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">User Details</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Subscription Tier</th>
                  <th className="py-3 px-4 text-center">Quizzes</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Joined Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-bold text-slate-900">{u.name}</p>
                        <p className="text-[11px] text-slate-500">{u.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        className={
                          u.role === "Super Admin" || u.role === "admin"
                            ? "bg-[#f97316] text-white"
                            : u.role === "Instructor"
                            ? "bg-purple-600 text-white"
                            : "bg-slate-200 text-slate-700"
                        }
                      >
                        {u.role}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-800">
                      <span className="inline-flex items-center gap-1">
                        <Crown className="h-3.5 w-3.5 text-amber-500" />
                        {u.tier || "Free Learner"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-slate-900">{u.quizzesCount}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center text-[10px] font-bold rounded-full px-2.5 py-0.5 ${
                          u.status === "active" ? "text-emerald-700 bg-emerald-100" : "text-red-700 bg-red-100"
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500">{u.joinedDate}</td>
                    <td className="py-3 px-4 text-right space-x-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedUser(u);
                          setIsDetailOpen(true);
                        }}
                        className="h-7 text-xs border-slate-200"
                      >
                        <Eye className="h-3.5 w-3.5 mr-1 text-slate-500" /> Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleStatus(u.id)}
                        className="h-7 text-xs border-slate-200"
                      >
                        {u.status === "active" ? "Suspend" : "Activate"}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteUser(u.id)}
                        className="h-7 w-7 text-slate-400 hover:text-red-600"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* User Detail Sheet Modal */}
      {selectedUser && (
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-[#f97316]" /> User Profile &amp; Audit Log
              </DialogTitle>
              <DialogDescription className="text-xs">
                Detailed account overview and management actions for {selectedUser.name}.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">{selectedUser.name}</h3>
                    <p className="text-slate-500">{selectedUser.email}</p>
                  </div>
                  <Badge className="bg-[#f97316] text-white">{selectedUser.role}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 text-slate-700">
                  <div className="flex items-center gap-2">
                    <Crown className="h-4 w-4 text-amber-500" />
                    <span>Tier: <strong>{selectedUser.tier || "Free Learner"}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <span>Location: <strong>{selectedUser.location || "India"}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-purple-500" />
                    <span>Last Active: <strong>{selectedUser.lastLogin || "Recently"}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-emerald-500" />
                    <span>Quizzes: <strong>{selectedUser.quizzesCount}</strong></span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <Button
                  variant="outline"
                  onClick={() => handleToggleStatus(selectedUser.id)}
                  className="text-xs"
                >
                  {selectedUser.status === "active" ? "Suspend Account" : "Activate Account"}
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteUser(selectedUser.id)}
                  className="text-xs"
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Add User Modal */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-slate-900">Add New User Account</DialogTitle>
            <DialogDescription className="text-xs">Create a new user account with assigned role and subscription tier.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddUser} className="space-y-3 text-xs py-2">
            <div className="space-y-1">
              <Label htmlFor="nu-name">Full Name</Label>
              <Input id="nu-name" placeholder="Jane Doe" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} required />
            </div>

            <div className="space-y-1">
              <Label htmlFor="nu-email">Email Address</Label>
              <Input id="nu-email" type="email" placeholder="jane@example.com" value={newUserEmail} onChange={(e) => setNewUserEmail(e.target.value)} required />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="nu-role">Assigned Role</Label>
                <select id="nu-role" value={newUserRole} onChange={(e) => setNewUserRole(e.target.value)} className="w-full h-9 rounded-md border border-slate-200 bg-white px-3 text-xs font-medium">
                  <option value="Student">Student</option>
                  <option value="Instructor">Instructor</option>
                  <option value="Super Admin">Super Admin</option>
                </select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="nu-tier">Subscription Tier</Label>
                <select id="nu-tier" value={newUserTier} onChange={(e) => setNewUserTier(e.target.value)} className="w-full h-9 rounded-md border border-slate-200 bg-white px-3 text-xs font-medium">
                  <option value="Free Learner">Free Learner</option>
                  <option value="Pro Student">Pro Student</option>
                  <option value="Elite Scholar">Elite Scholar</option>
                </select>
              </div>
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsAddUserOpen(false)}>Cancel</Button>
              <Button type="submit" size="sm" className="bg-[#f97316] hover:bg-[#ea580c] text-white">Create User</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
