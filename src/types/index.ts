import type { UserRole as ConfigUserRole } from "@/config/site";

export type UserRole = ConfigUserRole;

export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  avatar?: string; // Optional: URL to avatar image
}

export interface Lesson {
  id: string;
  title: string;
  subject: string;
  content: string; // Could be markdown, JSON structure, etc.
  // Add other lesson-specific fields
}

export interface Assignment {
  id: string;
  title: string;
  lessonId?: string; // Optional: link to a lesson
  dueDate: string; // ISO date string
  // Add other assignment-specific fields
}

// You can expand this file with more shared types as needed.
