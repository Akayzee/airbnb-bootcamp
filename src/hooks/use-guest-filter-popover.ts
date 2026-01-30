import { create } from "zustand";

type GuestFilterPopoverState = {
  isOpen: boolean;
};

type GuestFilterPopoverAction = {
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const initialState: GuestFilterPopoverState = {
  isOpen: false,
};

const useGuestFilterPopoverStore = create<
  GuestFilterPopoverState & GuestFilterPopoverAction
>((set) => ({
  ...initialState,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useGuestFilterPopoverStore;
