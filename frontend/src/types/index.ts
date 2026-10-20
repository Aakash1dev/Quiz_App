// Centralized TypeScript Type Definitions for Quiz_App

export type UserRole = "student" | "instructor" | "admin" | "superadmin" | "Super Admin" | "Student" | "Instructor";

export type SubscriptionTier = "Free Learner" | "Pro Student" | "Elite Scholar" | "Institution / Team";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  tier?: string;
  status?: "active" | "suspended";
  quizzesCount?: number;
  joinedDate?: string;
  lastLogin?: string;
  location?: string;
  phone?: string;
}

export interface QuizQuestion {
  id: string | number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description?: string;
  category: string;
  questions: QuizQuestion[];
  createdAt?: string;
  difficulty?: "easy" | "medium" | "hard" | "mixed";
  totalQuestions?: number;
  timeLimitMinutes?: number;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  quizTitle: string;
  category: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: string;
  answers: Record<number, number>;
  timeSpentSeconds?: number;
}

export type NotificationType = "announcement" | "system_alert" | "security" | "maintenance" | "subscription" | "campaign";

export type NotificationPriority = "urgent" | "high" | "normal" | "low";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  targetAudience: string;
  audienceCategory?: "all" | "student" | "admin" | string;
  channel?: string;
  audienceCount?: number;
  readCount?: number;
  status?: "sent" | "scheduled" | "draft";
  createdAt?: string;
  scheduledFor?: string | null;
  actionLink?: string;
  isRead?: boolean;
  pinned?: boolean;
  sender?: string;
}

export interface NotifSettings {
  adminNewUserAlert: boolean;
  adminSystemErrorAlert: boolean;
  adminSupportTicketAlert: boolean;
  adminSubscriptionAlert: boolean;
  autoWelcomeUser: boolean;
  soundEnabled: boolean;
  emailDigest: boolean;
  highPriorityBanner?: boolean;
}

export interface SupportTicketMessage {
  sender: "user" | "admin" | string;
  text: string;
  timestamp?: string;
}

export interface SupportTicket {
  id: string;
  userName: string;
  userEmail: string;
  category: string;
  subject: string;
  priority: "Low" | "Medium" | "High" | "Urgent";
  status: "Open" | "In Progress" | "Resolved";
  createdAt: string;
  messages: SupportTicketMessage[];
}

export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface PlanItem {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
  tierName: string;
}

export interface FeedbackReview {
  id: string;
  user: string;
  rating: number;
  category: string;
  comment: string;
  date: string;
  response: string | null;
}
