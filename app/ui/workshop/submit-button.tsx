import { useFormStatus } from "react-dom";

import { Button } from "@mui/material";

export default function SubmitButton({size}: {size: "mini" | "full"}) {
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
    {!pending ? "Submit" : "Submitting..." }
  </Button>
}
