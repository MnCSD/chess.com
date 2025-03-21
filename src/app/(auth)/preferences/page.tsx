import Image from "next/image";
import React from "react";
import { SignUpSteps } from "../sign-up/components/sign-up-steps";
import { SkillSection } from "./components/skill-section";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const PreferencesPage = async () => {
  const session = await auth();

  if (session?.user.country && session?.user.level) redirect("/home");

  return (
    <main className="bg-background w-full h-screen max-w-[460px] mx-auto flex justify-center pt-4">
      <div className="flex flex-col items-center gap-y-6">
        <Image src={"/logo_chess.png"} width={158} height={44} alt="Logo" />

        <SkillSection />
      </div>
    </main>
  );
};

export default PreferencesPage;
