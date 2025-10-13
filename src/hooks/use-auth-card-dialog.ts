import { create } from "zustand";

type AuthCardState = {
  isOpen: boolean;
};

type AuthCardAction = {
  open: () => void;
  close: () => void;
};

const initialState: AuthCardState = {
  isOpen: false,
};

const useAuthCardDialogStore = create<AuthCardState & AuthCardAction>(
  (set) => ({
    ...initialState,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
  })
);

export default useAuthCardDialogStore;
