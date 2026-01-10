import { create } from "zustand";

type ExitDialogState = {
  isOpen: boolean;
};

type ExitDialogAction = {
  open: () => void;
  close: () => void;
};

const initialState: ExitDialogState = {
  isOpen: false,
};

const useExitDialogStore = create<ExitDialogState & ExitDialogAction>(
  (set) => ({
    ...initialState,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
  })
);

export default useExitDialogStore;
