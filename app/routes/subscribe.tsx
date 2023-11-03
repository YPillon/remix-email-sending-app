import type { ActionFunctionArgs } from "@remix-run/node";

import type { DataObject } from "~/lib/type";
import { mailjet } from "../lib/mailjet";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  let data: DataObject;

  // Check if contact exists
  const MJRequest = mailjet.get("contact").request({}, { Email: email });

  const response: DataObject = await MJRequest.then((result) => {
    return result.body;
  }).catch((error) => {
    return error;
  });

  // If contact doesn't exist then create one
  if (response.Count === 0) {
    const MJContactRequest = mailjet.post("contact").request({
      Email: email,
      IsExcludedFromCampaigns: "false",
      Name: "New Contact",
    });

    data = await MJContactRequest.then((result: any) => {
      return { body: result.body };
    }).catch((error) => {
      return {
        error: true,
        statusCode: error.statusCode,
        statusText: error.statusText,
        providedInput: email,
      };
    });

    if ("error" in data) {
      return data;
    }
  }

  const MJSubscribeRequest = mailjet.post("listrecipient").request({
    IsUnsubscribed: "false",
    ContactAlt: email,
    ListId: "98946",
  });

  data = await MJSubscribeRequest.then((result: any) => {
    // console.log(result.body);
    return { body: result.body, status: 201 };
  }).catch((error) => {
    //console.log(error);
    return {
      error: true,
      statusCode: error.statusCode,
      statusText: error.statusText,
      providedInput: email,
    };
  });

  return data;
}
