import { User } from "@prisma/client";

export interface AccountPageData {
  accountId: number;
  name: string;
  moderators: Array<User>
  isAdmin: boolean
}

export interface EditAccountData {
  id: number;
  name: string
}