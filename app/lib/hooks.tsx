import { useEffect } from "react";
import { TaskState } from "@/app/lib/form-actions";

// ayyyy macarena!
type UseHandleTaskFormModalProps = {
  formState: TaskState,
  setStatus: (type: string) => void,
  closeModal: () => void,
  openSnack: () => void
}
// logic used to handle events after create/edit/delete tasks
// once formState changes we need to set status, close modal, then open snack with status
export const useHandleTaskFormModal = ({formState, closeModal, openSnack, setStatus}: UseHandleTaskFormModalProps) => {
  useEffect(() => {
    if (!formState?.type) return;
    setStatus(formState.type);
    closeModal();
    openSnack();
  }, [formState]);
};
