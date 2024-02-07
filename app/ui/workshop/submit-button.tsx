import { useFormStatus } from "react-dom";

import { twMerge } from "tailwind-merge";

import { Button } from "@mui/material";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return <Button type={"submit"}
                 disabled={pending}
                 className={twMerge("button-bw w-full disabled:bg-orange-rgb disabled:opacity-80 disabled:text-white-rgb")}>
    {!pending ? "Submit" : "Submitting..." }
  </Button>
}
