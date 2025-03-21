import React from "react";
import { UserInfo } from "../../types";
import Image from "next/image";
import { FlagIcon, FlagIconCode } from "react-flag-kit";
import {
  Globe2Icon,
  MailIcon,
  PlayIcon,
  SettingsIcon,
  Users2Icon,
} from "lucide-react";

interface UserInfoProps {
  user: UserInfo;
}

export const UserInfoSection = ({ user }: UserInfoProps) => {
  return (
    <div className="w-full hidden lg:block">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-x-3">
          <Image
            src={user.image || "/user_placeholder.svg"}
            alt="User image"
            width={32}
            height={32}
            className="rounded-[3px]"
          />

          <p className="font-bold text-white text-[20px]">{user.name}</p>

          {user.country ? (
            <FlagIcon
              code={user.country as FlagIconCode}
              size={17}
              className="rounded-xs"
            />
          ) : (
            <Globe2Icon size={18} className="text-muted/50" />
          )}
        </div>

        <div className="flex items-center gap-x-3">
          <Users2Icon className="size-6 fill-muted/50 text-muted/50" />

          <PlayIcon className="size-6 fill-muted/50 text-muted/50" />

          <MailIcon className="size-6 fill-muted/50 text-muted/50" />

          <SettingsIcon className="size-6 fill-muted/50 text-muted/50" />
        </div>
      </div>
    </div>
  );
};
