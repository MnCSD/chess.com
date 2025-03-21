"use client";

import { LoginSchema } from "@/schemas";
import Link from "next/link";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LockIcon, User2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormError } from "./form-error";
import { SocialButtons } from "./social-buttons";
import { cn } from "@/lib/utils";
import { login } from "@/app/modules/auth/login/server/login";

export const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values).then((data) => {
        if (data) {
          setError(data.error);
          setSuccess(data.success);
        }
      });
    });
  };

  return (
    <div className="">
      <div className="p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative w-full  py-2 pl-2 bg-background border border-muted/20 rounded-xs">
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
                      <div className="relative w-full py-2 pl-2 bg-background border border-muted/20 rounded-xs">
                        <LockIcon className="size-6 fill-muted/20 text-muted/20" />
                        <Input
                          {...field}
                          type="password"
                          className="absolute top-0 right-0 w-[calc(100%-30px)] border-none bg-background ring-0 outline-0  h-full placeholder:text-muted/40 text-white"
                          placeholder="Password"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end mt-3">
              <Link
                prefetch
                href="/forgot-password"
                className="text-muted/70 text-[13px] underline"
              >
                Forgot password?
              </Link>
            </div>

            <div className={cn("mt-18 flex flex-col gap-y-3", error && "mt-8")}>
              {error && <FormError message={error} />}

              <Button
                type="submit"
                variant={"main"}
                className="w-full py-7 border-b-5 border-[#45753c] cursor-pointer rounded-md text-2xl font-bold "
              >
                Log In
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
