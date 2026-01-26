import { create } from "zustand";

type EditPhotoDialogState = {
  isOpen: boolean;
};

type EditPhotoDialogAction = {
  open: () => void;
  close: () => void;
};

const initialState: EditPhotoDialogState = {
  isOpen: false,
};

const useEditPhotoDialogStore = create<
  EditPhotoDialogState & EditPhotoDialogAction
>((set) => ({
  ...initialState,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useEditPhotoDialogStore;
