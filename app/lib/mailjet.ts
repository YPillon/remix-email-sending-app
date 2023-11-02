import Mailjet from "node-mailjet";

export const mailjet = new Mailjet({
  apiKey: process.env.MJ_PUBLIC_KEY,
  apiSecret: process.env.MJ_PRIVATE_KEY,
});
