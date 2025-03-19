import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LogInIcon, Settings, UserPlus2Icon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface AuthButtonProps {
  isMobile?: boolean;
  isMobilePersonal?: boolean;
}

export const AuthButton = ({
  isMobile = false,
  isMobilePersonal = false,
}: AuthButtonProps) => {
  return (
    <div
      className={cn(
        "mt-5 flex flex-col gap-y-2.5",
        isMobile && "flex-row gap-x-1.5 mt-1 items-center"
      )}
    >
      <Link prefetch href="/sign-up">
        <Button
          variant={"main"}
          className={cn(
            "w-full py-5 border-b-3 border-[#45753c] cursor-pointer rounded-sm xl:flex hidden",
            isMobile && "w-16 mx-auto flex items-center justify-center py-1"
          )}
        >
          Sign Up
        </Button>
      </Link>

      {!isMobile && (
        <Link prefetch href="/sign-up">
          {" "}
          <Button
            variant={"main"}
            className={cn(
              "w-[85%] mx-auto py-5 cursor-pointer rounded-sm xl:hidden flex items-center justify-center"
            )}
          >
            {isMobilePersonal ? (
              <UserPlus2Icon className="size-5 text-white" strokeWidth={3} />
            ) : (
              <>Sign Up</>
            )}
          </Button>
        </Link>
      )}

      <Link prefetch href="/login">
        <Button
          variant={"alternate"}
          className={cn(
            "w-full py-5 cursor-pointer rounded-sm xl:flex hidden",
            isMobile && "w-16 mx-auto flex items-center justify-center py-0"
          )}
        >
          Log In
        </Button>
      </Link>

      {!isMobile && (
        <Link prefetch href="/login">
          <Button
            variant={"alternate"}
            className="w-[85%] mx-auto py-5 cursor-pointer rounded-sm xl:hidden flex items-center justify-center"
          >
            {isMobilePersonal ? (
              <LogInIcon className="size-5 text-white" strokeWidth={3} />
            ) : (
              <>Log In</>
            )}
          </Button>
        </Link>
      )}

      {isMobile && <Settings className="size-6 text-muted/50 cursor-pointer" />}
    </div>
  );
};
