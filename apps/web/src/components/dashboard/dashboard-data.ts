import {
  BookOpen,
  Briefcase,
  Code2,
  FileText,
  GraduationCap,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
  Video,
} from "lucide-react";

export type DashboardStat = {
  label: string;
  value: string;
  description: string;
};

export type QuickAction = {
  title: string;
  description: string;
  icon: typeof Video;
  action: string;
};

export type RecentMeeting = {
  id: string;
  title: string;
  type: string;
  date: string;
  time: string;
  participants: number;
  status: string;
};

export const dashboardStats: DashboardStat[] = [
  {
    label: "Total Meetings",
    value: "0",
    description: "No meetings yet",
  },
  {
    label: "Participants",
    value: "0",
    description: "No participants yet",
  },
  {
    label: "Hours",
    value: "0h",
    description: "Meeting time",
  },
  {
    label: "Notes",
    value: "0",
    description: "No notes yet",
  },
];

export const quickActions: QuickAction[] = [
  {
    title: "Start Meeting",
    description: "Create a new meeting room",
    icon: Video,
    action: "start",
  },
  {
    title: "Join Meeting",
    description: "Enter an existing meeting",
    icon: Users,
    action: "join",
  },
  {
    title: "Create Notes",
    description: "Start a new workspace",
    icon: FileText,
    action: "notes",
  },
];

export const recentMeetings: RecentMeeting[] = [];

export const dashboardNavigation = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Meetings",
    icon: Video,
  },
  {
    label: "Schedule",
    icon: BookOpen,
  },
  {
    label: "Recordings",
    icon: FileText,
  },
  {
    label: "Notes",
    icon: MessageSquare,
  },
  {
    label: "Settings",
    icon: Settings,
  },
];

export const educationNavigation = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Classes",
    icon: GraduationCap,
  },
  {
    label: "Students",
    icon: Users,
  },
  {
    label: "Meetings",
    icon: Video,
  },
  {
    label: "Notes",
    icon: FileText,
  },
  {
    label: "Settings",
    icon: Settings,
  },
];

export const codingNavigation = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Coding Rooms",
    icon: Code2,
  },
  {
    label: "Students",
    icon: Users,
  },
  {
    label: "Meetings",
    icon: Video,
  },
  {
    label: "Projects",
    icon: FileText,
  },
  {
    label: "Settings",
    icon: Settings,
  },
];

export const businessNavigation = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Meetings",
    icon: Video,
  },
  {
    label: "Schedule",
    icon: BookOpen,
  },
  {
    label: "Team",
    icon: Users,
  },
  {
    label: "Notes",
    icon: FileText,
  },
  {
    label: "Settings",
    icon: Settings,
  },
];