import Image from "next/image";
import React from "react";
import { LoginForm } from "./components/login-form";
import { SocialButtons } from "./components/social-buttons";
import { signIn } from "@/auth";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

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

        <div className="bg-sidebar max-w-full w-[400px] rounded-lg ">
          <LoginForm />
          <div className="px-8 space-y-10 mb-6">
            <div className="flex items-center justify-center gap-x-4 w-full mx-auto">
              <Separator className="flex-1/3 bg-muted/10" />
              <span className="text-medium uppercase text-muted/40">or</span>
              <Separator className="flex-1/3  bg-muted/10" />
            </div>

            <div className="w-full">
              <form
                action={async () => {
                  "use server";
                  await signIn("google", {
                    redirect: true,
                    redirectTo: "/preferences",
                  });
                }}
              >
                <button className="bg-black/30 border-black/20 border-b-3 w-full py-4 rounded-md flex items-center pl-[20%] gap-x-10 cursor-pointer hover:bg-black/50 transition-colors duration-300">
                  <FcGoogle className="size-6" />
                  <p className="text-white"> Log in with Google</p>
                </button>
              </form>
            </div>
          </div>

          <div className="bg-black/30 py-5 px-8 rounded-b-lg flex items-center justify-center">
            <Link
              prefetch
              href="/sign-up"
              className="text-muted/70 text-[14px] font-semibold"
            >
              New? Sign up - and start playing chess
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
