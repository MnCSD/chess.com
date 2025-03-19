import Image from "next/image";
import React from "react";
import { LoginForm } from "./components/login-form";
import { SocialButtons } from "./components/social-buttons";

const Page = () => {
  return (
    <main
      className="bg-background w-full h-screen "
      style={{
        backgroundImage: "url('/background.png')",
        backgroundPosition: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "100%",
      }}
    >
      <div className="flex flex-col items-center justify-center h-full gap-y-10">
        <div className="max-w-full w-[330px] flex items-center justify-center">
          <Image
            src={"/logo_chess.png"}
            alt="Logo"
            width={158}
            height={44}
            className=""
          />
        </div>

        <LoginForm />
      </div>
    </main>
  );
};

export default Page;
