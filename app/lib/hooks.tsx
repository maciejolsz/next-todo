import { useEffect } from "react";
import { TaskState } from "@/app/lib/form-actions";

// ayyyy macarena!
type UseHandleTaskFormModalProps = {
  formState: TaskState,
  setStatus: (type: string) => void,
  closeModal: () => void,
  openSnack: () => void
}
export const useHandleTaskFormModal = ({formState, closeModal, openSnack, setStatus}: UseHandleTaskFormModalProps) => {
  useEffect(() => {
    if (!formState?.type) return;
    setStatus(formState.type);
    closeModal();
    openSnack();
  }, [formState]);
};
