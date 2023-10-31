import type { ActionFunctionArgs } from "@remix-run/node";
import Mailjet from "node-mailjet";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const recipientEmail = formData.get("email");

  const senderEmail = "younes.pillon@dixea.com";
  const productName = "PDF";
  const documentLink =
    "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

  const mailjet = new Mailjet({
    apiKey: process.env.MJ_PUBLIC_KEY,
    apiSecret: process.env.MJ_PRIVATE_KEY,
  });

  const MJRequest = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: senderEmail,
          Name: "MyName",
        },
        To: [
          {
            Email: recipientEmail,
            Name: "YourName",
          },
        ],
        Subject: "Voici le document",
        TextPart: "Cliquez sur le lien pour télécharger le PDF",
        HTMLPart: `<h3>Vous y êtes presque</h3><p>Cliquez sur le lien en-dessous pour télécharger le ${productName}</p><br/>
          <a href=${documentLink} target="_blank rel="noreferrer">Télécharger maintenant</a>`,
      },
    ],
  });

  const data = await MJRequest.then((result: any) => {
    // console.log(result.body);
    return { body: result.body };
  }).catch((error) => {
    // console.log(error);
    return {
      error: true,
      statusCode: error.statusCode,
      providedInput: recipientEmail,
    };
  });

  // console.log("Data : " + data);
  return data;
}
