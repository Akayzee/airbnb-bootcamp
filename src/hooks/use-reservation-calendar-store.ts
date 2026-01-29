import { DateRange } from "react-day-picker";
import { create } from "zustand";

type ReservationCalendarState = {
  date: DateRange | undefined;
};

type ReservationCalendarActions = {
  setDate: (date: DateRange | undefined) => void;
  reset: () => void;
};

const initialState: ReservationCalendarState = {
  date: {
    from: undefined,
    to: undefined,
  },
};

const useReservationCalendarStore = create<
  ReservationCalendarState & ReservationCalendarActions
>((set) => ({
  ...initialState,
  setDate: (date) => set({ date }),
  reset: () => set(initialState),
}));

export default useReservationCalendarStore;
