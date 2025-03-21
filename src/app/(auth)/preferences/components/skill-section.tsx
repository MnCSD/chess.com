"use client";

import { Button } from "@/components/ui/button";
import { levels } from "@/constants";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import axios from "axios";
import React, { useEffect, useState, useTransition } from "react";
import { updatePreferences } from "@/app/modules/preferences/server/update-preferences";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const SkillSection = () => {
  const [selectedLevel, setSelectedLevel] = useState<number>(0);
  const [country, setCountry] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    axios
      .get(
        "https://geo.ipify.org/api/v2/country?apiKey=at_Rkmm2B4GNlAReiWc605tfc3eFuWpt"
      )
      .then((res) => setCountry(res?.data?.location?.country))
      .catch((err) => console.log(err));
  }, [country]);

  const onSubmit = () => {
    startTransition(() => {
      updatePreferences(country, selectedLevel).then((data) => {
        if (data.success) {
          router.push("/home");
        }
      });
    });
  };

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
              <CheckIcon className="size-5.5 text-[#81b64c]" strokeWidth={6} />
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
        variant={"main"}
        onClick={onSubmit}
        className="w-full py-8 border-b-5 border-[#45753c] cursor-pointer rounded-lg text-2xl font-bold mt-6"
      >
        Continue
      </Button>
    </div>
  );
};
