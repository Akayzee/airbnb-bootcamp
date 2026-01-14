import { create } from "zustand";

type SecurityCameraDialogState = {
  isOpen: boolean;
};

type SecurityCameraDialogAction = {
  open: () => void;
  close: () => void;
};

const initialState: SecurityCameraDialogState = {
  isOpen: false,
};

const useSecurityCameraDialogStore = create<
  SecurityCameraDialogState & SecurityCameraDialogAction
>((set) => ({
  ...initialState,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useSecurityCameraDialogStore;
