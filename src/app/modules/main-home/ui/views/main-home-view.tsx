"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import React from "react";
import { UserInfoSection } from "../sections/user-info-section";
import { GamesSection } from "../sections/games-section";

export const MainHomeView = () => {
  const user = useCurrentUser();

  if (!user) return null;

  return (
    <div className="max-w-[1070px] mx-auto pt-8.5 flex flex-col gap-y-8">
      <UserInfoSection user={user} />

      <GamesSection />
    </div>
  );
};
