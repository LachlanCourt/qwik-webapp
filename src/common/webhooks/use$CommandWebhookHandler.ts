import { Command } from "@prisma/client";
import { WebhookNotificationType, use$Webhook } from "./use$Webhook";

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

    const sendToWebhooks = use$Webhook();
    await sendToWebhooks(postData, WebhookNotificationType.COMMAND);
  };
  return send;
};
