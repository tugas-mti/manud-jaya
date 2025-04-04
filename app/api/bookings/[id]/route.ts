import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { BookingStatus } from "@prisma/client";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    const { status } = await request.json();

    if (!Object.values(BookingStatus).includes(status)) {
      return NextResponse.json(
        { error: "Invalid booking status" },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.update({
      where: { id },
      data: { status: status as BookingStatus },
    });

    return NextResponse.json(booking);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update booking status" },
      { status: 500 }
    );
  }
}
