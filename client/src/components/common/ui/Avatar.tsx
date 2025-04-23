
import * as React from "react";
import {
  Avatar as ShadAvatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { useAtomValue } from "jotai";
import { userAtom } from "@/store/userAtom";

type Props = {
  src?: string;
  alt?: string;
  fallbackText?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export const Avatar: React.FC<Props> = ({
  src,
  alt = "User Avatar",
  fallbackText = "U",
  size = "md",
  className,
}) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-10 w-10",
    lg: "h-14 w-14",
  };

  const user = useAtomValue(userAtom);
  const resolvedSrc = src || user?.profilePic || "https://www.gravatar.com/avatar/?d=mp";
  const [imgError, setImgError] = React.useState(false);

  return (
    <ShadAvatar className={`${sizeClasses[size]} ${className}`}>
      {!imgError && (
        <AvatarImage
          src={resolvedSrc}
          alt={alt}
          onError={() => setImgError(true)}
        />
      )}
      <AvatarFallback>{fallbackText || user?.userName?.[0] || "U"}</AvatarFallback>
    </ShadAvatar>
  );
};
