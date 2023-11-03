import { useFetcher } from "@remix-run/react";
import { useEffect, useRef } from "react";
import clsx from "clsx";

import type { DataObject, FormProps } from "~/lib/type";

export default function Form(props: FormProps) {
  const fetcher = useFetcher();
  const inputRef = useRef<HTMLInputElement>(null);
  const isRequestSuccessfulRef = useRef<HTMLSpanElement>(null);

  const fetcherData: DataObject = fetcher.data as DataObject;

  const isSubmitting: boolean = fetcher.state !== "idle";
  const isRequestSuccessful: boolean = fetcherData?.status === 201;
  const isSubmittingError: boolean = fetcherData?.error;
  const providedInput: null | string = fetcherData?.providedInput;
  const isEmailAlreadyExisting: boolean = fetcherData?.statusText
    ? fetcherData.statusText.includes("already exists")
    : false;

  // Empty the input, but if error, reffills it with the provided email address
  useEffect(() => {
    if (isSubmitting && inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.blur();
    }
    if (
      isSubmittingError &&
      inputRef.current &&
      providedInput &&
      !isSubmitting
    ) {
      inputRef.current.value = providedInput;
      inputRef.current.focus();
    }
  }, [isSubmittingError, isSubmitting, providedInput]);

  // Makes the check mark appear
  useEffect(() => {
    if (isRequestSuccessful && isRequestSuccessfulRef.current) {
      isRequestSuccessfulRef.current.style.display = "inline";
    }
  });

  return (
    <fetcher.Form
      method="post"
      action={props.route}
      className="border-2 border-solid  border-slate-700 flex flex-col w-1/2 h-52 my-4 justify-center content-center space-y-4 rounded-xl"
    >
      <p className="text-center">{props.title}</p>
      <div
        className={clsx(
          "w-full flex justify-center",
          isSubmittingError ? "text-red-500" : ""
        )}
      >
        <label htmlFor="email" className="ml-auto relative">
          <span
            ref={isRequestSuccessfulRef}
            className="mx-auto absolute -left-7 hidden"
          >
            ✔️
          </span>
          Email
        </label>
        <input
          ref={inputRef}
          type="text"
          name="email"
          onFocus={() => {
            // Makes the check mark disappear
            if (isRequestSuccessfulRef.current) {
              isRequestSuccessfulRef.current.style.display = "none";
            }
          }}
          className={clsx(
            "border-2 border-solid w-1/2 mx-auto rounded-md ml-2 focus:outline focus:outline-3 ",
            isSubmittingError
              ? "border-red-500 focus:outline-red-500"
              : "border-sky-400 focus:outline-sky-400"
          )}
        />
      </div>
      {fetcherData?.statusCode === 400 && !isEmailAlreadyExisting && (
        <span className="text-red-500 mx-auto">Adresse email non valide</span>
      )}
      {fetcherData?.statusCode === 400 && isEmailAlreadyExisting && (
        <span className="text-red-500 mx-auto">
          Vous êtes déjà inscrit à la newsletter
        </span>
      )}

      <button
        type="submit"
        className={clsx(
          "border-solid border-2 border-sky-400 rounded-full w-fit px-4 py-2 mx-auto bg-sky-200 hover:bg-white",
          isSubmitting ? "opacity-25" : "opacity-100"
        )}
      >
        {props.callToAction}
      </button>
    </fetcher.Form>
  );
}
