// Central Admin & Platform Data Store with LocalStorage Persistence

const KEYS = {
  CATEGORIES: "eduvisio_admin_categories",
  USERS: "eduvisio_admin_users",
  FAQS: "eduvisio_admin_faqs",
  PLANS: "eduvisio_admin_plans",
  FEEDBACK: "eduvisio_admin_feedback",
  TICKETS: "eduvisio_admin_tickets",
  SETTINGS: "eduvisio_admin_settings",
  NOTIFICATIONS: "eduvisio_admin_notifications",
  NOTIF_SETTINGS: "eduvisio_admin_notif_settings",
};

// 1. SUPPORT TICKET CATEGORIES
const DEFAULT_CATEGORIES = [
  "Quiz Generation",
  "Material Upload",
  "Account & Billing",
  "Feature Request",
  "Technical Support",
  "AI Engine Error",
];

export const getSupportCategories = () => {
  try {
    const raw = localStorage.getItem(KEYS.CATEGORIES);
    return raw ? JSON.parse(raw) : DEFAULT_CATEGORIES;
  } catch (e) {
    return DEFAULT_CATEGORIES;
  }
};

export const addSupportCategory = (categoryName) => {
  try {
    const categories = getSupportCategories();
    const trimmed = categoryName.trim();
    if (!trimmed || categories.includes(trimmed)) return categories;
    const updated = [...categories, trimmed];
    localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error(e);
    return DEFAULT_CATEGORIES;
  }
};

export const deleteSupportCategory = (categoryName) => {
  try {
    const categories = getSupportCategories();
    const updated = categories.filter((c) => c !== categoryName);
    localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error(e);
    return DEFAULT_CATEGORIES;
  }
};

// 2. ADMIN USERS MANAGEMENT
const DEFAULT_USERS = [
  { id: "u1", name: "Aakash Sharma", email: "admin@eduvisio.com", role: "admin", tier: "Elite Scholar", status: "active", quizzesCount: 42, joinedDate: "2026-01-10", lastLogin: "Just now", location: "New Delhi, India", phone: "+91 98765 43210" },
  { id: "u2", name: "Rohan Verma", email: "rohan@gmail.com", role: "user", tier: "Pro Student", status: "active", quizzesCount: 19, joinedDate: "2026-02-14", lastLogin: "2 hours ago", location: "Mumbai, India", phone: "+91 98123 45678" },
  { id: "u3", name: "Priya Patel", email: "priya@student.edu", role: "user", tier: "Pro Student", status: "active", quizzesCount: 28, joinedDate: "2026-03-01", lastLogin: "Yesterday", location: "Ahmedabad, India", phone: "+91 97234 56789" },
  { id: "u4", name: "David Miller", email: "david@university.edu", role: "user", tier: "Free Learner", status: "active", quizzesCount: 14, joinedDate: "2026-04-12", lastLogin: "3 days ago", location: "California, USA", phone: "+1 415 555 0192" },
  { id: "u5", name: "Guest User", email: "user@eduvisio.com", role: "user", tier: "Free Learner", status: "active", quizzesCount: 5, joinedDate: "2026-08-01", lastLogin: "Just now", location: "London, UK", phone: "+44 20 7946 0912" },
];

export const getAdminUsers = () => {
  try {
    const raw = localStorage.getItem(KEYS.USERS);
    return raw ? JSON.parse(raw) : DEFAULT_USERS;
  } catch (e) {
    return DEFAULT_USERS;
  }
};

export const addAdminUser = (userData) => {
  try {
    const users = getAdminUsers();
    const newUser = {
      id: `u_${Date.now()}`,
      quizzesCount: 0,
      status: "active",
      joinedDate: new Date().toISOString().split("T")[0],
      ...userData,
    };
    const updated = [newUser, ...users];
    localStorage.setItem(KEYS.USERS, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error(e);
    return DEFAULT_USERS;
  }
};

export const toggleUserStatus = (userId) => {
  try {
    const users = getAdminUsers();
    const updated = users.map((u) =>
      u.id === userId ? { ...u, status: u.status === "active" ? "suspended" : "active" } : u
    );
    localStorage.setItem(KEYS.USERS, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error(e);
    return DEFAULT_USERS;
  }
};

export const deleteAdminUser = (userId) => {
  try {
    const users = getAdminUsers();
    const updated = users.filter((u) => u.id !== userId);
    localStorage.setItem(KEYS.USERS, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error(e);
    return DEFAULT_USERS;
  }
};

// 3. FAQS MANAGEMENT
const DEFAULT_FAQS = [
  {
    id: "faq-1",
    category: "Quizzes & AI",
    question: "How does the AI Quiz Generator work?",
    answer: "Our AI analyzes the custom text, study notes, or documents you provide and uses Google Gemini models to automatically generate structured multiple-choice questions with 4 plausible options and detailed answer explanations.",
  },
  {
    id: "faq-2",
    category: "Quizzes & AI",
    question: "Can I generate quizzes from my own PDFs or study notes?",
    answer: "Yes! You can paste any text or notes directly into the 'Custom Text' tab under Generate Quiz, or upload PDFs and documents under the 'Learning Materials' page to create personalized practice quizzes.",
  },
  {
    id: "faq-3",
    category: "Account & Subscriptions",
    question: "How many free quizzes can I generate per day?",
    answer: "Free Learner accounts can generate up to 5 AI quizzes per day. Upgrade to Pro Student or Elite Scholar for unlimited AI quiz generations and PDF exports.",
  },
  {
    id: "faq-4",
    category: "Account & Subscriptions",
    question: "Where can I configure my Gemini API Key?",
    answer: "You can configure your Google Gemini API Key directly inside the 'Generate Quiz' page by clicking 'Set Gemini API Key' or by adding GEMINI_API_KEY to backend/.env.",
  },
  {
    id: "faq-5",
    category: "Technical & Platform",
    question: "Are my study materials and quiz results saved securely?",
    answer: "Yes, all your generated quizzes, study scores, and materials are saved locally in your browser storage and accessible anytime from your Dashboard and My Quizzes tab.",
  },
];

export const getAdminFaqs = () => {
  try {
    const raw = localStorage.getItem(KEYS.FAQS);
    return raw ? JSON.parse(raw) : DEFAULT_FAQS;
  } catch (e) {
    return DEFAULT_FAQS;
  }
};

export const addAdminFaq = (faqData) => {
  try {
    const faqs = getAdminFaqs();
    const newFaq = {
      id: `faq_${Date.now()}`,
      ...faqData,
    };
    const updated = [newFaq, ...faqs];
    localStorage.setItem(KEYS.FAQS, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error(e);
    return DEFAULT_FAQS;
  }
};

export const deleteAdminFaq = (faqId) => {
  try {
    const faqs = getAdminFaqs();
    const updated = faqs.filter((f) => f.id !== faqId);
    localStorage.setItem(KEYS.FAQS, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error(e);
    return DEFAULT_FAQS;
  }
};

// 4. SUBSCRIPTION PLANS MANAGEMENT
const DEFAULT_PLANS = [
  {
    id: "free",
    name: "Free Learner",
    price: "$0",
    period: "forever",
    description: "Basic learning tools and limited daily AI quiz generations.",
    features: [
      "Up to 5 AI Quiz generations per day",
      "Upload up to 10 study materials",
      "Basic performance progress tracking",
      "Community support forum access",
    ],
    popular: false,
    tierName: "Free Learner",
  },
  {
    id: "pro",
    name: "Pro Student",
    price: "$9.99",
    period: "per month",
    description: "Ideal for active students preparing for exams with unlimited AI quizzes.",
    features: [
      "Unlimited AI Quiz generations",
      "Upload up to 100 study materials",
      "Detailed topic accuracy analytics",
      "Priority Gemini AI processing",
      "Export quizzes to PDF & Flashcards",
    ],
    popular: true,
    tierName: "Pro Student",
  },
  {
    id: "elite",
    name: "Elite Scholar",
    price: "$19.99",
    period: "per month",
    description: "Advanced learning suite with custom AI model tuning & group study tools.",
    features: [
      "Everything in Pro Student plan",
      "Unlimited study materials storage",
      "Advanced custom question prompts",
      "1-on-1 AI Tutor assistance",
      "Dedicated VIP priority support",
    ],
    popular: false,
    tierName: "Elite Scholar",
  },
  {
    id: "institution",
    name: "Institution / Team",
    price: "$49.99",
    period: "per month",
    description: "For classrooms, schools, and study groups managing multiple learners.",
    features: [
      "Everything in Elite Scholar plan",
      "Up to 25 student sub-accounts",
      "Classroom analytics & score reporting",
      "Custom branding & institution logo",
      "Dedicated account manager",
    ],
    popular: false,
    tierName: "Institution / Team",
  },
];

export const getAdminPlans = () => {
  try {
    const raw = localStorage.getItem(KEYS.PLANS);
    return raw ? JSON.parse(raw) : DEFAULT_PLANS;
  } catch (e) {
    return DEFAULT_PLANS;
  }
};

export const updateAdminPlanPrice = (planId, newPrice) => {
  try {
    const plans = getAdminPlans();
    const updated = plans.map((p) => (p.id === planId ? { ...p, price: newPrice } : p));
    localStorage.setItem(KEYS.PLANS, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error(e);
    return DEFAULT_PLANS;
  }
};

// 5. FEEDBACK REVIEWS MANAGEMENT
const DEFAULT_FEEDBACK = [
  {
    id: "fb-1",
    user: "Aakash Sharma",
    rating: 5,
    category: "Quiz Generation",
    comment: "The AI quiz generator extracted key facts accurately from my machine learning notes!",
    date: "Today",
    response: "Thank you Aakash! We are glad AI quiz generator helped your study workflow.",
  },
  {
    id: "fb-2",
    user: "Priya Patel",
    rating: 4,
    category: "UI & Design",
    comment: "Great color themes and analytics dashboard. Would love dark mode for night reading.",
    date: "Yesterday",
    response: null,
  },
  {
    id: "fb-3",
    user: "Rohan Verma",
    rating: 5,
    category: "Material Upload",
    comment: "Storing PDFs and generating custom practice tests in one place is super convenient.",
    date: "3 days ago",
    response: "Thanks Rohan!",
  },
];

export const getAdminFeedback = () => {
  try {
    const raw = localStorage.getItem(KEYS.FEEDBACK);
    return raw ? JSON.parse(raw) : DEFAULT_FEEDBACK;
  } catch (e) {
    return DEFAULT_FEEDBACK;
  }
};

export const addAdminFeedback = (fbData) => {
  try {
    const list = getAdminFeedback();
    const newFb = {
      id: `fb_${Date.now()}`,
      date: "Just now",
      response: null,
      ...fbData,
    };
    const updated = [newFb, ...list];
    localStorage.setItem(KEYS.FEEDBACK, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error(e);
    return DEFAULT_FEEDBACK;
  }
};

export const respondToAdminFeedback = (fbId, responseText) => {
  try {
    const list = getAdminFeedback();
    const updated = list.map((item) =>
      item.id === fbId ? { ...item, response: responseText } : item
    );
    localStorage.setItem(KEYS.FEEDBACK, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error(e);
    return DEFAULT_FEEDBACK;
  }
};

// 7. THEMES & BRANDING MANAGEMENT
export const THEMES = {
  USER: {
    green: { name: "Emerald Green (Default)", primary: "#10bc00", hover: "#0b7c00", bg: "bg-[#10bc00]", border: "border-emerald-200" },
    blue: { name: "Ocean Blue", primary: "#2563eb", hover: "#1d4ed8", bg: "bg-blue-600", border: "border-blue-200" },
    purple: { name: "Deep Purple", primary: "#7c3aed", hover: "#6d28d9", bg: "bg-purple-600", border: "border-purple-200" },
    dark: { name: "Midnight Slate", primary: "#0f172a", hover: "#1e293b", bg: "bg-slate-900", border: "border-slate-700" },
  },
  ADMIN: {
    orange: { name: "Warm Orange (Default)", primary: "#f97316", hover: "#ea580c", bg: "bg-[#f97316]", border: "border-orange-200" },
    amber: { name: "Amber Gold", primary: "#d97706", hover: "#b45309", bg: "bg-amber-600", border: "border-amber-200" },
    red: { name: "Crimson Red", primary: "#dc2626", hover: "#b91c1c", bg: "bg-red-600", border: "border-red-200" },
    charcoal: { name: "Charcoal Dark", primary: "#18181b", hover: "#27272a", bg: "bg-zinc-900", border: "border-zinc-700" },
  },
};

export const getUserTheme = () => {
  return localStorage.getItem("eduvisio_user_theme") || "green";
};

export const setUserTheme = (themeKey) => {
  localStorage.setItem("eduvisio_user_theme", themeKey);
};

export const getAdminTheme = () => {
  return localStorage.getItem("eduvisio_admin_theme") || "orange";
};

export const setAdminTheme = (themeKey) => {
  localStorage.setItem("eduvisio_admin_theme", themeKey);
};

// 8. ADMIN NOTIFICATIONS MANAGEMENT
export const DEFAULT_NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "⚡ Gemini 2.0 Flash AI Integration Deployed",
    message: "Platform-wide upgrade complete. AI question synthesis now uses Gemini 2.0 Flash for sub-second quiz generation and enhanced multi-step question logic.",
    type: "announcement",
    priority: "high",
    targetAudience: "All Platform Users",
    audienceCategory: "all",
    channel: "In-App Banner & Notification",
    audienceCount: 1540,
    readCount: 1392,
    status: "sent",
    createdAt: "2026-10-20 18:30",
    actionLink: "/generate-quiz",
    isRead: false,
    pinned: true,
    sender: "EduVisio System Ops",
  },
  {
    id: "notif-2",
    title: "🚨 Urgent Support Escalation: Ticket #1084",
    message: "User 'David Miller' submitted a high-priority ticket regarding PDF parsing timeouts on scanned chemistry notes. Engineering attention requested.",
    type: "system_alert",
    priority: "urgent",
    targetAudience: "Administrators",
    audienceCategory: "admin",
    channel: "Admin Desk & Real-time Alert",
    audienceCount: 4,
    readCount: 2,
    status: "sent",
    createdAt: "Today at 21:15",
    actionLink: "/support",
    isRead: false,
    pinned: true,
    sender: "Automated Ticket Dispatcher",
  },
  {
    id: "notif-3",
    title: "💎 Elite Scholar Subscription Upgraded",
    message: "Learner 'Priya Patel' (priya@student.edu) successfully upgraded to the Elite Scholar Monthly Tier ($19.99/mo). Receipt #TXN-99812 generated.",
    type: "subscription",
    priority: "normal",
    targetAudience: "Administrators",
    audienceCategory: "admin",
    channel: "Financial Ledger & In-App",
    audienceCount: 4,
    readCount: 4,
    status: "sent",
    createdAt: "Today at 19:40",
    actionLink: "/membership",
    isRead: true,
    pinned: false,
    sender: "Billing Webhook",
  },
  {
    id: "notif-4",
    title: "🛠️ Scheduled System Maintenance Window",
    message: "Routine database index optimization scheduled for Sunday, 02:00 AM UTC. Estimated downtime is 20-30 minutes. Real-time quiz saving will be buffered.",
    type: "maintenance",
    priority: "high",
    targetAudience: "All Active Users",
    audienceCategory: "all",
    channel: "In-App Toast & Announcement",
    audienceCount: 1540,
    readCount: 0,
    status: "scheduled",
    createdAt: "2026-10-20 15:00",
    scheduledFor: "2026-10-25 02:00 UTC",
    actionLink: "/faq",
    isRead: true,
    pinned: false,
    sender: "DevOps Infrastructure",
  },
  {
    id: "notif-5",
    title: "🛡️ Security Flag: Repeated Authentication Failures",
    message: "5 consecutive failed login attempts detected on administrative account 'admin@eduvisio.com' from IP 192.168.1.104. Temporary rate limit enforced.",
    type: "security",
    priority: "urgent",
    targetAudience: "Super Admins",
    audienceCategory: "admin",
    channel: "Security Monitor & Admin Alert",
    audienceCount: 2,
    readCount: false,
    status: "sent",
    createdAt: "Yesterday at 23:10",
    actionLink: "/user-management",
    isRead: false,
    pinned: false,
    sender: "Shield Guard WAF",
  },
  {
    id: "notif-6",
    title: "🏆 Weekend Science Quiz Sprint: +50 XP Reward",
    message: "Challenge active! Finish 3 science or programming quizzes before midnight Sunday to earn 50 bonus XP and the 'Elite Thinker' profile badge.",
    type: "campaign",
    priority: "normal",
    targetAudience: "All Students",
    audienceCategory: "student",
    channel: "In-App Push & Dashboard Banner",
    audienceCount: 940,
    readCount: 712,
    status: "sent",
    createdAt: "2026-10-18 10:00",
    actionLink: "/quizzes",
    isRead: true,
    pinned: false,
    sender: "Gamification Engine",
  },
];

export const DEFAULT_NOTIF_SETTINGS = {
  adminNewUserAlert: true,
  adminSystemErrorAlert: true,
  adminSupportTicketAlert: true,
  adminSubscriptionAlert: true,
  autoWelcomeUser: true,
  soundEnabled: true,
  emailDigest: true,
  highPriorityBanner: true,
};

export const getAdminNotifications = () => {
  try {
    const raw = localStorage.getItem(KEYS.NOTIFICATIONS);
    return raw ? JSON.parse(raw) : DEFAULT_NOTIFICATIONS;
  } catch (e) {
    return DEFAULT_NOTIFICATIONS;
  }
};

export const addAdminNotification = (notifData) => {
  try {
    const list = getAdminNotifications();
    const newNotif = {
      id: `notif_${Date.now()}`,
      audienceCount: notifData.targetAudience === "All Platform Users" ? 1540 : 120,
      readCount: 0,
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      isRead: false,
      pinned: false,
      sender: "Administrator Desk",
      ...notifData,
    };
    const updated = [newNotif, ...list];
    localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error(e);
    return DEFAULT_NOTIFICATIONS;
  }
};

export const deleteAdminNotification = (notifId) => {
  try {
    const list = getAdminNotifications();
    const updated = list.filter((n) => n.id !== notifId);
    localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error(e);
    return DEFAULT_NOTIFICATIONS;
  }
};

export const toggleNotificationRead = (notifId) => {
  try {
    const list = getAdminNotifications();
    const updated = list.map((n) =>
      n.id === notifId ? { ...n, isRead: !n.isRead } : n
    );
    localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error(e);
    return DEFAULT_NOTIFICATIONS;
  }
};

export const toggleNotificationPin = (notifId) => {
  try {
    const list = getAdminNotifications();
    const updated = list.map((n) =>
      n.id === notifId ? { ...n, pinned: !n.pinned } : n
    );
    localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error(e);
    return DEFAULT_NOTIFICATIONS;
  }
};

export const markAllNotificationsAsRead = () => {
  try {
    const list = getAdminNotifications();
    const updated = list.map((n) => ({ ...n, isRead: true }));
    localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error(e);
    return DEFAULT_NOTIFICATIONS;
  }
};

export const clearAllNotifications = () => {
  try {
    localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify([]));
    return [];
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getAdminNotifSettings = () => {
  try {
    const raw = localStorage.getItem(KEYS.NOTIF_SETTINGS);
    return raw ? JSON.parse(raw) : DEFAULT_NOTIF_SETTINGS;
  } catch (e) {
    return DEFAULT_NOTIF_SETTINGS;
  }
};

export const updateAdminNotifSettings = (newSettings) => {
  try {
    const settings = { ...getAdminNotifSettings(), ...newSettings };
    localStorage.setItem(KEYS.NOTIF_SETTINGS, JSON.stringify(settings));
    return settings;
  } catch (e) {
    console.error(e);
    return DEFAULT_NOTIF_SETTINGS;
  }
};

