import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/common/ui/Button";
import { Input } from "@/components/common/ui/Input";
import { Avatar } from "@/components/common/ui/Avatar";
import { useAtom } from "jotai";
import { userAtom } from "@/store/userAtom";

interface EditAvatarPopoverProps {
  open: boolean;
  onClose: () => void;
}

const EditAvatarPopover: React.FC<EditAvatarPopoverProps> = ({ open, onClose }) => {
  const [user, setUser] = useAtom(userAtom);
  const [imageUrl, setImageUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState(user?.profilePic || "");

  const handleSave = () => {
    if (!user) return;

    const updatedUser = { ...user, profilePic: imageUrl };
    setUser(updatedUser);

    // Close the popover
    onClose();

    // TODO: PATCH to DB (later step)
  };

  return (
    <Popover open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
<PopoverContent className="w-80 p-4 flex flex-col gap-4 bg-white dark:bg-gray-800 text-black dark:text-white">

        <h2 className="text-lg font-semibold text-center">Update Profile Picture</h2>

        <Avatar src={previewUrl} fallbackText={user?.userName?.[0] || "U"} size="lg" />

        <div className="relative w-full">
          <Input
            type="url"
            placeholder="Paste image URL (e.g., Imgur)"
            value={imageUrl}
            onChange={(e) => {
              setImageUrl(e.target.value);
              setPreviewUrl(e.target.value);
            }}
            className="w-full pr-[4.5rem] text-base h-12"
          />
          <Button
            onClick={handleSave}
            disabled={!imageUrl}
            className="absolute top-1 right-1 h-[calc(100%-0.5rem)] px-4 text-sm"
          >
            Save
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default EditAvatarPopover;
