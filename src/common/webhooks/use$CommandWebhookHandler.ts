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
    const registeredWebhooks = (await db.apiUser.findMany()).filter(
      (apiUser) => !!apiUser.webhookUrl
    );

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

    registeredWebhooks.forEach(async (apiUser) => {
      try {
        await fetch(apiUser.webhookUrl, {
          method: "POST",
          body: JSON.stringify(postData),
          headers: { Authorization: apiUser.webhookServerId },
        });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(`Fetch failed to URL ${apiUser.webhookUrl}`);
        // eslint-disable-next-line no-console
        console.error(e);
      }
    });
  };
  return send;
};
