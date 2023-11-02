import type { ActionFunctionArgs } from "@remix-run/node";

import { mailjet } from "../lib/mailjet";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const email = formData.get("email");

  const MJContactRequest = mailjet.post("contact").request({
    Email: email,
    IsExcludedFromCampaigns: "false",
    Name: "New Contact",
  });

  let data = await MJContactRequest.then((result: any) => {
    console.log(result.body);
    return { body: result.body };
  }).catch((error) => {
    console.log(error);
    return {
      error: true,
      statusCode: error.statusCode,
      statusText: error.statusText,
      providedInput: email,
    };
  });

  // Return data and doesn't run the second request in case of an error
  if (typeof "error" in data) {
    return data;
  }

  const MJSubscribeRequest = mailjet.post("listrecipient").request({
    IsUnsubscribed: "false",
    ContactAlt: email,
    ListId: "98946",
  });

  data = await MJSubscribeRequest.then((result: any) => {
    console.log(result.body);
    return { body: result.body };
  }).catch((error) => {
    console.log(error);
    return {
      error: true,
      statusCode: error.statusCode,
      statusText: error.statusText,
      providedInput: email,
    };
  });

  // console.log("Data : " + data);
  return data;
}
