"use client";

import * as React from "react";
import { Moon, Sun, Eye, Zap, Type } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [isDyslexicMode, setIsDyslexicMode] = React.useState(false);
  const [isHighContrastMode, setIsHighContrastMode] = React.useState(false);

  React.useEffect(() => {
    // Apply/remove dyslexia class from body
    if (isDyslexicMode) {
      document.body.classList.add("font-dyslexic");
    } else {
      document.body.classList.remove("font-dyslexic");
    }
  }, [isDyslexicMode]);

  React.useEffect(() => {
    // Apply/remove high-contrast class from html element (or body)
    // This works with how globals.css is set up for .high-contrast
    const rootElement = document.documentElement;
    if (isHighContrastMode) {
      rootElement.classList.add("high-contrast");
    } else {
      rootElement.classList.remove("high-contrast");
    }
  }, [isHighContrastMode]);
  
  React.useEffect(() => {
    // Load saved preferences from localStorage
    const savedDyslexic = localStorage.getItem("dyslexicMode") === "true";
    const savedHighContrast = localStorage.getItem("highContrastMode") === "true";
    setIsDyslexicMode(savedDyslexic);
    setIsHighContrastMode(savedHighContrast);
  }, []);


  const toggleDyslexicMode = () => {
    const newMode = !isDyslexicMode;
    setIsDyslexicMode(newMode);
    localStorage.setItem("dyslexicMode", String(newMode));
  };
  const toggleHighContrastMode = () => {
    const newMode = !isHighContrastMode;
    setIsHighContrastMode(newMode);
    localStorage.setItem("highContrastMode", String(newMode));
  };


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="w-9 h-9 px-0">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme & accessibility</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4" /> Light Mode
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" /> Dark Mode
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Zap className="mr-2 h-4 w-4" /> System Default
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={toggleDyslexicMode}>
          <Type className="mr-2 h-4 w-4" /> 
          {isDyslexicMode ? "Disable" : "Enable"} Dyslexia Mode
        </DropdownMenuItem>
        <DropdownMenuItem onClick={toggleHighContrastMode}>
          <Eye className="mr-2 h-4 w-4" /> 
          {isHighContrastMode ? "Disable" : "Enable"} High Contrast
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
