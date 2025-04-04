import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { TimeSlot } from "@prisma/client";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const tourId = (await params).id;
    const body = await request.json();

    // Validate required fields
    if (!body.userEmail || !body.date || !body.timeSlot || !body.guests) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email: body.userEmail },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get tour to check availability and calculate price
    const tour = await prisma.tour.findUnique({
      where: { id: tourId },
    });

    if (!tour) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 });
    }

    // Validate number of guests
    if (body.guests < tour.minGuests || body.guests > tour.maxGuests) {
      return NextResponse.json(
        { error: "Invalid number of guests" },
        { status: 400 }
      );
    }

    // Calculate total price
    const totalPrice = tour.price * body.guests;

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        tourId: tourId,
        date: new Date(body.date),
        timeSlot: body.timeSlot as TimeSlot,
        guests: body.guests,
        price: totalPrice,
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Error creating booking" },
      { status: 500 }
    );
  }
}
