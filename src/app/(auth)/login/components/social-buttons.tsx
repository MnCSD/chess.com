import { Separator } from "@/components/ui/separator";
import {} from "@radix-ui/react-icons";
import { FcGoogle } from "react-icons/fc";
import React from "react";
import { signIn } from "@/auth";
import { googleSignIn } from "@/app/modules/auth/login/server/google-sign-in";

interface SocialButtonsProps {
  onClick?: () => void;
}

export const SocialButtons = ({ onClick }: SocialButtonsProps) => {
  return (
    <div className="w-full mx-auto space-y-8">
      <div className="flex items-center justify-center gap-x-4 w-[90%] mx-auto">
        <Separator className="flex-1/3 bg-muted/10" />
        <span className="text-medium uppercase text-muted/40">or</span>
        <Separator className="flex-1/3  bg-muted/10" />
      </div>

      <div className="w-full">
        <form>
          <button
            onClick={() => googleSignIn()}
            className="bg-black/30 border-black/20 border-b-3 w-full py-4 rounded-md flex items-center pl-[20%] gap-x-10 cursor-pointer hover:bg-black/50 transition-colors duration-300"
          >
            <FcGoogle className="size-6" />
            <p className="text-white"> Log in with Google</p>
          </button>
        </form>
      </div>
    </div>
  );
};
