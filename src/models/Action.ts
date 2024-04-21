export interface Action {
  type: string;
  id?: number;
  commandId?: number;
  order?: number | null;
  content: string;
}
