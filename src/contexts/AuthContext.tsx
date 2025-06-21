
"use client";

import type { ReactNode } from "react";
import React, { createContext, useState, useEffect } from "react";
import { signInWithEmail, signUpWithEmail, signInWithGoogle, signOut as firebaseSignOut, type User } from "@/lib/auth";
import type { UserRole } from "@/config/site";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password?: string) => Promise<void>;
  signUp: (email: string, password?: string, name?: string, role?: UserRole) => Promise<void>;
  googleSignIn: () => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Initially true to check persisted session
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Mock session persistence: try to load user from localStorage
    const storedUser = localStorage.getItem("eduGeniusUser");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.email && parsedUser.role) {
           setUser(parsedUser);
        }
      } catch (e) {
        localStorage.removeItem("eduGeniusUser");
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const roles: UserRole[] = ['teacher', 'student', 'parent'];
    // Clean up previous roles on user change
    roles.forEach(r => document.body.classList.remove(`role-${r}`));

    if (user?.role) {
      document.body.classList.add(`role-${user.role}`);
    }
  }, [user]);

  const handleAuthSuccess = (loggedInUser: User | null) => {
    if (loggedInUser) {
      setUser(loggedInUser);
      localStorage.setItem("eduGeniusUser", JSON.stringify(loggedInUser)); // Persist user
      setError(null);
      router.push("/dashboard");
    } else {
      setError("Authentication failed. Please check your credentials.");
    }
  };

  const signIn = async (email: string, password?: string) => {
    setLoading(true);
    setError(null);
    try {
      const loggedInUser = await signInWithEmail(email, password);
      handleAuthSuccess(loggedInUser);
    } catch (e: any) {
      setError(e.message || "Failed to sign in.");
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password?: string, name?: string, role?: UserRole) => {
    setLoading(true);
    setError(null);
    try {
      const newUser = await signUpWithEmail(email, password, name, role);
      handleAuthSuccess(newUser);
    } catch (e: any) {
      setError(e.message || "Failed to sign up.");
    } finally {
      setLoading(false);
    }
  };
  
  const googleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const loggedInUser = await signInWithGoogle();
      handleAuthSuccess(loggedInUser);
    } catch (e: any) {
      setError(e.message || "Failed to sign in with Google.");
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    setError(null);
    try {
      await firebaseSignOut();
      setUser(null);
      localStorage.removeItem("eduGeniusUser"); // Clear persisted user
      router.push("/login");
    } catch (e: any) {
      setError(e.message || "Failed to sign out.");
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{ user, loading, error, signIn, signUp, googleSignIn, signOut, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
