export type Experience = "general" | "coding" | "business";

export const experienceInfo = {
  general: {
    title: "General",
    description: "Connect, collaborate and communicate.",
  },
  coding: {
    title: "Coding Bootcamp",
    description: "Learn, code and build together.",
  },
  business: {
    title: "Business",
    description: "Meet, collaborate and grow your team.",
  },
} as const;

export const generalMeetings = [
  {
    title: "Team Standup",
    date: "Oct 11, 2025",
    time: "10:00 AM",
    participants: "8 participants",
    status: "Scheduled",
  },
  {
    title: "Product Design Review",
    date: "Oct 10, 2025",
    time: "2:30 PM",
    participants: "12 participants",
    status: "Ended",
  },
  {
    title: "Client Presentation",
    date: "Oct 9, 2025",
    time: "11:00 AM",
    participants: "6 participants",
    status: "Ended",
  },
  {
    title: "Development Sprint Planning",
    date: "Oct 8, 2025",
    time: "9:00 AM",
    participants: "10 participants",
    status: "Scheduled",
  },
];

export const codingCourses = [
  {
    title: "JavaScript Fundamentals",
    progress: 82,
    lessons: "8 / 10 lessons",
  },
  {
    title: "React & Next.js",
    progress: 64,
    lessons: "6 / 10 lessons",
  },
  {
    title: "Full Stack Development",
    progress: 38,
    lessons: "4 / 10 lessons",
  },
];

export const businessMeetings = [
  {
    title: "Product Strategy",
    time: "10:00 AM",
    participants: "8 participants",
    type: "Internal",
  },
  {
    title: "Team Standup",
    time: "11:30 AM",
    participants: "12 participants",
    type: "Team",
  },
  {
    title: "Client Presentation",
    time: "2:00 PM",
    participants: "6 participants",
    type: "Client",
  },
];