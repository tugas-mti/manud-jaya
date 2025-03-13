import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

type LoginBody = {
  email: string;
  password: string;
  name: string;
  idNumber: string;
  phoneNumber: string;
  dateOfBirth: string;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name, idNumber, phoneNumber, dateOfBirth } =
      body as LoginBody;

    const exists = await prisma.user.findUnique({
      where: { email },
    });

    if (exists) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        idNumber,
        phoneNumber,
        dateOfBirth: new Date(dateOfBirth),
      },
    });

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        dateOfBirth: user.dateOfBirth,
        idNumber: user.idNumber,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
