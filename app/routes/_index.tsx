import type { MetaFunction } from "@remix-run/node";
import Form from "~/components/Form";

export const meta: MetaFunction = () => {
  return [
    { title: "Email sending app" },
    {
      name: "description",
      content:
        "Entrez votre adresse email pour recevoir un dummy PDF ou vous inscrire à la newsletter !",
    },
  ];
};

export default function Index() {
  return (
    <div className="container mx-auto flex flex-col justify-center items-center h-screen bg-white">
      <h1 className="mb-16 text-4xl font-medium text-sky-900 drop-shadow-xl">Testez notre implémentation de l'API de Mailjet.com</h1>
      <Form
        title="Entrez votre adresse mail pour recevoir un lien vers la fiche PDF."
        callToAction="Recevoir la fiche"
        route="/sendPDF"
      />
      <Form
        title="Entrez votre adresse email pour vous inscrire à la newsletter."
        callToAction="M'inscrire à la newsletter"
        route="/subscribe"
      />
    </div>
  );
}
