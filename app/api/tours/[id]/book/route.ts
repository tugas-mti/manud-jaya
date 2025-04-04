import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { TimeSlot } from "@prisma/client";
import { sendMail } from "@/lib/send-mail";

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

    const html = `
          <p>Hello,</p>
          <p>Thank you for booking with us!</p>
          <p>Your booking details:</p>
          <ul>
            <li>Booking ID: ${booking.id}</li>
            <li>Tour: ${tour.title}</li>
            <li>Date: ${booking.date}</li>
            <li>Time Slot: ${booking.timeSlot}</li>
            <li>Guests: ${booking.guests}</li>
            <li>Total Price: $${totalPrice}</li>
          </ul>

          <p> Please bring your booking confirmation email to the tour. Payment can be made on the day of the tour.</p>
          <p>If you need to make any changes or cancellations, please contact us at least 24 hours in advance.</p>
          <p>We look forward to seeing you!</p>
          <p>If you have any questions, feel free to contact us.</p>
          <p>Best regards,</p>
        `;

    sendMail({
      to: user.email!,
      subject: "Booking Confirmation",
      html,
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
