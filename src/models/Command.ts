import { Action } from "@prisma/client";

export interface CommandPageData {
  id: number;
  accountId: number;
  name: string;
  actions: Array<Action>;
}
