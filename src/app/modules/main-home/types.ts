import { User } from "next-auth";

type UserSecondaryInfo = {
  country: string;
  level: number;
};

export type UserInfo = User & UserSecondaryInfo;
