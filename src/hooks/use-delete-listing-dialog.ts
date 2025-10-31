import { create } from "zustand";

type DeleteListingDialogState = {
  isOpen: boolean;
};

type DeleteListingDialogAction = {
  open: () => void;
  close: () => void;
};

const initialState: DeleteListingDialogState = {
  isOpen: false,
};

const useDeleteListingDialogStore = create<
  DeleteListingDialogState & DeleteListingDialogAction
>((set) => ({
  ...initialState,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useDeleteListingDialogStore;
