import { ActionType } from "./ActionType";

export interface Action {
  type: ActionType;
  id?: number;
  commandId?: number;
  order?: number | null;
  content: string;
}
