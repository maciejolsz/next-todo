import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import Link from "next/link";
import { Roboto_Slab } from "next/font/google";

import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar} from "@mui/material";

import { archiveAllDoneTasks } from "@/app/lib/form-actions";
import { kebabToText } from "@/app/lib/helpers";
import { TaskStatusType } from "@/app/lib/types";
import SubmitButton from "@/app/ui/workshop/submit-button";

const robotoSlab = Roboto_Slab({ subsets: ['latin'] });

export default function TaskListHeader({type}: {type: TaskStatusType}) {
  const [openSnack, setOpenSnack] = useState(false);
  const [status, setStatus] = useState("");
  const [archiveFormState, archiveFormAction] = useFormState(archiveAllDoneTasks, null);
  // confirmation dialog
  const [openModal, setOpenModal] = useState(false);

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (!archiveFormState?.type) return;
    setOpenSnack(true);
    setStatus(archiveFormState?.type);
    setOpenModal(false);

  }, [archiveFormState]);

  return <div className={`mb-2 flex align-bottom justify-between`}>
    <div className={`text-lg capitalize  ${robotoSlab.className}`}>
      { kebabToText(type) }
    </div>
    <div>
      { type==="on-it" &&
        <div className={"pt-1"}>
          <Link href={"/workshop/pomodoro"} className={"underline font-bold"}>{"Let's get to work!"}</Link>
        </div>
      }

      { type==="done" &&
        <div>
          <Button size={"small"} onClick={handleClickOpenModal}>
            Archive All
          </Button>
          <Dialog
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Archive all done tasks?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {"You won't be able to restore them nor preview done tasks anymore."}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal} color={"secondary"}>Disagree</Button>
              <form action={archiveFormAction}>
                <SubmitButton size={"mini"} text={"Archive All Done Tasks"} textAlt={"Archiving..."}/>
              </form>
            </DialogActions>
          </Dialog>
        </div>
      }
    </div>

    <Snackbar
      open={openSnack}
      autoHideDuration={6000}
      onClose={() => setOpenSnack(false)}
      message={status === "success" ? "SUCCESS" : "FAILURE"}
    />
  </div>
}
