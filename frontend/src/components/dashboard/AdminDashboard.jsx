import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ShieldCheck,
  Users,
  Coins,
  LayoutDashboard,
  Megaphone,
  Sliders,
  Activity,
  Layers,
  Globe,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Search,
  BookOpen,
  Brain,
  FileText,
  Palette,
  HelpCircle,
  LifeBuoy,
  MessageSquare,
  Crown,
  Trash2,
  Plus,
  Pencil,
  Send,
  Tag
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
  getSupportCategories,
  addSupportCategory,
  deleteSupportCategory,
  getAdminUsers,
  addAdminUser,
  toggleUserStatus,
  deleteAdminUser,
  getAdminFaqs,
  addAdminFaq,
  deleteAdminFaq,
  getAdminPlans,
  updateAdminPlanPrice,
  getAdminFeedback,
  respondToAdminFeedback,
  getUserTheme,
  setUserTheme,
  getAdminTheme,
  setAdminTheme,
  THEMES
} from "@/lib/adminStore";

export function AdminDashboard() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  // Dynamic Stores Data State
  const [categories, setCategories] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [faqsList, setFaqsList] = useState([]);
  const [plansList, setPlansList] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);

  // Category Manager State
  const [newCatInput, setNewCatInput] = useState("");

  // Add User Modal State
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState("Student");

  // Add FAQ State
  const [newFaqQuestion, setNewFaqQuestion] = useState("");
  const [newFaqAnswer, setNewFaqAnswer] = useState("");
  const [newFaqCategory, setNewFaqCategory] = useState("Quizzes & AI");

  // Feedback Response State
  const [feedbackResponseText, setFeedbackResponseText] = useState({});

  // Broadcast Modal State
  const [isBlastOpen, setIsBlastOpen] = useState(false);
  const [blastTitle, setBlastTitle] = useState("");
  const [blastMessage, setBlastMessage] = useState("");
  const [isBlasting, setIsBlasting] = useState(false);

  // Theme & System Config State
  const [selectedUserTheme, setSelectedUserTheme] = useState("green");
  const [selectedAdminTheme, setSelectedAdminTheme] = useState("orange");
  const [quizTimeLimit, setQuizTimeLimit] = useState(15);
  const [maxDailyQuizzes, setMaxDailyQuizzes] = useState(20);
  const [enableGuestAccess, setEnableGuestAccess] = useState(true);
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  // User Search
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setCategories(getSupportCategories());
    setUsersList(getAdminUsers());
    setFaqsList(getAdminFaqs());
    setPlansList(getAdminPlans());
    setFeedbackList(getAdminFeedback());
    setSelectedUserTheme(getUserTheme());
    setSelectedAdminTheme(getAdminTheme());
  }, []);

  // Category Handlers
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCatInput.trim()) return;
    const updated = addSupportCategory(newCatInput.trim());
    setCategories(updated);
    setNewCatInput("");
    toast({
      title: "Support Category Added",
      description: `"${newCatInput.trim()}" is now available in ticket submission forms.`,
    });
  };

  const handleDeleteCategory = (catName) => {
    const updated = deleteSupportCategory(catName);
    setCategories(updated);
    toast({
      title: "Category Deleted",
      description: `"${catName}" removed from active categories.`,
    });
  };

  // User Handlers
  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) return;
    const updated = addAdminUser({
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      role: newUserRole,
    });
    setUsersList(updated);
    setNewUserName("");
    setNewUserEmail("");
    setIsAddUserOpen(false);
    toast({
      title: "User Account Created",
      description: `Account for ${newUserName} created successfully.`,
    });
  };

  const handleToggleStatus = (userId) => {
    const updated = toggleUserStatus(userId);
    setUsersList(updated);
    toast({
      title: "Status Toggled",
      description: "User account status updated.",
    });
  };

  const handleDeleteUser = (userId) => {
    const updated = deleteAdminUser(userId);
    setUsersList(updated);
    toast({
      title: "User Deleted",
      description: "User account removed from database.",
    });
  };

  // FAQ Handlers
  const handleAddFaq = (e) => {
    e.preventDefault();
    if (!newFaqQuestion.trim() || !newFaqAnswer.trim()) return;
    const updated = addAdminFaq({
      question: newFaqQuestion.trim(),
      answer: newFaqAnswer.trim(),
      category: newFaqCategory,
    });
    setFaqsList(updated);
    setNewFaqQuestion("");
    setNewFaqAnswer("");
    toast({
      title: "FAQ Published",
      description: "New question published to knowledgebase.",
    });
  };

  const handleDeleteFaq = (faqId) => {
    const updated = deleteAdminFaq(faqId);
    setFaqsList(updated);
    toast({
      title: "FAQ Removed",
      description: "FAQ entry deleted.",
    });
  };

  // Feedback Response Handler
  const handleRespondFeedback = (fbId) => {
    const text = feedbackResponseText[fbId];
    if (!text || !text.trim()) return;
    const updated = respondToAdminFeedback(fbId, text.trim());
    setFeedbackList(updated);
    setFeedbackResponseText({ ...feedbackResponseText, [fbId]: "" });
    toast({
      title: "Response Published",
      description: "Admin comment published on user review.",
    });
  };

  const handleBroadcastAlert = (e) => {
    e.preventDefault();
    if (!blastTitle.trim() || !blastMessage.trim()) return;
    setIsBlasting(true);
    setTimeout(() => {
      setIsBlasting(false);
      setIsBlastOpen(false);
      toast({
        title: "📣 News Blast Broadcasted!",
        description: `Successfully broadcasted "${blastTitle}" to all platform users.`,
      });
      setBlastTitle("");
      setBlastMessage("");
    }, 600);
  };

  const handleSaveConfig = () => {
    setIsSavingSettings(true);
    setUserTheme(selectedUserTheme);
    setAdminTheme(selectedAdminTheme);
    setTimeout(() => {
      setIsSavingSettings(false);
      toast({
        title: "🎨 Theme & System Settings Saved!",
        description: "Global theme colors and system parameters updated successfully.",
      });
    }, 400);
  };

  const filteredUsers = usersList.filter(
    (u) => u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-theme space-y-6 animate-fadeIn">
      {/* Admin Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-orange-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3.5 bg-orange-50 border border-orange-200 rounded-2xl flex items-center justify-center shadow-sm shrink-0 h-14 w-14">
            <ShieldCheck className="h-7 w-7 text-[#f97316]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-900 leading-tight">
                EduVisio Dynamic Admin Control Panel
              </h1>
              <Badge className="bg-[#f97316] text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5">
                SUPERADMIN
              </Badge>
            </div>
            <p className="text-slate-500 text-xs md:text-sm mt-1">
              Manage platform users, ticket categories, FAQs, subscriptions, feedback reviews, and color themes.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            onClick={() => setIsBlastOpen(true)}
            className="bg-[#f97316] hover:bg-[#ea580c] text-white font-semibold shadow-sm transition-colors"
          >
            <Megaphone className="h-4 w-4 mr-2" /> Broadcast Alert
          </Button>
        </div>
      </div>

      {/* Admin Module Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 sm:grid-cols-6 w-full bg-white p-1 rounded-xl border border-slate-200">
          <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
          <TabsTrigger value="categories" className="text-xs">Categories</TabsTrigger>
          <TabsTrigger value="users" className="text-xs">User Management</TabsTrigger>
          <TabsTrigger value="faqs" className="text-xs">FAQ Manager</TabsTrigger>
          <TabsTrigger value="feedback" className="text-xs">Feedback</TabsTrigger>
          <TabsTrigger value="themes" className="text-xs">Themes &amp; Settings</TabsTrigger>
        </TabsList>

        {/* Tab 1: Overview */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Total Registered Users", value: `${usersList.length} Users`, change: "Active Accounts", icon: <Users className="h-4 w-4 text-[#f97316]" /> },
              { title: "Support Categories", value: `${categories.length} Active`, change: "Dynamic Form Options", icon: <Tag className="h-4 w-4 text-[#ea580c]" /> },
              { title: "Published FAQs", value: `${faqsList.length} Entries`, change: "Knowledgebase", icon: <HelpCircle className="h-4 w-4 text-[#f97316]" /> },
              { title: "AI System Health", value: "99.8% Active", change: "Gemini 1.5 Flash", icon: <Activity className="h-4 w-4 text-[#ea580c]" /> },
            ].map((stat, idx) => (
              <div key={idx} className="rounded-xl border border-orange-100 bg-white p-5 hover:border-orange-200 transition-all shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.title}</span>
                  <div className="p-2 rounded-lg bg-orange-50 border border-orange-100">{stat.icon}</div>
                </div>
                <div className="mt-4 flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
                  <span className="inline-flex items-center text-[11px] font-bold rounded text-[#ea580c] bg-[#f97316]/10 px-2 py-0.5 border border-[#f97316]/20">
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-orange-100 bg-white p-6 space-y-4 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Platform Usage &amp; AI Quiz Velocity</h2>
            <div className="relative pt-4 h-[200px] w-full">
              <svg className="w-full h-full" viewBox="0 0 600 200">
                <defs>
                  <linearGradient id="adminG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f97316" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#f97316" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path d="M 55 120 Q 159 80, 263 100 T 367 40 T 471 55 T 575 20 L 575 160 L 55 160 Z" fill="url(#adminG)" />
                <path d="M 55 120 Q 159 80, 263 100 T 367 40 T 471 55 T 575 20" fill="none" stroke="#f97316" strokeWidth="3.5" />
              </svg>
            </div>
          </div>
        </TabsContent>

        {/* Tab 2: Support Ticket Categories Manager */}
        <TabsContent value="categories">
          <Card className="border-orange-100 shadow-sm max-w-2xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Tag className="h-5 w-5 text-[#f97316]" /> Support Ticket Categories Manager
              </CardTitle>
              <CardDescription className="text-xs">
                Dynamically add or remove ticket categories. Added categories immediately appear in the user Support ticket dropdown!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleAddCategory} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter new category name (e.g. AI Engine Error)..."
                  value={newCatInput}
                  onChange={(e) => setNewCatInput(e.target.value)}
                  className="text-xs bg-slate-50"
                  required
                />
                <Button type="submit" className="bg-[#f97316] hover:bg-[#ea580c] text-white text-xs font-semibold shrink-0">
                  <Plus className="h-4 w-4 mr-1" /> Add Category
                </Button>
              </form>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-700">Current Support Categories ({categories.length}):</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {categories.map((cat, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                      <span className="font-semibold text-slate-800">{cat}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteCategory(cat)}
                        className="h-7 w-7 text-slate-400 hover:text-red-600"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: Dynamic User Management */}
        <TabsContent value="users">
          <Card className="border-orange-100 shadow-sm">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <CardTitle className="text-lg font-bold text-slate-900">User Management &amp; Role Control</CardTitle>
                <CardDescription className="text-xs">Create accounts, edit roles, toggle status, and delete users.</CardDescription>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Search user or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 h-9 text-xs bg-slate-50 border-slate-200"
                  />
                </div>
                <Button onClick={() => setIsAddUserOpen(true)} className="bg-[#f97316] hover:bg-[#ea580c] text-white text-xs shrink-0">
                  <Plus className="h-4 w-4 mr-1" /> Add User
                </Button>
              </div>
            </CardHeader>

            <CardContent className="pt-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-50 text-slate-700 font-semibold uppercase text-[11px] border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">User Name</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Role</th>
                      <th className="py-3 px-4 text-center">Quizzes</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4 font-semibold text-slate-900">{user.name}</td>
                        <td className="py-3 px-4 text-slate-500">{user.email}</td>
                        <td className="py-3 px-4">
                          <Badge
                            className={
                              user.role === "Super Admin" || user.role === "admin"
                                ? "bg-[#f97316] text-white"
                                : user.role === "Instructor"
                                ? "bg-purple-600 text-white"
                                : "bg-slate-200 text-slate-700"
                            }
                          >
                            {user.role}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-center font-bold text-slate-800">{user.quizzesCount}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center text-[10px] font-bold rounded-full px-2 py-0.5 ${
                              user.status === "active" ? "text-emerald-700 bg-emerald-100" : "text-red-700 bg-red-100"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right space-x-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToggleStatus(user.id)}
                            className="h-7 text-xs border-slate-200"
                          >
                            {user.status === "active" ? "Suspend" : "Activate"}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteUser(user.id)}
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
        </TabsContent>

        {/* Tab 4: Dynamic FAQ Manager */}
        <TabsContent value="faqs">
          <Card className="border-orange-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-[#f97316]" /> Dynamic FAQ Manager
              </CardTitle>
              <CardDescription className="text-xs">Publish or remove FAQ questions displayed on the user FAQ page.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 text-xs">
              <form onSubmit={handleAddFaq} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <p className="font-bold text-slate-800 text-sm">Add New FAQ Item</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="md:col-span-2 space-y-1">
                    <Label htmlFor="fq-q">Question</Label>
                    <Input
                      id="fq-q"
                      placeholder="Question text..."
                      value={newFaqQuestion}
                      onChange={(e) => setNewFaqQuestion(e.target.value)}
                      className="bg-white text-xs"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="fq-cat">Category</Label>
                    <select
                      id="fq-cat"
                      value={newFaqCategory}
                      onChange={(e) => setNewFaqCategory(e.target.value)}
                      className="w-full h-9 rounded-md border border-slate-200 bg-white px-3 text-xs"
                    >
                      <option value="Quizzes & AI">Quizzes &amp; AI</option>
                      <option value="Account & Subscriptions">Account &amp; Subscriptions</option>
                      <option value="Technical & Platform">Technical &amp; Platform</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="fq-a">Answer</Label>
                  <Textarea
                    id="fq-a"
                    placeholder="Detailed answer text..."
                    value={newFaqAnswer}
                    onChange={(e) => setNewFaqAnswer(e.target.value)}
                    className="bg-white text-xs min-h-[70px]"
                    required
                  />
                </div>

                <Button type="submit" className="bg-[#f97316] hover:bg-[#ea580c] text-white font-semibold">
                  Publish FAQ Entry
                </Button>
              </form>

              <div className="space-y-3">
                <p className="font-bold text-slate-800 text-sm">Published FAQ Items ({faqsList.length}):</p>
                {faqsList.map((f) => (
                  <div key={f.id} className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <Badge variant="outline" className="text-[10px]">{f.category}</Badge>
                      <p className="font-bold text-slate-900">{f.question}</p>
                      <p className="text-slate-600">{f.answer}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteFaq(f.id)} className="h-8 w-8 text-slate-400 hover:text-red-600 shrink-0">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 5: Dynamic Feedback Reviews Moderator */}
        <TabsContent value="feedback">
          <Card className="border-orange-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-[#f97316]" /> User Feedback &amp; Review Moderator
              </CardTitle>
              <CardDescription className="text-xs">Inspect ratings and respond to user reviews.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 text-xs">
              {feedbackList.map((fb) => (
                <div key={fb.id} className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900">{fb.user}</span>
                      <Badge variant="outline" className="ml-2 text-[10px]">{fb.category}</Badge>
                    </div>
                    <span className="font-bold text-amber-500">★ {fb.rating} / 5</span>
                  </div>

                  <p className="text-slate-700">{fb.comment}</p>

                  {fb.response ? (
                    <div className="p-2.5 bg-orange-50 border border-orange-100 rounded-lg text-orange-900">
                      <p className="font-bold text-[11px]">Admin Reply:</p>
                      <p>{fb.response}</p>
                    </div>
                  ) : (
                    <div className="flex gap-2 pt-2 border-t border-slate-100">
                      <Input
                        type="text"
                        placeholder="Type admin response..."
                        value={feedbackResponseText[fb.id] || ""}
                        onChange={(e) => setFeedbackResponseText({ ...feedbackResponseText, [fb.id]: e.target.value })}
                        className="text-xs bg-slate-50"
                      />
                      <Button size="sm" onClick={() => handleRespondFeedback(fb.id)} className="bg-[#f97316] hover:bg-[#ea580c] text-white shrink-0">
                        <Send className="h-3.5 w-3.5 mr-1" /> Respond
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 6: Themes & Settings */}
        <TabsContent value="themes" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Dashboard Color Theme Selector */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Palette className="h-5 w-5 text-[#10bc00]" /> User Dashboard Theme Color
                </CardTitle>
                <CardDescription className="text-xs">Select primary theme color for student &amp; learner dashboards.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(THEMES.USER).map(([key, item]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedUserTheme(key)}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                        selectedUserTheme === key
                          ? "border-[#10bc00] bg-emerald-50/50 shadow-sm ring-2 ring-[#10bc00]"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="h-5 w-5 rounded-full border shadow-sm shrink-0" style={{ backgroundColor: item.primary }} />
                        <span className="font-bold text-slate-800 text-xs">{item.name}</span>
                      </div>
                      {selectedUserTheme === key && <CheckCircle className="h-4 w-4 text-[#10bc00]" />}
                    </button>
                  ))}
                </div>

                {/* User UI Live Preview */}
                <div className="mt-4 p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <p className="font-bold text-slate-700 text-[11px] uppercase tracking-wider">User Dashboard Live Preview</p>
                  <div className="p-3 bg-white rounded-lg border shadow-xs flex justify-between items-center">
                    <span className="font-extrabold text-xs" style={{ color: THEMES.USER[selectedUserTheme]?.primary }}>
                      🎓 EduVisio User Portal
                    </span>
                    <button
                      type="button"
                      className="px-3 py-1 text-[11px] font-bold text-white rounded-md shadow-xs"
                      style={{ backgroundColor: THEMES.USER[selectedUserTheme]?.primary }}
                    >
                      Generate Quiz
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Admin Dashboard Color Theme Selector */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Palette className="h-5 w-5 text-[#f97316]" /> Admin Control Panel Theme
                </CardTitle>
                <CardDescription className="text-xs">Select primary theme color for superadmin &amp; instructor portal.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(THEMES.ADMIN).map(([key, item]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedAdminTheme(key)}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                        selectedAdminTheme === key
                          ? "border-[#f97316] bg-orange-50/50 shadow-sm ring-2 ring-[#f97316]"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="h-5 w-5 rounded-full border shadow-sm shrink-0" style={{ backgroundColor: item.primary }} />
                        <span className="font-bold text-slate-800 text-xs">{item.name}</span>
                      </div>
                      {selectedAdminTheme === key && <CheckCircle className="h-4 w-4 text-[#f97316]" />}
                    </button>
                  ))}
                </div>

                {/* Admin UI Live Preview */}
                <div className="mt-4 p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <p className="font-bold text-slate-700 text-[11px] uppercase tracking-wider">Admin Control Panel Live Preview</p>
                  <div className="p-3 bg-white rounded-lg border shadow-xs flex justify-between items-center">
                    <span className="font-extrabold text-xs" style={{ color: THEMES.ADMIN[selectedAdminTheme]?.primary }}>
                      🛡️ EduVisio Admin
                    </span>
                    <button
                      type="button"
                      className="px-3 py-1 text-[11px] font-bold text-white rounded-md shadow-xs"
                      style={{ backgroundColor: THEMES.ADMIN[selectedAdminTheme]?.primary }}
                    >
                      Broadcast Alert
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Parameters & Save Settings */}
          <Card className="border-orange-100 shadow-sm">
            <CardHeader className="py-3 px-5 border-b border-slate-100">
              <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sliders className="h-4 w-4 text-[#f97316]" /> Global Platform Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="py-4 px-5 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="q-time">Default Quiz Time Limit (Minutes)</Label>
                  <Input id="q-time" type="number" value={quizTimeLimit} onChange={(e) => setQuizTimeLimit(Number(e.target.value))} />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="m-quizzes">Max Daily Quizzes Per User</Label>
                  <Input id="m-quizzes" type="number" value={maxDailyQuizzes} onChange={(e) => setMaxDailyQuizzes(Number(e.target.value))} />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div>
                  <p className="font-semibold text-slate-800">Enable Guest Demo Access</p>
                  <p className="text-[11px] text-slate-500">Allow instant guest demo login buttons</p>
                </div>
                <Switch checked={enableGuestAccess} onCheckedChange={setEnableGuestAccess} />
              </div>

              <Button onClick={handleSaveConfig} disabled={isSavingSettings} className="bg-[#f97316] hover:bg-[#ea580c] text-white font-semibold w-full h-10">
                {isSavingSettings ? "Saving Settings..." : "Save Themes & System Settings"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add User Modal */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-slate-900">Add New User Account</DialogTitle>
            <DialogDescription className="text-xs">Create a new user account with assigned role.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddUser} className="space-y-3 text-xs py-2">
            <div className="space-y-1">
              <Label htmlFor="nu-name">Full Name</Label>
              <Input id="nu-name" placeholder="John Doe" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="nu-email">Email Address</Label>
              <Input id="nu-email" type="email" placeholder="john@example.com" value={newUserEmail} onChange={(e) => setNewUserEmail(e.target.value)} required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="nu-role">Assigned Role</Label>
              <select id="nu-role" value={newUserRole} onChange={(e) => setNewUserRole(e.target.value)} className="w-full h-9 rounded-md border border-slate-200 bg-white px-3 text-xs">
                <option value="Student">Student</option>
                <option value="Instructor">Instructor</option>
                <option value="Super Admin">Super Admin</option>
              </select>
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsAddUserOpen(false)}>Cancel</Button>
              <Button type="submit" size="sm" className="bg-[#f97316] hover:bg-[#ea580c] text-white">Create Account</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Broadcast Alert Dialog Modal */}
      <Dialog open={isBlastOpen} onOpenChange={setIsBlastOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <Megaphone className="h-5 w-5 text-[#f97316]" /> Broadcast System News Alert
            </DialogTitle>
            <DialogDescription className="text-xs">Send an instant announcement notification to all platform users.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleBroadcastAlert} className="space-y-4 py-2 text-xs">
            <div className="space-y-1.5">
              <Label htmlFor="blast-title">Announcement Title</Label>
              <Input id="blast-title" placeholder="e.g. New AI Model Update" value={blastTitle} onChange={(e) => setBlastTitle(e.target.value)} required />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="blast-msg">Message Body</Label>
              <Textarea id="blast-msg" placeholder="Type announcement details..." value={blastMessage} onChange={(e) => setBlastMessage(e.target.value)} className="min-h-[90px]" required />
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsBlastOpen(false)}>Cancel</Button>
              <Button type="submit" size="sm" disabled={isBlasting} className="bg-[#f97316] hover:bg-[#ea580c] text-white font-semibold">
                {isBlasting ? "Broadcasting..." : "Send Announcement"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
