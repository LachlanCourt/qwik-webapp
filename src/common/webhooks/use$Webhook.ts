import { db } from "db";

export enum WebhookNotificationType {
  COMMAND = "COMMAND",
  NEW_ACCOUNT = "NEW_ACCOUNT",
}

export const use$Webhook = () => {
  const send = async (
    postData: object,
    notificationType: WebhookNotificationType
  ) => {
    const registeredWebhooks = (await db.apiUser.findMany()).filter(
      (apiUser) => !!apiUser.webhookUrl
    );

    registeredWebhooks.forEach(async (apiUser) => {
      try {
        await fetch(apiUser.webhookUrl, {
          method: "POST",
          body: JSON.stringify({ type: notificationType, data: postData }),
          headers: { Authorization: apiUser.webhookServerId },
        });
      } catch (e: any) {
        if (e?.cause?.code === "ECONNREFUSED") {
          // eslint-disable-next-line no-console
          console.error("Webhook unavailable");
        } else {
          // eslint-disable-next-line no-console
          console.error(`Fetch failed to URL ${apiUser.webhookUrl}`);
          // eslint-disable-next-line no-console
          console.error(e);
        }
      }
    });
  };

  return send;
};
