import { Account, Command } from "@prisma/client";
import { WebhookNotificationType, use$Webhook } from "./use$Webhook";

export const use$EditAccountWebhookHandler = () => {
  const send = async (account: Account, commands: Array<Command>) => {
    const sendToWebhooks = use$Webhook();
    await sendToWebhooks(
      { name: account.name, accountId: account.id, commands: commands },
      WebhookNotificationType.NEW_ACCOUNT
    );
  };

  return send;
};
