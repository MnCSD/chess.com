"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import Image from "next/image";
import React from "react";
import { FlagIcon, FlagIconCode } from "react-flag-kit";

interface PlayerBarProps {
  type: "game" | "view";
  player: "opponent" | "user";
}

export const PlayerBar = ({ type, player }: PlayerBarProps) => {
  const user = useCurrentUser();

  return (
    <div className="flex w-full items-start justify-between">
      {user && type !== "view" && player === "user" && (
        <Image
          src={user.image || "/user_placeholder.svg"}
          alt="User image"
          width={32}
          height={32}
          className="rounded-[3px]"
        />
      )}

      {type === "view" && player === "opponent" && (
        <div className="flex gap-x-3">
          <Image
            src={"/opponent_placeholder.png"}
            alt="User image"
            width={40}
            height={40}
            className="rounded-[3px]"
          />
          <p className="text-white text-sm">Opponent</p>
        </div>
      )}

      {type === "view" && player === "user" && user && (
        <div className="flex ">
          <Image
            src={user.image || "/user_placeholder.svg"}
            alt="User image"
            width={40}
            height={40}
            className="rounded-[3px]"
          />
          <div className="flex gap-x-1 ml-3 items-start">
            <p className="text-white text-sm">{user.name}</p>
            <p className="text-sm text-muted/80">(500)</p>
            <FlagIcon
              code={user.country as FlagIconCode}
              size={17}
              className="rounded-xs object-contain mt-1"
            />
          </div>
        </div>
      )}
    </div>
  );
};
