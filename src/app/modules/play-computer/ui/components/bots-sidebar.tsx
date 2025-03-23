"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { bots } from "@/constants";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FlagIcon } from "react-flag-kit";
import { FlagIconCode } from "react-flag-kit";
import { cn } from "@/lib/utils";

export const BotsSidebar = () => {
  const [selectedType, setSelectedType] = useState({
    type: "",
    isOpen: false,
  });
  const [selectedBotId, setSelectedBotId] = useState<number>();

  return (
    <div className="h-full bg-sidebar w-full rounded-sm pb-10">
      <div className="relative flex items-center bg-black/30 justify-center py-3 gap-x-3">
        <Image src={"/bot.svg"} alt="Bot" width={26} height={26} />
        <h2 className="text-white font-bold text-[18px]">Play Bots</h2>
      </div>

      {/* Selected Bot Container */}
      {selectedBotId && (
        <div className="w-full pl-8 mt-6">
          <Image
            src={
              bots.beginner.find((bot) => bot.id === selectedBotId)?.image ||
              "/bot.svg"
            }
            alt="Selected Bot Image"
            width={100}
            height={100}
          />
          <div className="flex items-center gap-x-2 mt-2">
            <p className="text-white text-lg font-semibold">
              {bots.beginner.find((bot) => bot.id === selectedBotId)?.name ||
                "Bot Name"}
            </p>
            <p className="text-muted/70 text-lg">
              (
              {bots.beginner.find((bot) => bot.id === selectedBotId)?.elo ||
                "Elo"}
              )
            </p>
            <FlagIcon
              code={
                (bots.beginner.find((bot) => bot.id === selectedBotId)
                  ?.country as FlagIconCode) || "US"
              }
              size={17}
            />
          </div>
        </div>
      )}

      {/* Beginner Container */}
      <div
        className={cn(
          "bg-[#373633] w-[90%] mx-auto rounded-sm mt-3 flex flex-col h-auto cursor-pointer",
          selectedType.type === "beginner" && selectedType.isOpen && "pb-6"
        )}
      >
        <div
          className="flex items-center justify-between pr-4"
          onClick={() =>
            setSelectedType(
              selectedType.type === "beginner"
                ? { type: "", isOpen: false }
                : { type: "beginner", isOpen: true }
            )
          }
        >
          <div className="flex items-center gap-x-3 ">
            <Image
              src={bots.beginner[0].image}
              alt="Beginner bot image"
              width={50}
              height={50}
            />
            <h3 className="text-lg text-muted/80 font-bold">Beginner</h3>
          </div>
          <p className="text-sm text-muted/70 ">{bots.beginner.length} bots</p>
        </div>

        <div
          className={cn(
            "pl-3  flex items-center gap-x-4 flex-wrap",

            selectedType.type === "beginner" && selectedType.isOpen && "mt-4"
          )}
        >
          {selectedType.type === "beginner" && selectedType.isOpen && (
            <>
              {bots.beginner.map((bot, index) => (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger>
                      <div
                        key={index}
                        className={cn(
                          "flex items-center gap-x-2 size-14 rounded-sm bg-[#4B4A48] relative cursor-pointer",
                          selectedBotId === bot.id && "ring-3 ring-[#81B64C]"
                        )}
                        onClick={() => setSelectedBotId(bot.id)}
                      >
                        <Image src={bot.image} alt="Bot image" fill />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="flex items-center gap-x-1">
                        <p className="text-[15px]">{bot.name}</p>
                        <p className="text-muted/70 text-[15px]">({bot.elo})</p>
                        <FlagIcon
                          code={bot.country as FlagIconCode}
                          size={17}
                        />
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
