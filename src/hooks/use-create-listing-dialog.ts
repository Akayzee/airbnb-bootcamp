import { create } from "zustand";

type CreateListingDialogState = {
  isOpen: boolean;
};

type CreateListingDialogAction = {
  open: () => void;
  close: () => void;
};

const initialState: CreateListingDialogState = {
  isOpen: false,
};

const useCreateListingDialogStore = create<
  CreateListingDialogState & CreateListingDialogAction
>((set) => ({
  ...initialState,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useCreateListingDialogStore;
