import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/send-mail";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const accommodationID = (await params).id;
    const body = await request.json();

    // Validate required fields
    if (
      !body.userEmail ||
      !body.checkInDate ||
      !body.checkOutDate ||
      !body.specialRequests ||
      !body.guests
    ) {
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

    // Get accommodation to check availability and calculate price
    const accommodation = await prisma.accommodation.findUnique({
      where: { id: accommodationID },
    });

    if (!accommodation) {
      return NextResponse.json(
        { error: "accommodation not found" },
        { status: 404 }
      );
    }

    // Calculate total price
    const totalPrice = accommodation.price ?? 0 * body.guests;

    // Create booking
    const booking = await prisma.bookingAccommodation.create({
      data: {
        userId: user.id,
        accommodationId: accommodation.id,
        checkInDate: new Date(body.checkInDate),
        checkOutDate: new Date(body.checkOutDate),
        specialRequests: body.specialRequests,
        numberOfGuests: body.guests,
        price: totalPrice,
        status: "PENDING",
      },
    });

    const html = `
          <p>Hello,</p>
          <p>Thank you for booking with us!</p>
          <p>Your booking details are as follows:</p>

          <p>Accommodation: ${accommodation.name}</p>
          <p>Check-in Date: ${body.checkInDate}</p>
          <p>Check-out Date: ${body.checkOutDate}</p>
          <p>Number of Guests: ${body.guests}</p>
          <p>Special Requests: ${body.specialRequests}</p>
          <p>Total Price: ${totalPrice}</p>

          <p>Booking ID: ${booking.id}</p>
          <p>Booking Status: ${booking.status}</p>
          

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
