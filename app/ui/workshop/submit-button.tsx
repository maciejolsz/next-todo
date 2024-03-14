import { useFormStatus } from "react-dom";

import { Button } from "@mui/material";

type SubmitButtonProps = {
  size?: "mini" | "full";
  text?: string;
  textAlt?: string;
}

export default function SubmitButton({ size,
                                       text = "Submit",
                                       textAlt = "Submitting..."}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  const getSize = () => {
    if (size === "mini") return;

    return { width: "100%" }
  }

  return <Button type={"submit"}
                 disabled={pending}
                 color={"primary"}
                 sx={getSize()}
                 >
    {!pending ? text : textAlt }
  </Button>
}
