export interface SessionData {
  sessionKey: string;
  userId: number;
  isGlobalAdmin: boolean;
}

export enum Tokens {
  ADD_NEW_USER = "ADD_NEW_USER",
  ADD_NEW_ACCOUNT = "ADD_NEW_ACCOUNT",
  FORGOT_PASSWORD = "FORGOT_PASSWORD",
}

export enum HTTPMethod {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PUT = "PUT",
  PATCH = "PATCH",
}
