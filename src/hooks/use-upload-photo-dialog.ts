import { create } from "zustand";

type UploadPhotoDialogState = {
  isOpen: boolean;
};

type UploadPhotoDialogAction = {
  open: () => void;
  close: () => void;
};

const initialState: UploadPhotoDialogState = {
  isOpen: false,
};

const useUploadPhotoDialogStore = create<
  UploadPhotoDialogState & UploadPhotoDialogAction
>((set) => ({
  ...initialState,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useUploadPhotoDialogStore;
