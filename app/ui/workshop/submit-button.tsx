import { useFormStatus } from "react-dom";

import { Button } from "@mui/material";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return <Button type={"submit"}
                 disabled={pending}
                 color={"secondary"}
                 sx={{width: "100%"}}
                 >
    {!pending ? "Submit" : "Submitting..." }
  </Button>
}
