import type { ActionFunctionArgs } from "@remix-run/node";

import { mailjet } from "../lib/mailjet";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const recipientEmail = formData.get("email");

  const senderEmail = process.env.SENDER_EMAIL;
  const fileTitle = "PDF";
  const documentLink =
    "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

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
        HTMLPart: `<h3>Vous y êtes presque</h3><p>Cliquez sur le lien en-dessous pour télécharger le ${fileTitle}</p><br/>
          <a href=${documentLink} target="_blank rel="noreferrer">Télécharger maintenant</a>`,
      },
    ],
  });

  const data = await MJRequest.then((result: any) => {
    // console.log(result.body);
    return { body: result.body, status: 201 };
  }).catch((error) => {
    console.log(error);
    return {
      error: true,
      statusCode: error.statusCode,
      providedInput: recipientEmail,
    };
  });

  return data;
}
