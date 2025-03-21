import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ChevronRightIcon, MinusIcon } from "lucide-react";
import React from "react";
import { FlagIcon, FlagIconCode } from "react-flag-kit";
import { UserInfo } from "../../types";
import Link from "next/link";

interface UserInfoProps {
  user: UserInfo;
}

export const HistorySection = ({ user }: UserInfoProps) => {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_21rem] gap-x-4">
      <div className="grid-cols-1 bg-sidebar rounded-sm pt-3">
        <div className="flex items-center justify-between px-8 pb-2">
          <h2 className="text-lg font-semibold text-white">Game History</h2>
          <button className="text-sm text-white">
            <ChevronRightIcon
              className="size-6 text-muted/60"
              strokeWidth={4}
            />
          </button>
        </div>

        <div>
          <Table>
            <TableHeader>
              <TableRow className="border-none bg-black/20">
                <TableHead className="px-10"></TableHead>
                <TableHead className="pl-6 w-[310px] text-[12px] text-white font-light">
                  Players
                </TableHead>
                <TableHead className="text-[12px] text-white font-light max-w-[90px] px-6">
                  Result
                </TableHead>
                <TableHead className="text-[12px] text-white font-light max-w-[90px] px-6">
                  Accuracy
                </TableHead>
                <TableHead className="text-[12px] text-white font-light max-w-[90px] px-6">
                  Moves
                </TableHead>
                <TableHead className="text-[12px] w-[150px] text-end pr-6 text-white font-light">
                  Date
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="">
              {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index} className="border-b-muted/10 ">
                  <TableCell className="py-6.5">
                    <div className="flex items-center justify-center gap-4">
                      Type
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-x-1">
                      <div className="bg-white size-[9px] rounded-[2px]" />
                      <p className="text-white/90">mariosnikolopoylos</p>
                      <p className="text-muted/50">(518)</p>
                      <FlagIcon
                        code={"US" as FlagIconCode}
                        size={17}
                        className="rounded-xs"
                      />
                    </div>
                    <div className="flex items-center gap-x-1">
                      <div className="bg-muted/20 size-[9px]  rounded-[2px]" />
                      <p className="text-white/90">{user.name}</p>
                      <p className="text-muted/50">(518)</p>
                      <FlagIcon
                        code={user.country as FlagIconCode}
                        size={17}
                        className="rounded-xs"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="px-6">
                    <div className="flex items-center gap-x-3">
                      <div>
                        <p className="text-muted/50">0</p>
                        <p className="text-muted/50">1</p>
                      </div>

                      <div className="size-3.5 bg-red-500 flex items-center justify-center rounded-xs">
                        <MinusIcon className="size-3 text-black" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-6">
                    <Link
                      prefetch
                      href="/analysis/game/123"
                      className="text-blue-400"
                    >
                      Review
                    </Link>
                  </TableCell>
                  <TableCell className="px-6">
                    <p className="text-white/80">50</p>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <p className="text-white/80">Mar 12, 2025</p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="grid-cols-2">Hey</div>
    </div>
  );
};
