import { create } from "zustand";

type ShowAllReviewsDialogState = {
  isOpen: boolean;
};

type ShowAllReviewsDialogAction = {
  open: () => void;
  close: () => void;
};

const initialState: ShowAllReviewsDialogState = {
  isOpen: false,
};

const useShowAllReviewsDialogStore = create<
  ShowAllReviewsDialogState & ShowAllReviewsDialogAction
>((set) => ({
  ...initialState,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useShowAllReviewsDialogStore;
