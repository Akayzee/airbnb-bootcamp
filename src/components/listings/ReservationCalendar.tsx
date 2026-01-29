import React from "react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { DateRange } from "react-day-picker";
import { differenceInCalendarDays, format, isWithinInterval } from "date-fns";
import useReservationCalendarStore from "@/hooks/use-reservation-calendar-store";
import { Reservation } from "../../../generated/prisma";
import { useIsMobile } from "@/hooks/use-mobile";

type Props = {
  reservations: Reservation[];
  location: string | null;
};

const ReservationCalendar = ({ reservations, location }: Props) => {
  const { setDate, date } = useReservationCalendarStore();
  const isMobile = useIsMobile();
  const handleReset = () => {
    setDate({
      from: undefined,
      to: undefined,
    });
  };
  const handleSelect = (selected: DateRange | undefined) => {
    setDate({
      from: selected?.from || undefined,
      to: selected?.to || undefined,
    });
  };
  const handleApply = () => {
    if (date) {
      setDate(date);
    }
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Disable past dates
    if (date < today) return true;

    // Disable dates within existing reservations
    return reservations.some((reservation) => {
      const checkIn = new Date(reservation.checkInDate);
      const checkOut = new Date(reservation.checkOutDate);

      return isWithinInterval(date, {
        start: checkIn,
        end: checkOut,
      });
    });
  };

  const numberOfNights =
    date?.from && date?.to ? differenceInCalendarDays(date.to, date.from) : 0;

  const dateRangeText =
    date?.from && date?.to
      ? `${format(date.from, "MMM dd")} - ${format(date.to, "MMM dd, yyyy")}`
      : null;

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-xl font-bold">
          {date?.to
            ? `${numberOfNights} ${numberOfNights === 1 ? "night" : "nights"} in ${location}`
            : date?.from
              ? "Select Check-out date"
              : "Select check-in date"}
        </p>
        <p className="text-xs text-muted-foreground">
          {dateRangeText || "Add your travel dates for exact pricing"}
        </p>
      </div>
      <Calendar
        mode="range"
        defaultMonth={date?.from}
        selected={date}
        onSelect={handleSelect}
        numberOfMonths={isMobile ? 1 : 2}
        min={1}
        disabled={isDateDisabled}
        excludeDisabled
        className="w-full"
      />
      <div className="flex items-center justify-end gap-1.5 border-t border-border p-3">
        <Button variant="outline" onClick={handleReset}>
          Clear Dates
        </Button>
        {/* <Button onClick={handleApply}>Apply</Button> */}
      </div>
    </div>
  );
};

export default ReservationCalendar;
