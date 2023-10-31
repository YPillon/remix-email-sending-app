import type { MetaFunction } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { useEffect, useRef } from "react";
import clsx from "clsx";

export const meta: MetaFunction = () => {
  return [
    { title: "Send the Email" },
    { name: "description", content: "Entrez vite votre adresse email pour recevoir la fiche technique du conteneur !" },
  ];
};

interface DataObject {
  [key: string]: any;
}

export default function Index() {
  const fetcher = useFetcher();
  const inputRef = useRef<HTMLInputElement>(null);

  const fetcherData: DataObject = fetcher.data as DataObject;
  const isSubmittingError: boolean = fetcherData?.error;
  const providedInput = fetcherData?.providedInput;

  const isSubmitting = fetcher.state !== "idle";

  useEffect(() => {
    if (isSubmitting && inputRef.current) {
      inputRef.current.value = "";
    }
    if (
      isSubmittingError &&
      inputRef.current &&
      providedInput &&
      !isSubmitting
    ) {
      inputRef.current.value = providedInput;
    }
  }, [isSubmittingError, isSubmitting, providedInput]);

  return (
    <div className="container mx-auto flex justify-center h-screen bg-white">
      <fetcher.Form
        method="post"
        action="/email"
        className="border-2 border-solid  border-slate-700 flex flex-col w-1/2 h-52 my-auto justify-center  content-center space-y-4 rounded-xl"
      >
        <p className="text-center">
          Entrez votre adresse mail pour recevoir un lien vers la fiche PDF.
        </p>
        <div
          className={clsx(
            "w-full flex justify-center",
            isSubmittingError ? "text-red-500" : ""
          )}
        >
          <label htmlFor="email" className="ml-auto">
            Email
          </label>
          <input
            ref={inputRef}
            type="text"
            name="email"
            autoFocus
            className={clsx(
              "border-2 border-solid w-1/2 mx-auto rounded-md ml-2 focus:outline focus:outline-3 ",
              isSubmittingError
                ? "border-red-500 focus:outline-red-500"
                : "border-sky-400 focus:outline-sky-400"
            )}
          />
        </div>
        {fetcherData?.statusCode === 400 && (
          <span className="text-red-500 mx-auto">Adresse email non valide</span>
        )}

        <button
          type="submit"
          className={clsx(
            "border-solid border-2 border-sky-400 rounded-full w-fit px-4 py-2 mx-auto bg-sky-200 hover:bg-white",
            isSubmitting ? "opacity-25" : "opacity-100"
          )}
        >
          Envoyer le mail
        </button>
      </fetcher.Form>
    </div>
  );
}
