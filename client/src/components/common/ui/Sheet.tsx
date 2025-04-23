"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/common/ui/Button";
import { useAtom } from "jotai";
import { userAtom } from "@/store/userAtom";
import { X } from "lucide-react";
import { updateUser } from "@/lib/api/updateUser";


interface SettingsSheetProps {
  open: boolean;
  onClose: (open: boolean) => void;
  isMobile?: boolean;
}

const SettingsSheet: React.FC<SettingsSheetProps> = ({ open, onClose, isMobile = false }) => {
  const [user, setUser] = useAtom(userAtom);


  const handleThemeToggle = async (checked: boolean) => {
    if (!user) return;
  
    const newTheme: "dark" | "light" = checked ? "dark" : "light";
  
    // 🧠 Optimistically update UI and DOM
    const updatedUser = { ...user, theme: newTheme };
    setUser(updatedUser);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  
    try {
      const response = await updateUser(user.userId, { theme: newTheme });
      console.log("✅ Theme update response:", response);
    } catch (error) {
      console.error("❌ Failed to update theme:", error);
      // Optionally revert if needed
      // setUser(user);
      // document.documentElement.classList.toggle("dark", newTheme !== "dark");
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side={isMobile ? "top" : "right"} className="p-4 max-w-md mx-auto">
        <SheetHeader className="bg-red-800 text-white p-4 rounded">
          <div className="flex justify-between items-center">
            <div>
              <SheetTitle className="text-white">Settings</SheetTitle>
              <SheetDescription className="text-gray-100">
                Configure your preferences
              </SheetDescription>
            </div>
            <button
              onClick={() => onClose(false)}
              className="text-white hover:text-gray-200 transition text-2xl"
              aria-label="Close Settings"
            >
              <X className="w-7 h-7" />
            </button>
          </div>
        </SheetHeader>

        <div className="mt-4 space-y-6 text-gray-900 dark:text-gray-100">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <Label htmlFor="theme-toggle" className="text-gray-900 dark:text-gray-100">
              Dark Mode
            </Label>
            <Switch
              id="theme-toggle"
              checked={user?.theme === "dark"}
              onCheckedChange={handleThemeToggle}
            />
          </div>

          {/* Language Setting Placeholder */}
          <div>
            <h3 className="text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">Language</h3>
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => {
                const newLang = user?.language === "en" ? "fr" : "en";
                if (user) setUser({ ...user, language: newLang });
              }}
            >
              Current: {user?.language?.toUpperCase() || "EN"}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SettingsSheet;

