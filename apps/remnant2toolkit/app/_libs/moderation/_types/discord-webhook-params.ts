export type DiscordWebhookParams = {
  embeds: Array<{
    title: string;
    color: number;
    fields: Array<{
      name: string;
      value: string;
    }>;
  }>;
};
