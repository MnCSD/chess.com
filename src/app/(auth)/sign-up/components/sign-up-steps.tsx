"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState, useTransition } from "react";
import { SocialButtons } from "../../login/components/social-buttons";
import { useRouter, useSearchParams } from "next/navigation";
import { levels } from "@/constants";
import { cn } from "@/lib/utils";
import { CheckIcon, LockIcon, User2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "@/schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { register } from "@/app/modules/auth/register/server/register";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormError } from "../../login/components/form-error";

export const SignUpSteps = () => {
  const searchParams = useSearchParams();
  const step = searchParams.get("step");
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [selectedLevel, setSelectedLevel] = useState<number>(0);
  const router = useRouter();

  const handlePress = (option: string) => {
    const url = new URL(window.location.href);

    url.searchParams.set("step", option);

    router.push(url.toString());
  };

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });

    router.push("/login");
  };

  if (!step) {
    return (
      <div className="space-y-6">
        <h2 className="text-[38px] text-white text-center font-bold">
          Create your Chess.com account
        </h2>

        <div className="mt-4">
          <Image src={"/pawn.svg"} width={460} height={44} alt="Pawn" />
        </div>

        <Button
          type="button"
          variant={"main"}
          className="w-full py-8 border-b-5 border-[#45753c] cursor-pointer rounded-lg text-2xl font-bold mt-4 "
          onClick={() => handlePress("login-info")}
        >
          Sign Up
        </Button>

        {/* <SocialButtons /> */}
      </div>
    );
  }

  if (step === "skill-level") {
    return (
      <div className="space-y-6 flex flex-col items-center">
        <h2 className="text-[38px] text-white text-center font-bold">
          What is your chess skill level?
        </h2>

        <p className="text-lg text-muted/70 font-semibold">
          A starting point for match pairings
        </p>

        {levels.map((level) => (
          <div
            key={level.id}
            className={cn(
              "w-full bg-sidebar rounded-md p-8 flex items-center justify-between py-7.5 cursor-pointer",
              selectedLevel === level.id && "ring-[#81b64c]/60 ring-2"
            )}
            onClick={() => setSelectedLevel(level.id)}
          >
            <div className="flex items-center gap-x-2">
              <div>
                <p className="text-white font-semibold">{level.name}</p>
                {level.id === 1 && (
                  <p className="text-[#81b64c] text-[12px]">Most Common</p>
                )}
              </div>

              {selectedLevel === level.id && (
                <CheckIcon
                  className="size-5.5 text-[#81b64c]"
                  strokeWidth={6}
                />
              )}
            </div>

            <div className="w-[30px] h-[30px]">
              <level.icon
                fill={selectedLevel === level.id ? "#81b64c" : "#ffffff"}
              />
            </div>
          </div>
        ))}

        <Button
          type="button"
          onClick={() => handlePress("login-info")}
          variant={"main"}
          className="w-full py-8 border-b-5 border-[#45753c] cursor-pointer rounded-lg text-2xl font-bold mt-6"
        >
          Continue
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 flex flex-col items-center w-full">
      <h2 className="text-[38px] text-white text-center font-bold">
        Enter your email and a password
      </h2>

      <p className="text-[19px] text-muted/70 font-semibold">
        This allows you to log in on any device
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-6">
          <div className="space-y-2 w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative w-full py-3 pl-2 bg-muted/10 border border-muted/20 rounded-xs">
                      <User2Icon className="size-6 fill-muted/20 text-muted/20" />
                      <Input
                        {...field}
                        className="absolute top-0 right-0 w-[calc(100%-30px)] border-none bg-transparent ring-0 outline-0  h-full placeholder:text-muted/40 text-white"
                        placeholder="Name"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative w-full py-3 pl-2 bg-muted/10 border border-muted/20 rounded-xs">
                      <User2Icon className="size-6 fill-muted/20 text-muted/20" />
                      <Input
                        {...field}
                        className="absolute top-0 right-0 w-[calc(100%-30px)] border-none bg-transparent ring-0 outline-0  h-full placeholder:text-muted/40 text-white"
                        placeholder="Email"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative w-full py-3 pl-2 bg-muted/10 border border-muted/20 rounded-xs">
                      <LockIcon className="size-6 fill-muted/20 text-muted/20" />
                      <Input
                        {...field}
                        type="password"
                        className="absolute top-0 right-0 w-[calc(100%-30px)] border-none bg-transparent ring-0 outline-0  h-full placeholder:text-muted/40 text-white"
                        placeholder="Password"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />
          </div>

          <div className={cn("mt-8 flex flex-col gap-y-3", error && "mt-8")}>
            {error && <FormError message={error} />}

            <Button
              type="submit"
              variant={"main"}
              className="w-full py-8 border-b-5 border-[#45753c] cursor-pointer rounded-md text-2xl font-bold "
            >
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
