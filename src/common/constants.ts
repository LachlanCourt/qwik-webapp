export interface SessionData {
  sessionKey: string;
  userId: number;
}

export enum Tokens {
  ADD_NEW_USER = "ADD_NEW_USER",
  ADD_NEW_ACCOUNT = "ADD_NEW_ACCOUNT"
}
