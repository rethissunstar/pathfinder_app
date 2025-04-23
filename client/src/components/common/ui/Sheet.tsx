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

interface SettingsSheetProps {
  open: boolean;
  onClose: (open: boolean) => void;
  isMobile?: boolean;
}

const SettingsSheet: React.FC<SettingsSheetProps> = ({ open, onClose, isMobile = false }) => {
  const [user, setUser] = useAtom(userAtom);

  const handleThemeToggle = (checked: boolean) => {
    const updatedUser = user ? { ...user, theme: checked ? "dark" as const : "light" as const } : null;
    if (updatedUser) setUser(updatedUser);
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
              className="text-white hover:text-gray-200 transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </SheetHeader>

        <div className="mt-4 space-y-6">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <Label htmlFor="theme-toggle">Dark Mode</Label>
            <Switch
              id="theme-toggle"
              checked={user?.theme === "dark"}
              onCheckedChange={handleThemeToggle}
            />
          </div>

          {/* Language Setting Placeholder */}
          <div>
            <h3 className="text-sm font-medium mb-2">Language</h3>
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
