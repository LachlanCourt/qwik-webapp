import { RequestEvent } from "@builder.io/qwik-city";

export class ApiErrorHandler extends Error {
  static respond = (
    status: number,
    text: string,
    requestEvent: RequestEvent
  ): never => {
    requestEvent.text(status, text);
    throw requestEvent.error(status as any, text);
  };
}
