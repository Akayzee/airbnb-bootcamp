import { create } from "zustand";

type GuestFilterPopoverReservationState = {
  isOpen: boolean;
};

type GuestFilterPopoverReservationAction = {
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const initialState: GuestFilterPopoverReservationState = {
  isOpen: false,
};

const useGuestFilterPopoverReservationStore = create<
  GuestFilterPopoverReservationState & GuestFilterPopoverReservationAction
>((set) => ({
  ...initialState,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useGuestFilterPopoverReservationStore;
