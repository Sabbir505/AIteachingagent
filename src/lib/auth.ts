// This is a mock authentication module.
// In a real application, this would interact with Firebase Authentication.

import type { UserRole } from "@/config/site";

export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
}

// Mock user database
const mockUsers: User[] = [
  { id: "1", email: "teacher@example.com", name: "Dr. Teacher", role: "teacher" },
  { id: "2", email: "student@example.com", name: "Studious Student", role: "student" },
  { id: "3", email: "parent@example.com", name: "Caring Parent", role: "parent" },
];

export async function signInWithEmail(email: string, _password?: string): Promise<User | null> {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  const user = mockUsers.find(u => u.email === email);
  if (user) {
    // In a real app, you'd verify the password here
    return user;
  }
  return null;
}

export async function signUpWithEmail(email: string, _password?: string, name?: string, role?: UserRole): Promise<User | null> {
  await new Promise(resolve => setTimeout(resolve, 500));
  if (mockUsers.find(u => u.email === email)) {
    throw new Error("User already exists");
  }
  const newUser: User = {
    id: String(mockUsers.length + 1),
    email,
    name: name || "New User",
    role: role || "student",
  };
  mockUsers.push(newUser);
  return newUser;
}

export async function signInWithGoogle(): Promise<User | null> {
  await new Promise(resolve => setTimeout(resolve, 500));
  // Simulate Google Sign-In. In a real app, this would use Firebase's GoogleAuthProvider.
  // For mock purposes, let's log in as the first mock user if they exist.
  return mockUsers.length > 0 ? mockUsers[0] : null;
}

export async function signOut(): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 200));
  // Simulate sign out.
}
