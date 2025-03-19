import Image from "next/image";
import React from "react";
import { SignUpSteps } from "./components/sign-up-steps";
import { FcGoogle } from "react-icons/fc";
import { Separator } from "@/components/ui/separator";
import { signIn } from "@/auth";

interface PageProps {
  searchParams: Promise<{ categoryId?: string }>;
}

const Page = async ({ searchParams }: PageProps) => {
  return (
    <main className="bg-background w-full h-screen max-w-[460px] mx-auto flex justify-center pt-4">
      <div className="flex flex-col items-center gap-y-6">
        <Image src={"/logo_chess.png"} width={158} height={44} alt="Logo" />

        <SignUpSteps />

        <div className="flex items-center justify-center gap-x-4 w-[90%] mx-auto">
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
                redirectTo: "/",
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
    </main>
  );
};

export default Page;
