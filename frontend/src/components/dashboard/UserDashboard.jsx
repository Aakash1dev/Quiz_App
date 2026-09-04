import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  Layers,
  Coins,
  Tag,
  TrendingUp,
  Clock,
  BookOpen,
  FileText,
  Brain,
  Plus,
  ArrowUpRight,
  BarChart3,
  FileUp,
  CheckCircle2,
  Play
} from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export function UserDashboard() {
  const [userName, setUserName] = useState("");
  const [recentMaterials, setRecentMaterials] = useState([]);
  const [recentQuizzes, setRecentQuizzes] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const u = JSON.parse(storedUser);
        setUserName(u.name || u.email?.split("@")[0] || "Learner");
      } catch (e) {
        console.error(e);
      }
    }

    // Load recent quizzes from localStorage if available
    const userQuizzesRaw = localStorage.getItem("eduvisio_user_quizzes");
    if (userQuizzesRaw) {
      try {
        const qList = JSON.parse(userQuizzesRaw);
        if (Array.isArray(qList) && qList.length > 0) {
          setRecentQuizzes(qList.slice(0, 4));
        }
      } catch (e) {
        console.error(e);
      }
    }

    // Default mock data matching study portal
    setRecentMaterials([
      {
        id: "1",
        title: "Introduction to Machine Learning",
        type: "PDF Document",
        icon: FileText,
        lastAccessed: "2 hours ago",
        progress: 75,
      },
      {
        id: "2",
        title: "Advanced JavaScript & ES6 Concepts",
        type: "Video Lecture",
        icon: Play,
        lastAccessed: "Yesterday",
        progress: 45,
      },
      {
        id: "3",
        title: "Data Structures & Algorithms Notes",
        type: "Study Notes",
        icon: FileText,
        lastAccessed: "3 days ago",
        progress: 90,
      },
    ]);
  }, []);

  const subjectData = [
    { name: "Computer Science", value: 45, color: "#10bc00" },
    { name: "Mathematics", value: 25, color: "#0b7c00" },
    { name: "Language & Literature", value: 18, color: "#3b82f6" },
    { name: "General Science", value: 12, color: "#8b5cf6" },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Studio Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3.5 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center shadow-sm shrink-0 h-14 w-14">
            <LayoutDashboard className="h-7 w-7 text-[#10bc00]" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Learner &amp; Study Studio
            </h1>
            <p className="text-slate-500 text-xs md:text-sm mt-1">
              Welcome back, <span className="font-semibold text-slate-800">{userName || "Learner"}</span>! Manage your collection materials, track quiz scores, and analyze progress.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link to="/generate-quiz">
            <Button className="bg-[#10bc00] hover:bg-[#0b7c00] text-white font-semibold shadow-sm transition-colors">
              <Brain className="h-4 w-4 mr-2" /> AI Quiz Generator
            </Button>
          </Link>
          <Link to="/upload">
            <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 font-medium">
              <Plus className="h-4 w-4 mr-1.5" /> Upload Material
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Materials in Collection",
            value: "24 Items",
            change: "+3 this week",
            icon: <Layers className="h-4 w-4 text-[#10bc00]" />,
          },
          {
            title: "Average Quiz Accuracy",
            value: "82.5%",
            change: "+5.2% Score",
            icon: <Coins className="h-4 w-4 text-[#0b7c00]" />,
          },
          {
            title: "Active Quizzes Created",
            value: `${recentQuizzes.length > 0 ? recentQuizzes.length : 18} Quizzes`,
            change: "Ready to test",
            icon: <Tag className="h-4 w-4 text-[#10bc00]" />,
          },
          {
            title: "Total Study Hours",
            value: "14.5 Hours",
            change: "+2.5 hrs active",
            icon: <TrendingUp className="h-4 w-4 text-[#0b7c00]" />,
          },
        ].map((stat, idx) => (
          <div key={idx} className="rounded-xl border border-slate-100 bg-white p-5 hover:border-slate-200 transition-all shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.title}</span>
              <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-100">
                {stat.icon}
              </div>
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <span className="text-2xl font-bold font-heading text-slate-900">{stat.value}</span>
              <span className="inline-flex items-center text-[11px] font-bold rounded text-[#0b7c00] bg-[#10bc00]/10 px-2 py-0.5 border border-[#10bc00]/20">
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Graphs & Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Growth Curve Chart */}
        <div className="lg:col-span-2 rounded-xl border border-slate-100 bg-white p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Study Progress &amp; Score Curve</h2>
              <p className="text-xs text-slate-500 mt-0.5">Performance tracking of your quiz scores over time</p>
            </div>
            <span className="text-xs bg-[#10bc00]/10 text-[#0b7c00] font-bold px-2.5 py-1 rounded-full border border-[#10bc00]/20">
              Last 6 Months
            </span>
          </div>

          <div className="relative pt-4 h-[220px] w-full">
            <svg className="w-full h-full" viewBox="0 0 600 220">
              <defs>
                <linearGradient id="userChartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10bc00" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#10bc00" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Gridlines */}
              <line x1="55" y1="20" x2="575" y2="20" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="55" y1="60" x2="575" y2="60" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="55" y1="100" x2="575" y2="100" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="55" y1="140" x2="575" y2="140" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="55" y1="180" x2="575" y2="180" stroke="#e2e8f0" strokeWidth="1.5" />

              {/* Y-Axis Labels */}
              <text x="10" y="24" className="text-[11px] font-medium fill-slate-400">100%</text>
              <text x="10" y="64" className="text-[11px] font-medium fill-slate-400">75%</text>
              <text x="10" y="104" className="text-[11px] font-medium fill-slate-400">50%</text>
              <text x="10" y="144" className="text-[11px] font-medium fill-slate-400">25%</text>

              {/* Chart Line and Area */}
              <path
                d="M 55 140 Q 159 110, 263 70 T 367 85 T 471 42 T 575 25 L 575 180 L 55 180 Z"
                fill="url(#userChartGradient)"
              />
              <path
                d="M 55 140 Q 159 110, 263 70 T 367 85 T 471 42 T 575 25"
                fill="none"
                stroke="#10bc00"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Data Points */}
              <circle cx="55" cy="140" r="5" className="fill-white stroke-[#10bc00] stroke-2 cursor-pointer hover:r-7 transition-all" />
              <circle cx="159" cy="110" r="5" className="fill-white stroke-[#10bc00] stroke-2 cursor-pointer hover:r-7 transition-all" />
              <circle cx="263" cy="70" r="5" className="fill-white stroke-[#10bc00] stroke-2 cursor-pointer hover:r-7 transition-all" />
              <circle cx="367" cy="85" r="5" className="fill-white stroke-[#10bc00] stroke-2 cursor-pointer hover:r-7 transition-all" />
              <circle cx="471" cy="42" r="5" className="fill-white stroke-[#10bc00] stroke-2 cursor-pointer hover:r-7 transition-all" />
              <circle cx="575" cy="25" r="5" className="fill-white stroke-[#10bc00] stroke-2 cursor-pointer hover:r-7 transition-all" />

              {/* X-Axis Labels */}
              <text x="45" y="202" className="text-[10px] font-bold fill-slate-500">FEB</text>
              <text x="149" y="202" className="text-[10px] font-bold fill-slate-500">MAR</text>
              <text x="253" y="202" className="text-[10px] font-bold fill-slate-500">APR</text>
              <text x="357" y="202" className="text-[10px] font-bold fill-slate-500">MAY</text>
              <text x="461" y="202" className="text-[10px] font-bold fill-slate-500">JUN</text>
              <text x="565" y="202" className="text-[10px] font-bold fill-slate-500">JUL</text>
            </svg>
          </div>
        </div>

        {/* Subject Share Chart */}
        <div className="rounded-xl border border-slate-100 bg-white p-6 space-y-4 shadow-sm flex flex-col justify-between">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-lg font-bold text-slate-900">Subject Knowledge Share</h2>
            <p className="text-xs text-slate-500 mt-0.5">Distribution of study topics &amp; materials</p>
          </div>

          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={subjectData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {subjectData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            {subjectData.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-600 font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-slate-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Materials & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Learning Materials */}
        <div className="lg:col-span-2 rounded-xl border border-slate-100 bg-white p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Recent Learning Materials</h2>
              <p className="text-xs text-slate-500 mt-0.5">Continue where you left off</p>
            </div>
            <Link to="/materials">
              <Button variant="ghost" size="sm" className="text-xs text-[#0b7c00] hover:text-[#10bc00]">
                View All <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="space-y-3">
            {recentMaterials.map((item) => (
              <div key={item.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 flex items-center justify-between transition-colors">
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-lg bg-emerald-100/60 text-[#0b7c00]">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-500">{item.type} • Accessed {item.lastAccessed}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="hidden sm:block w-28">
                    <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                      <span>Progress</span>
                      <span className="font-bold text-slate-700">{item.progress}%</span>
                    </div>
                    <Progress value={item.progress} className="h-1.5 bg-slate-200" />
                  </div>
                  <Link to="/materials">
                    <Button size="sm" className="bg-[#10bc00] hover:bg-[#0b7c00] text-white text-xs h-8">
                      Continue
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Study Actions & Recent Quizzes */}
        <div className="rounded-xl border border-slate-100 bg-white p-6 space-y-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-100 pb-3 mb-4">
              <h2 className="text-lg font-bold text-slate-900">Quick Study Actions</h2>
              <p className="text-xs text-slate-500 mt-0.5">Jump directly to key activities</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link to="/generate-quiz" className="p-3 rounded-xl border border-emerald-100 bg-emerald-50/50 hover:bg-emerald-50 transition-colors flex flex-col items-center text-center">
                <Brain className="h-6 w-6 text-[#10bc00] mb-2" />
                <span className="text-xs font-bold text-slate-800">AI Quiz</span>
                <span className="text-[10px] text-slate-500 mt-0.5">Generate automatically</span>
              </Link>
              <Link to="/quizzes" className="p-3 rounded-xl border border-blue-100 bg-blue-50/50 hover:bg-blue-50 transition-colors flex flex-col items-center text-center">
                <BookOpen className="h-6 w-6 text-blue-600 mb-2" />
                <span className="text-xs font-bold text-slate-800">My Quizzes</span>
                <span className="text-[10px] text-slate-500 mt-0.5">Take saved tests</span>
              </Link>
              <Link to="/upload" className="p-3 rounded-xl border border-purple-100 bg-purple-50/50 hover:bg-purple-50 transition-colors flex flex-col items-center text-center">
                <FileUp className="h-6 w-6 text-purple-600 mb-2" />
                <span className="text-xs font-bold text-slate-800">Upload PDF</span>
                <span className="text-[10px] text-slate-500 mt-0.5">Store study materials</span>
              </Link>
              <Link to="/analytics" className="p-3 rounded-xl border border-amber-100 bg-amber-50/50 hover:bg-amber-50 transition-colors flex flex-col items-center text-center">
                <BarChart3 className="h-6 w-6 text-amber-600 mb-2" />
                <span className="text-xs font-bold text-slate-800">Analytics</span>
                <span className="text-[10px] text-slate-500 mt-0.5">View progress reports</span>
              </Link>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="h-4 w-4 text-[#10bc00]" /> Learning Goals
              </span>
              <span className="font-bold text-[#0b7c00]">4/5 Completed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
