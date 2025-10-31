import { create } from "zustand";

type EditListingDialogState = {
  isOpen: boolean;
};

type EditListingDialogAction = {
  open: () => void;
  close: () => void;
};

const initialState: EditListingDialogState = {
  isOpen: false,
};

const useEditListingDialogStore = create<
  EditListingDialogState & EditListingDialogAction
>((set) => ({
  ...initialState,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useEditListingDialogStore;
