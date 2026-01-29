"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type ReservationProps = {
  listingId: string;
  guestId: string;
  checkInDate: Date;
  checkOutDate: Date;
  totalPrice: number;
  nights: number;
  pricePerNight: number;
};

export const createReservation = async ({
  listingId,
  guestId,
  checkInDate,
  checkOutDate,
  totalPrice,
  nights,
  pricePerNight,
}: ReservationProps) => {
  try {
    const reservation = await prisma.reservation.create({
      data: {
        listingId,
        guestId,
        checkInDate,
        checkOutDate,
        totalPrice,
        nights,
        pricePerNight,
      },
    });

    if (!reservation) {
      throw new Error();
    }
    revalidatePath(`/listings/${listingId}`);
    return {
      success: true,
      message: "Reservation created successfully",
    };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Unexpected error occurred" };
  }
};
