"use client";

import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Input } from "@/components/common/ui/Input";
import { Button } from "@/components/common/ui/Button";
import { Avatar } from "@/components/common/ui/Avatar";
import { useAtom } from "jotai";
import { userAtom } from "@/store/userAtom";
import { X } from "lucide-react";
import { Label } from "@/components/ui/label";
import InfoTooltip from "@/components/common/ui/Tooltip";
import { updateUser } from "@/lib/api/updateUser"; 


interface EditAvatarSheetProps {
  open: boolean;
  onClose: (open: boolean) => void;
  isMobile?: boolean;
}

const EditAvatarSheet: React.FC<EditAvatarSheetProps> = ({ open, onClose, isMobile = false }) => {
  const [user, setUser] = useAtom(userAtom);
  const [imageUrl, setImageUrl] = useState(user?.profilePic || "");
  const [previewUrl, setPreviewUrl] = useState(user?.profilePic || "");

  useEffect(() => {
    setPreviewUrl(user?.profilePic || "");
  }, [user?.profilePic]);

  const handleApplyPreview = () => {
    setPreviewUrl(imageUrl);
  };

  const handleSave = async () => {
    if (!user || !imageUrl) return;
  
    const updatedUser = { ...user, profilePic: imageUrl };
    setUser(updatedUser);
    console.log("✅ Saving image URL:", imageUrl);
  
    try {
      const res = await updateUser(user.userId, { profilePic: imageUrl });
      console.log("✅ DB Updated:", res);
    } catch (err) {
      console.error("❌ Failed to update DB:", err);
    }
  
    onClose(false);
  };
  

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side={isMobile ? "top" : "right"} className="p-4 max-w-md mx-auto">
        <SheetHeader className="bg-red-800 text-white p-4 rounded">
          <div className="flex justify-between items-center">
            <div>
              <SheetTitle className="text-white">Update Profile Picture</SheetTitle>
              <SheetDescription className="text-gray-100">
                Paste a direct image address (right click the image on Imgur and copy image address).
              </SheetDescription>
            </div>
            <button
              onClick={() => onClose(false)}
              className="text-white hover:text-gray-200 transition text-2xl"
              aria-label="Close Avatar Sheet"
            >
              <X className="w-7 h-7" />
            </button>
          </div>
        </SheetHeader>

        <div className="mt-4 space-y-6">
          {previewUrl && (
            <div className="flex justify-center">
              <Avatar
                src={previewUrl}
                fallbackText={user?.userName?.[0] || "U"}
                size="lg"
                className="border border-gray-300 dark:border-gray-600"
              />
            </div>
          )}

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Label htmlFor="avatar-url" className="text-sm font-medium">
                Image URL
              </Label>
              <InfoTooltip text="Use Imgur to resize and crop the image.  Open the link provided. Right click the image and copy image address, not the page URL." />
            </div>

            <div className="w-full space-y-4">
              <Input
                id="avatar-url"
                type="url"
                placeholder="Paste direct image address"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full text-base h-12"
              />
              <div className="flex justify-center gap-2 w-full">
                <Button onClick={handleApplyPreview} className="w-32 text-sm">
                  Preview
                </Button>
                <Button onClick={handleSave} disabled={!imageUrl} className="w-32 text-sm">
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default EditAvatarSheet;

