import { create } from "zustand";

type EditPhotoState = {
  photoId: string;
  photoUrl: string;
  photoCaption: string | null;
  photoPublicId: string;
};

type EditPhotoActions = {
  setPhotoId: (photoId: string) => void;
  setPhotoUrl: (photoUrl: string) => void;
  setPhotoCaption: (photoCaption: string | null) => void;
  setPhotoPublicId: (setPhotoPublicId: string) => void;
  reset: () => void;
};

const initialState: EditPhotoState = {
  photoId: "",
  photoCaption: "",
  photoUrl: "",
  photoPublicId: "",
};

const useEditPhotoStore = create<EditPhotoState & EditPhotoActions>((set) => ({
  ...initialState,
  setPhotoId: (photoId) => set({ photoId: photoId }),
  setPhotoCaption: (photoCaption) => set({ photoCaption: photoCaption }),
  setPhotoUrl: (photoUrl) => set({ photoUrl: photoUrl }),
  setPhotoPublicId: (photoPublicId) => set({ photoPublicId: photoPublicId }),
  reset: () => set(initialState),
}));

export default useEditPhotoStore;
