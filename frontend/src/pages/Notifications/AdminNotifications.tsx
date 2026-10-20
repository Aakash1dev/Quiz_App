import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import {
  Bell,
  BellRing,
  Megaphone,
  AlertTriangle,
  ShieldAlert,
  Send,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  Pin,
  PinOff,
  Search,
  Filter,
  Users,
  Eye,
  Settings2,
  BarChart3,
  ExternalLink,
  RefreshCw,
  Sparkles,
  Download,
  Mail,
  Smartphone,
  Layers,
  Radio,
  CheckCheck,
  AlertCircle,
  HelpCircle,
  Flame,
  Wrench,
  Award,
  Crown
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
  getAdminNotifications,
  addAdminNotification,
  deleteAdminNotification,
  toggleNotificationRead,
  toggleNotificationPin,
  markAllNotificationsAsRead,
  clearAllNotifications,
  getAdminNotifSettings,
  updateAdminNotifSettings,
  getAdminUsers,
} from "@/lib/adminStore";

export const AdminNotifications = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [notifSettings, setNotifSettings] = useState(getAdminNotifSettings());
  const [activeTab, setActiveTab] = useState("inbox");

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Composer Form State
  const [composeTitle, setComposeTitle] = useState("");
  const [composeMessage, setComposeMessage] = useState("");
  const [composeType, setComposeType] = useState("announcement");
  const [composePriority, setComposePriority] = useState("high");
  const [composeAudience, setComposeAudience] = useState("All Platform Users");
  const [composeChannel, setComposeChannel] = useState("In-App Banner & Notification");
  const [composeActionLink, setComposeActionLink] = useState("/quizzes");
  const [composeScheduleType, setComposeScheduleType] = useState("now");
  const [composeScheduleDate, setComposeScheduleDate] = useState("");
  const [isSending, setIsSending] = useState(false);

  // Quick Dialog View for Notification Details
  const [selectedNotif, setSelectedNotif] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setNotifications(getAdminNotifications());
    setUsersList(getAdminUsers());
    setNotifSettings(getAdminNotifSettings());
  };

  // Stats Calculations
  const totalCount = notifications.length;
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const scheduledCount = notifications.filter((n) => n.status === "scheduled").length;
  const urgentCount = notifications.filter((n) => n.priority === "urgent").length;

  const totalDelivered = notifications.reduce((acc, curr) => acc + (curr.audienceCount || 0), 0);
  const totalReadCount = notifications.reduce((acc, curr) => acc + (curr.readCount || 0), 0);
  const overallReadRate = totalDelivered > 0 ? Math.round((totalReadCount / totalDelivered) * 100) : 88;

  // Handlers
  const handleToggleRead = (id: any, e?: any) => {
    if (e && e.stopPropagation) e.stopPropagation();
    const updated = toggleNotificationRead(id);
    setNotifications(updated);
  };

  const handleTogglePin = (id: any, e?: any) => {
    if (e && e.stopPropagation) e.stopPropagation();
    const updated = toggleNotificationPin(id);
    setNotifications(updated);
    toast({
      title: "Notification Pin Updated",
      description: "Priority status pinned to top of inbox.",
    });
  };

  const handleDelete = (id: any, e?: any) => {
    if (e && e.stopPropagation) e.stopPropagation();
    const updated = deleteAdminNotification(id);
    setNotifications(updated);
    if (selectedNotif?.id === id) setIsDetailOpen(false);
    toast({
      title: "Notification Removed",
      description: "Item deleted from notification log.",
    });
  };

  const handleMarkAllRead = () => {
    const updated = markAllNotificationsAsRead();
    setNotifications(updated);
    toast({
      title: "All Notifications Marked Read",
      description: `${unreadCount} notifications updated.`,
    });
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all notification logs?")) {
      const updated = clearAllNotifications();
      setNotifications(updated);
      toast({
        title: "Logs Cleared",
        description: "All notifications have been removed.",
      });
    }
  };

  const handleSendNotification = (e) => {
    e.preventDefault();
    if (!composeTitle.trim() || !composeMessage.trim()) {
      toast({
        title: "Validation Error",
        description: "Please provide both title and notification message.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);

    setTimeout(() => {
      let count = 1540;
      if (composeAudience.includes("Students")) count = 940;
      else if (composeAudience.includes("Instructors")) count = 120;
      else if (composeAudience.includes("Admins")) count = 5;
      else if (composeAudience.includes("Elite")) count = 310;

      const newNotif = {
        title: composeTitle.trim(),
        message: composeMessage.trim(),
        type: composeType,
        priority: composePriority,
        targetAudience: composeAudience,
        audienceCategory: composeAudience.toLowerCase().includes("student")
          ? "student"
          : composeAudience.toLowerCase().includes("admin")
          ? "admin"
          : "all",
        channel: composeChannel,
        audienceCount: count,
        readCount: 0,
        status: composeScheduleType === "schedule" ? "scheduled" : "sent",
        scheduledFor: composeScheduleType === "schedule" ? composeScheduleDate || "Scheduled Date" : null,
        actionLink: composeActionLink.trim() || "/dashboard",
        sender: "Administrator Desk",
        isRead: false,
        pinned: composePriority === "urgent",
      };

      const updated = addAdminNotification(newNotif);
      setNotifications(updated);
      setIsSending(false);

      // Reset Form
      setComposeTitle("");
      setComposeMessage("");
      setComposeActionLink("/quizzes");
      setActiveTab("inbox");

      toast({
        title: composeScheduleType === "schedule" ? "📅 Broadcast Scheduled!" : "🚀 Notification Broadcasted!",
        description: `Delivered to target audience "${composeAudience}".`,
      });
    }, 600);
  };

  const handleSettingToggle = (key) => {
    const updated = updateAdminNotifSettings({ [key]: !notifSettings[key] });
    setNotifSettings(updated);
    toast({
      title: "Automation Settings Saved",
      description: "Notification rule has been updated.",
    });
  };

  const handleExportCSV = () => {
    if (notifications.length === 0) return;

    const headers = ["ID,Title,Type,Priority,Audience,Channel,Status,AudienceCount,ReadCount,Created\n"];
    const rows = notifications.map(
      (n) =>
        `"${n.id}","${n.title.replace(/"/g, '""')}","${n.type}","${n.priority}","${n.targetAudience}","${n.channel}","${n.status}",${n.audienceCount || 0},${n.readCount || 0},"${n.createdAt}"`
    );

    const blob = new Blob([headers.concat(rows).join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `EduVisio_Notifications_Log_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();

    toast({
      title: "📥 CSV Report Downloaded",
      description: `Exported ${notifications.length} notification records.`,
    });
  };

  // Filtered Notifications List
  const filteredNotifications = notifications.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.targetAudience && item.targetAudience.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = typeFilter === "all" || item.type === typeFilter;
    const matchesPriority = priorityFilter === "all" || item.priority === priorityFilter;
    const matchesStatus =
      statusFilter === "all"
        ? true
        : statusFilter === "unread"
        ? !item.isRead
        : statusFilter === "pinned"
        ? item.pinned
        : item.status === statusFilter;

    return matchesSearch && matchesType && matchesPriority && matchesStatus;
  });

  // Sort: Pinned first, then unread, then date
  const sortedNotifications = [...filteredNotifications].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    if (!a.isRead && b.isRead) return -1;
    if (a.isRead && !b.isRead) return 1;
    return 0;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case "announcement":
        return <Megaphone className="h-4 w-4 text-orange-500" />;
      case "system_alert":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "security":
        return <ShieldAlert className="h-4 w-4 text-rose-500" />;
      case "maintenance":
        return <Wrench className="h-4 w-4 text-indigo-500" />;
      case "subscription":
        return <Crown className="h-4 w-4 text-emerald-500" />;
      case "campaign":
        return <Award className="h-4 w-4 text-purple-500" />;
      default:
        return <Bell className="h-4 w-4 text-slate-500" />;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "urgent":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-700 border border-red-200">
            <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
            URGENT
          </span>
        );
      case "high":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-100 text-orange-700 border border-orange-200">
            HIGH
          </span>
        );
      case "normal":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-700">
            NORMAL
          </span>
        );
      case "low":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600">
            LOW
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto space-y-6 animate-fadeIn pb-16">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-zinc-900 text-white p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-[#f97316]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 -bottom-10 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start md:items-center gap-4 z-10">
          <div className="relative p-3.5 bg-gradient-to-br from-[#f97316] to-amber-500 text-white rounded-2xl shadow-md shrink-0">
            <BellRing className="h-7 w-7 text-white" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[9px] font-extrabold text-white items-center justify-center">
                  {unreadCount}
                </span>
              </span>
            )}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
                Admin Notification Center
              </h1>
              <Badge className="bg-[#f97316] hover:bg-[#ea580c] text-white text-[11px] font-bold">
                BROADCAST HUB
              </Badge>
            </div>
            <p className="text-slate-300 text-xs md:text-sm max-w-2xl leading-relaxed">
              Broadcast platform announcements, deliver targeted alerts, configure automated system triggers, and monitor audience reach.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5 z-10">
          <Button
            onClick={() => setActiveTab("compose")}
            className="bg-[#f97316] hover:bg-[#ea580c] text-white font-semibold text-xs shadow-md transition-all hover:scale-105"
          >
            <Send className="h-3.5 w-3.5 mr-1.5" /> New Broadcast
          </Button>

          {unreadCount > 0 && (
            <Button
              onClick={handleMarkAllRead}
              variant="outline"
              size="sm"
              className="bg-slate-800/80 hover:bg-slate-700 text-slate-200 border-slate-700 text-xs"
            >
              <CheckCheck className="h-3.5 w-3.5 mr-1.5 text-emerald-400" /> Mark All Read
            </Button>
          )}

          <Button
            onClick={handleExportCSV}
            variant="outline"
            size="sm"
            className="bg-slate-800/80 hover:bg-slate-700 text-slate-200 border-slate-700 text-xs"
          >
            <Download className="h-3.5 w-3.5 mr-1.5" /> Export Logs
          </Button>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Notifications */}
        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-all">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Broadcasts</p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">{totalCount}</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Across {totalDelivered.toLocaleString()} recipients</p>
            </div>
            <div className="p-3 bg-orange-50 text-[#f97316] rounded-xl border border-orange-100">
              <Megaphone className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        {/* Unread Critical Alerts */}
        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-all">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Unread Alerts</p>
              <div className="flex items-center gap-2 mt-1">
                <h3 className="text-2xl font-black text-slate-900">{unreadCount}</h3>
                {urgentCount > 0 && (
                  <Badge className="bg-red-500 text-white text-[10px] py-0 px-1.5">
                    {urgentCount} Urgent
                  </Badge>
                )}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">Requiring admin attention</p>
            </div>
            <div className="p-3 bg-red-50 text-red-600 rounded-xl border border-red-100">
              <AlertCircle className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        {/* Open Rate */}
        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-all">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg Read Rate</p>
              <h3 className="text-2xl font-black text-emerald-600 mt-1">{overallReadRate}%</h3>
              <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1.5">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${overallReadRate}%` }}
                />
              </div>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
              <BarChart3 className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        {/* Scheduled Window */}
        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-all">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Scheduled Queue</p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">{scheduledCount}</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Pending automated delivery</p>
            </div>
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100">
              <Clock className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Workspace Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-3">
          <TabsList className="bg-slate-100 p-1 rounded-xl">
            <TabsTrigger value="inbox" className="text-xs font-bold gap-1.5 px-4 py-2">
              <Bell className="h-3.5 w-3.5" />
              Alert Log &amp; Inbox
              {unreadCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-[#f97316] text-white rounded-full text-[10px]">
                  {unreadCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="compose" className="text-xs font-bold gap-1.5 px-4 py-2">
              <Send className="h-3.5 w-3.5" />
              Broadcast Studio
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-xs font-bold gap-1.5 px-4 py-2">
              <Settings2 className="h-3.5 w-3.5" />
              Automation Rules
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={loadData}
              className="text-xs border-slate-200 text-slate-600 hover:text-slate-900"
            >
              <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Refresh
            </Button>
            {notifications.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAll}
                className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-3.5 w-3.5 mr-1" /> Clear Logs
              </Button>
            )}
          </div>
        </div>

        {/* TAB 1: NOTIFICATION INBOX & HISTORY */}
        <TabsContent value="inbox" className="space-y-4">
          {/* Search & Filter Controls */}
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-4 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Search titles, messages, audiences..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 bg-white text-xs"
                  />
                </div>

                {/* Type Filter */}
                <div>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-full h-9 rounded-md border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700"
                  >
                    <option value="all">All Categories</option>
                    <option value="announcement">📢 Announcements</option>
                    <option value="system_alert">⚡ System Alerts</option>
                    <option value="security">🛡️ Security Flags</option>
                    <option value="maintenance">🛠️ Maintenance</option>
                    <option value="subscription">💎 Subscriptions</option>
                    <option value="campaign">🏆 Quizzes &amp; Campaigns</option>
                  </select>
                </div>

                {/* Priority Filter */}
                <div>
                  <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="w-full h-9 rounded-md border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700"
                  >
                    <option value="all">All Priorities</option>
                    <option value="urgent">Urgent Only</option>
                    <option value="high">High Priority</option>
                    <option value="normal">Normal</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full h-9 rounded-md border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700"
                  >
                    <option value="all">All Statuses</option>
                    <option value="unread">Unread Only</option>
                    <option value="pinned">Pinned Only</option>
                    <option value="sent">Sent Delivery</option>
                    <option value="scheduled">Scheduled Queue</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications Feed */}
          {sortedNotifications.length === 0 ? (
            <Card className="border-dashed border-2 border-slate-200 py-12 text-center">
              <CardContent className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-orange-50 text-[#f97316] flex items-center justify-center mx-auto">
                  <Bell className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-slate-800">No notifications found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {searchQuery || typeFilter !== "all" || priorityFilter !== "all" || statusFilter !== "all"
                    ? "No notifications match your current filter parameters. Try clearing the filters."
                    : "No notification broadcasts have been published yet. Click New Broadcast to dispatch your first update."}
                </p>
                <Button
                  onClick={() => setActiveTab("compose")}
                  className="bg-[#f97316] hover:bg-[#ea580c] text-white text-xs mt-2"
                >
                  <Plus className="h-3.5 w-3.5 mr-1.5" /> Compose Announcement
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {sortedNotifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => {
                    setSelectedNotif(notif);
                    setIsDetailOpen(true);
                  }}
                  className={`group relative bg-white border rounded-xl p-4 sm:p-5 transition-all cursor-pointer hover:shadow-md ${
                    notif.pinned
                      ? "border-amber-300 bg-amber-50/20"
                      : !notif.isRead
                      ? "border-[#f97316]/40 bg-orange-50/10 shadow-sm"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {/* Left accent bar */}
                  <div
                    className={`absolute left-0 top-3 bottom-3 w-1.5 rounded-r-md ${
                      notif.priority === "urgent"
                        ? "bg-red-500"
                        : notif.priority === "high"
                        ? "bg-[#f97316]"
                        : notif.priority === "normal"
                        ? "bg-blue-500"
                        : "bg-slate-300"
                    }`}
                  />

                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pl-2">
                    <div className="flex items-start gap-3">
                      {/* Category Icon */}
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-white group-hover:border-slate-200 transition-colors shrink-0 mt-0.5">
                        {getTypeIcon(notif.type)}
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#ea580c] transition-colors leading-snug">
                            {notif.title}
                          </h4>

                          {/* Pinned Indicator */}
                          {notif.pinned && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                              <Pin className="h-3 w-3 fill-amber-600 text-amber-600" /> PINNED
                            </span>
                          )}

                          {/* Priority Badge */}
                          {getPriorityBadge(notif.priority)}

                          {/* Unread Dot */}
                          {!notif.isRead && (
                            <span className="inline-flex items-center text-[10px] font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded-md">
                              NEW
                            </span>
                          )}

                          {/* Status Badge */}
                          {notif.status === "scheduled" && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md">
                              <Clock className="h-3 w-3" /> SCHEDULED
                            </span>
                          )}
                        </div>

                        {/* Notification Preview Text */}
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {notif.message}
                        </p>

                        {/* Audience & Channel Metadata */}
                        <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-500">
                          <span className="inline-flex items-center gap-1 font-medium text-slate-700">
                            <Users className="h-3.5 w-3.5 text-slate-400" />
                            {notif.targetAudience}
                            {notif.audienceCount ? ` (${notif.audienceCount.toLocaleString()})` : ""}
                          </span>

                          <span className="text-slate-300">•</span>

                          <span className="inline-flex items-center gap-1">
                            <Radio className="h-3.5 w-3.5 text-slate-400" />
                            {notif.channel || "In-App Notification"}
                          </span>

                          <span className="text-slate-300">•</span>

                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-slate-400" />
                            {notif.createdAt}
                          </span>

                          {notif.scheduledFor && (
                            <>
                              <span className="text-slate-300">•</span>
                              <span className="text-indigo-600 font-semibold">
                                Fires: {notif.scheduledFor}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Quick Item Actions */}
                    <div
                      className="flex items-center gap-1.5 self-end sm:self-center shrink-0 pt-2 sm:pt-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => handleTogglePin(notif.id, e)}
                        title={notif.pinned ? "Unpin notification" : "Pin notification"}
                        className={`h-8 w-8 ${
                          notif.pinned
                            ? "text-amber-600 hover:text-amber-700 bg-amber-50"
                            : "text-slate-400 hover:text-slate-700"
                        }`}
                      >
                        {notif.pinned ? <PinOff className="h-4 w-4" /> : <Pin className="h-4 w-4" />}
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => handleToggleRead(notif.id, e)}
                        title={notif.isRead ? "Mark as unread" : "Mark as read"}
                        className={`h-8 w-8 ${
                          !notif.isRead ? "text-[#f97316] hover:bg-orange-50" : "text-slate-400 hover:text-slate-700"
                        }`}
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => handleDelete(notif.id, e)}
                        title="Delete notification"
                        className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* TAB 2: BROADCAST COMPOSER STUDIO */}
        <TabsContent value="compose" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 7 Cols: Composition Form */}
            <div className="lg:col-span-7">
              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-orange-100 text-[#ea580c] rounded-lg">
                      <Megaphone className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-base font-bold text-slate-900">
                        Create Platform Broadcast
                      </CardTitle>
                      <CardDescription className="text-xs">
                        Configure target recipients, broadcast channels, and message content.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <form onSubmit={handleSendNotification} className="space-y-5 text-xs">
                    {/* Announcement Title */}
                    <div className="space-y-1.5">
                      <Label htmlFor="c-title" className="text-xs font-semibold text-slate-700">
                        Announcement Headline / Title <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="c-title"
                        placeholder="e.g. ⚡ System Upgrade: Gemini 2.0 Integration Live"
                        value={composeTitle}
                        onChange={(e) => setComposeTitle(e.target.value)}
                        className="text-xs h-10"
                        required
                      />
                    </div>

                    {/* Category & Priority Selector Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="c-type" className="text-xs font-semibold text-slate-700">
                          Category / Notification Type
                        </Label>
                        <select
                          id="c-type"
                          value={composeType}
                          onChange={(e) => setComposeType(e.target.value)}
                          className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700"
                        >
                          <option value="announcement">📢 General Announcement</option>
                          <option value="system_alert">⚡ System Incident / Alert</option>
                          <option value="maintenance">🛠️ Scheduled Maintenance</option>
                          <option value="security">🛡️ Security &amp; Policy Notice</option>
                          <option value="campaign">🏆 Quiz Challenge &amp; Rewards</option>
                          <option value="subscription">💎 Membership &amp; Offers</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="c-prio" className="text-xs font-semibold text-slate-700">
                          Priority Urgency Level
                        </Label>
                        <select
                          id="c-prio"
                          value={composePriority}
                          onChange={(e) => setComposePriority(e.target.value)}
                          className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700"
                        >
                          <option value="urgent">🚨 Urgent (Sticky Banner &amp; Red Flag)</option>
                          <option value="high">🔥 High Priority (Prominent Toast)</option>
                          <option value="normal">🔹 Normal Priority</option>
                          <option value="low">💤 Low Priority (Silent Feed)</option>
                        </select>
                      </div>
                    </div>

                    {/* Target Audience & Delivery Channel */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="c-aud" className="text-xs font-semibold text-slate-700">
                          Target Audience Segment
                        </Label>
                        <select
                          id="c-aud"
                          value={composeAudience}
                          onChange={(e) => setComposeAudience(e.target.value)}
                          className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700"
                        >
                          <option value="All Platform Users">👥 All Platform Users (1,540+)</option>
                          <option value="All Students">🎓 Students &amp; Learners Only (940)</option>
                          <option value="Instructors & Teachers">👨‍🏫 Instructors &amp; Educators (120)</option>
                          <option value="Elite & Pro Subscribers">💎 Pro &amp; Elite Members (310)</option>
                          <option value="Free Tier Learners">🌱 Free Tier Learners Only (630)</option>
                          <option value="Super Admins">🛡️ System Administrators Only (5)</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="c-chan" className="text-xs font-semibold text-slate-700">
                          Delivery Channel
                        </Label>
                        <select
                          id="c-chan"
                          value={composeChannel}
                          onChange={(e) => setComposeChannel(e.target.value)}
                          className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700"
                        >
                          <option value="In-App Banner & Notification">In-App Notification &amp; Bell</option>
                          <option value="Global Sticky Dashboard Banner">Global Sticky Header Banner</option>
                          <option value="In-App Toast & Audio Alert">In-App Toast &amp; Chime</option>
                          <option value="Simulated Email Dispatch">Simulated Email &amp; Digest</option>
                        </select>
                      </div>
                    </div>

                    {/* Action Call to Action Link */}
                    <div className="space-y-1.5">
                      <Label htmlFor="c-act" className="text-xs font-semibold text-slate-700">
                        Target Page CTA Link (Optional)
                      </Label>
                      <Input
                        id="c-act"
                        placeholder="e.g. /quizzes, /generate-quiz, /membership, /support"
                        value={composeActionLink}
                        onChange={(e) => setComposeActionLink(e.target.value)}
                        className="text-xs h-10"
                      />
                    </div>

                    {/* Schedule Selector */}
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-slate-900 text-xs">Dispatch Scheduling</p>
                          <p className="text-[11px] text-slate-500">Send immediately or queue for future delivery</p>
                        </div>
                        <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-slate-200">
                          <button
                            type="button"
                            onClick={() => setComposeScheduleType("now")}
                            className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                              composeScheduleType === "now"
                                ? "bg-[#f97316] text-white shadow-sm"
                                : "text-slate-600 hover:text-slate-900"
                            }`}
                          >
                            Send Now
                          </button>
                          <button
                            type="button"
                            onClick={() => setComposeScheduleType("schedule")}
                            className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                              composeScheduleType === "schedule"
                                ? "bg-[#f97316] text-white shadow-sm"
                                : "text-slate-600 hover:text-slate-900"
                            }`}
                          >
                            Schedule
                          </button>
                        </div>
                      </div>

                      {composeScheduleType === "schedule" && (
                        <div className="pt-2 animate-fadeIn space-y-1">
                          <Label htmlFor="c-sched" className="text-xs text-slate-700">
                            Schedule Date &amp; Time (UTC)
                          </Label>
                          <Input
                            id="c-sched"
                            type="datetime-local"
                            value={composeScheduleDate}
                            onChange={(e) => setComposeScheduleDate(e.target.value)}
                            className="text-xs bg-white h-9"
                          />
                        </div>
                      )}
                    </div>

                    {/* Message Body */}
                    <div className="space-y-1.5">
                      <Label htmlFor="c-msg" className="text-xs font-semibold text-slate-700">
                        Detailed Notification Message <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="c-msg"
                        rows={4}
                        placeholder="Write the comprehensive notification body here. Be concise and actionable..."
                        value={composeMessage}
                        onChange={(e) => setComposeMessage(e.target.value)}
                        className="text-xs leading-relaxed"
                        required
                      />
                    </div>

                    {/* Submit Bar */}
                    <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => {
                          setComposeTitle("");
                          setComposeMessage("");
                        }}
                        className="text-xs text-slate-500 hover:text-slate-700"
                      >
                        Reset Form
                      </Button>

                      <Button
                        type="submit"
                        disabled={isSending}
                        className="bg-[#f97316] hover:bg-[#ea580c] text-white font-bold text-xs px-6 shadow-md"
                      >
                        {isSending ? (
                          <>
                            <RefreshCw className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                            Broadcasting...
                          </>
                        ) : composeScheduleType === "schedule" ? (
                          <>
                            <Clock className="h-3.5 w-3.5 mr-1.5" />
                            Schedule Announcement
                          </>
                        ) : (
                          <>
                            <Send className="h-3.5 w-3.5 mr-1.5" />
                            Publish Broadcast Now
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Right 5 Cols: Live User Preview Card */}
            <div className="lg:col-span-5 space-y-4">
              <Card className="border-slate-200 shadow-sm sticky top-6">
                <CardHeader className="pb-3 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Eye className="h-4 w-4 text-[#f97316]" /> Live Recipient Preview
                    </CardTitle>
                    <Badge variant="outline" className="text-[10px] uppercase font-semibold">
                      In-App Simulation
                    </Badge>
                  </div>
                  <CardDescription className="text-xs">
                    This is exactly how learners and users will see this notification.
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-5 space-y-4">
                  {/* Toast Popover Style Simulation */}
                  <div className="space-y-1.5">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      User Notification Bell Item
                    </p>
                    <div className="p-4 bg-white rounded-xl border border-orange-200 shadow-md space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-orange-50 text-[#f97316] rounded-md">
                            {getTypeIcon(composeType)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-xs leading-snug">
                              {composeTitle || "Notification Headline"}
                            </p>
                            <p className="text-[10px] text-slate-400">Just now • EduVisio System Ops</p>
                          </div>
                        </div>
                        {getPriorityBadge(composePriority)}
                      </div>

                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        {composeMessage || "The notification message preview will display here in real-time as you type..."}
                      </p>

                      <div className="pt-1 flex items-center justify-between text-[10px]">
                        <span className="text-slate-400">Audience: {composeAudience}</span>
                        {composeActionLink && (
                          <span className="text-[#f97316] font-bold flex items-center gap-1 hover:underline cursor-pointer">
                            View details <ExternalLink className="h-3 w-3" />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Top Announcement Bar Simulation */}
                  <div className="space-y-1.5 pt-2">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Sticky Announcement Bar (If Urgent)
                    </p>
                    <div className="p-3 bg-gradient-to-r from-slate-900 to-zinc-900 text-white rounded-xl flex items-center justify-between gap-3 text-xs shadow-sm">
                      <div className="flex items-center gap-2 truncate">
                        <span className="px-1.5 py-0.5 bg-[#f97316] text-white rounded text-[10px] font-bold shrink-0">
                          ALERT
                        </span>
                        <span className="truncate text-[11px]">
                          {composeTitle || "Platform Notification Headline"}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#f97316] font-bold shrink-0">Click to view &rarr;</span>
                    </div>
                  </div>

                  {/* Reach Summary */}
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Estimated Reach:</span>
                      <span className="font-bold text-slate-900">
                        {composeAudience.includes("Students")
                          ? "940 Learners"
                          : composeAudience.includes("Instructors")
                          ? "120 Educators"
                          : composeAudience.includes("Admins")
                          ? "5 Admins"
                          : "1,540+ Platform Users"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Delivery Channel:</span>
                      <span className="font-semibold text-slate-800">{composeChannel}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Dispatch Mode:</span>
                      <span className="font-semibold text-emerald-600">
                        {composeScheduleType === "schedule" ? "Queued Schedule" : "Instant Push"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* TAB 3: AUTOMATION RULES & NOTIFICATION SETTINGS */}
        <TabsContent value="settings" className="space-y-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-orange-100 text-[#ea580c] rounded-lg">
                  <Settings2 className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-base font-bold text-slate-900">
                    System Automated Triggers &amp; Notification Rules
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Enable automatic background alerts triggered by user actions, billing events, and system incidents.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Rule 1 */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-500" />
                      <h4 className="font-bold text-slate-900">New User Registration Alert</h4>
                    </div>
                    <p className="text-slate-500 text-[11px] leading-relaxed">
                      Instantly notify administrators when a new user creates an account or verifies email.
                    </p>
                  </div>
                  <Switch
                    checked={notifSettings.adminNewUserAlert}
                    onCheckedChange={() => handleSettingToggle("adminNewUserAlert")}
                  />
                </div>

                {/* Rule 2 */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      <h4 className="font-bold text-slate-900">AI Engine Error &amp; Rate Limit Alarms</h4>
                    </div>
                    <p className="text-slate-500 text-[11px] leading-relaxed">
                      Send urgent admin alerts if Google Gemini API quota limits or parsing exceptions occur.
                    </p>
                  </div>
                  <Switch
                    checked={notifSettings.adminSystemErrorAlert}
                    onCheckedChange={() => handleSettingToggle("adminSystemErrorAlert")}
                  />
                </div>

                {/* Rule 3 */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-purple-500" />
                      <h4 className="font-bold text-slate-900">Support Ticket Priority Escalation</h4>
                    </div>
                    <p className="text-slate-500 text-[11px] leading-relaxed">
                      Notify admin staff whenever a user marks a support request with Urgent status.
                    </p>
                  </div>
                  <Switch
                    checked={notifSettings.adminSupportTicketAlert}
                    onCheckedChange={() => handleSettingToggle("adminSupportTicketAlert")}
                  />
                </div>

                {/* Rule 4 */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Crown className="h-4 w-4 text-emerald-500" />
                      <h4 className="font-bold text-slate-900">Subscription Upgrades &amp; Billings</h4>
                    </div>
                    <p className="text-slate-500 text-[11px] leading-relaxed">
                      Log notifications on tier upgrades, renewals, or payment failure webhooks.
                    </p>
                  </div>
                  <Switch
                    checked={notifSettings.adminSubscriptionAlert}
                    onCheckedChange={() => handleSettingToggle("adminSubscriptionAlert")}
                  />
                </div>

                {/* Rule 5 */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-orange-500" />
                      <h4 className="font-bold text-slate-900">Auto Welcome Message to Learners</h4>
                    </div>
                    <p className="text-slate-500 text-[11px] leading-relaxed">
                      Automatically dispatch an interactive onboarding greeting to newly registered students.
                    </p>
                  </div>
                  <Switch
                    checked={notifSettings.autoWelcomeUser}
                    onCheckedChange={() => handleSettingToggle("autoWelcomeUser")}
                  />
                </div>

                {/* Rule 6 */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <BellRing className="h-4 w-4 text-indigo-500" />
                      <h4 className="font-bold text-slate-900">Sound Chime on Urgent Alerts</h4>
                    </div>
                    <p className="text-slate-500 text-[11px] leading-relaxed">
                      Play an audio alert sound whenever a high priority or security notification arrives.
                    </p>
                  </div>
                  <Switch
                    checked={notifSettings.soundEnabled}
                    onCheckedChange={() => handleSettingToggle("soundEnabled")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* DETAIL MODAL FOR NOTIFICATION */}
      {selectedNotif && (
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-1">
                <div className="p-2 rounded-lg bg-orange-50 text-[#f97316]">
                  {getTypeIcon(selectedNotif.type)}
                </div>
                <DialogTitle className="text-base font-bold text-slate-900">
                  Notification Audit Details
                </DialogTitle>
              </div>
              <DialogDescription className="text-xs">
                Audit metadata, delivery analytics, and direct actions.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold text-slate-900">{selectedNotif.title}</h3>
                  {getPriorityBadge(selectedNotif.priority)}
                </div>

                <p className="text-slate-700 leading-relaxed text-xs">{selectedNotif.message}</p>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 text-slate-600 text-[11px]">
                  <div>
                    <span className="text-slate-400">Audience:</span>{" "}
                    <strong>{selectedNotif.targetAudience}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Channel:</span>{" "}
                    <strong>{selectedNotif.channel || "In-App"}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Sent Date:</span>{" "}
                    <strong>{selectedNotif.createdAt}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Read By:</span>{" "}
                    <strong>{selectedNotif.readCount || 0} users</strong>
                  </div>
                </div>
              </div>

              {selectedNotif.actionLink && (
                <div className="p-3 bg-orange-50/70 border border-orange-100 rounded-lg flex items-center justify-between text-xs">
                  <span className="text-slate-700 font-medium">Attached Action:</span>
                  <a
                    href={selectedNotif.actionLink}
                    className="font-bold text-[#ea580c] hover:underline flex items-center gap-1"
                  >
                    Open {selectedNotif.actionLink} <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}

              <DialogFooter className="flex items-center justify-between pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    handleToggleRead(selectedNotif.id);
                    setSelectedNotif({ ...selectedNotif, isRead: !selectedNotif.isRead });
                  }}
                  className="text-xs"
                >
                  {selectedNotif.isRead ? "Mark as Unread" : "Mark as Read"}
                </Button>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(selectedNotif.id)}
                  className="text-xs"
                >
                  Delete Item
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdminNotifications;
