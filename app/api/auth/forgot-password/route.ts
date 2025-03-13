import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/send-mail";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const exists = await prisma.user.findUnique({
      where: { email },
    });

    if (!exists) {
      return NextResponse.json(
        { error: "No user found with that email" },
        { status: 404 }
      );
    }

    const token = Math.random().toString(36).substring(2, 10);
    await prisma.user.update({
      where: { email },
      data: {
        resetPasswordToken: token,
        resetPasswordExpires: new Date(Date.now() + 3600000),
      },
    });

    const html = `
      <p>Click the link below to reset your password</p>
      <a href="${process.env.NEXTAUTH_URL}/reset-password?token=${token}">Reset Password</a>
    `;

    const sendMaiResponse = sendMail({
      to: email,
      subject: "Reset your password",
      text: "Click the link to reset your password",
      html,
    });

    return NextResponse.json({ message: "Password reset email sent" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
