import { Command } from "@prisma/client";
import { db } from "db";

export enum CommandWebhookTypes {
  CREATE,
  UPDATE,
  DELETE,
}

enum WebhookCommandActions {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

interface WebhookCommandType extends Command {
  commandAction: WebhookCommandActions;
  type: string;
}

export const use$CommandWebhookHandler = () => {
  const send = async (commands: Array<Command>, type: CommandWebhookTypes) => {
    const registeredWebhooks = (await db.apiUser.findMany())
      .filter((apiUser) => !!apiUser.webhookUrl)
      .map((apiUser) => apiUser.webhookUrl);

    const postData: Array<WebhookCommandType> = [];
    if (
      type === CommandWebhookTypes.DELETE ||
      type === CommandWebhookTypes.UPDATE
    ) {
      postData.push({
        commandAction: WebhookCommandActions.DELETE,
        ...commands[0],
        type: "simple_response",
      });
    }
    if (
      type === CommandWebhookTypes.CREATE ||
      type === CommandWebhookTypes.UPDATE
    ) {
      postData.push({
        commandAction: WebhookCommandActions.CREATE,
        ...(commands[1] ? commands[1] : commands[0]),
        type: "simple_response",
      });
    }

    registeredWebhooks.forEach(async (url) => {
      try {
        await fetch(url, { method: "POST", body: JSON.stringify(postData) });
      } catch (e) {
        console.error(`Fetch failed to URL ${url}`);
        console.error(e);
      }
    });
  };
  return send;
};
