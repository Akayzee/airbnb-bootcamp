import { create } from "zustand";

type GuestFilterState = {
  adultsCount: number;
  childrenCount: number;
  infantsCount: number;
  petsCount: number;
};

type GuestFilterActions = {
  increaseAdultsCount: () => void;
  decreaseAdultsCount: () => void;
  increaseChildrenCount: () => void;
  decreaseChildrenCount: () => void;
  increaseInfantsCount: () => void;
  decreaseInfantsCount: () => void;
  increasePetsCount: () => void;
  decreasePetsCount: () => void;
  reset: () => void;
};

const initialState: GuestFilterState = {
  adultsCount: 0,
  childrenCount: 0,
  infantsCount: 0,
  petsCount: 0,
};

const useGuestFilterStore = create<GuestFilterState & GuestFilterActions>(
  (set) => ({
    ...initialState,
    increaseAdultsCount: () =>
      set((state) => ({ adultsCount: state.adultsCount + 1 })),
    decreaseAdultsCount: () =>
      set((state) => ({ adultsCount: Math.max(state.adultsCount - 1, 0) })),
    increaseChildrenCount: () =>
      set((state) => ({ childrenCount: state.childrenCount + 1 })),
    decreaseChildrenCount: () =>
      set((state) => ({ childrenCount: Math.max(state.childrenCount - 1, 0) })),
    increaseInfantsCount: () =>
      set((state) => ({ infantsCount: state.infantsCount + 1 })),
    decreaseInfantsCount: () =>
      set((state) => ({ infantsCount: Math.max(state.infantsCount - 1, 0) })),
    increasePetsCount: () =>
      set((state) => ({ petsCount: state.petsCount + 1 })),
    decreasePetsCount: () =>
      set((state) => ({ petsCount: Math.max(state.petsCount - 1, 0) })),
    reset: () => set(initialState),
  })
);

export default useGuestFilterStore;
