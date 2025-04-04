import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

// GET all users with pagination
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        idNumber: true,
        phoneNumber: true,
        dateOfBirth: true,
        isAdmin: true,
        createdAt: true,
        updatedAt: true,
      },
      take: limit,
      skip: skip,
    });
    const total = await prisma.user.count();

    return NextResponse.json({
      data: users,
      meta: { total, page, limit },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching users" },
      { status: 500 }
    );
  }
}

// POST new user
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const hashedPassword = await hash(body.password, 12);

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
        idNumber: body.idNumber,
        phoneNumber: body.phoneNumber,
        dateOfBirth: body.dateOfBirth,
        isAdmin: body.isAdmin || false,
      },
    });

    const { password, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}

// PUT update user
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const updateData: any = { ...body };

    if (body.password) {
      updateData.password = await hash(body.password, 12);
    }

    const user = await prisma.user.update({
      where: { id: body.id },
      data: updateData,
    });

    const { password, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    return NextResponse.json({ error: "Error updating user" }, { status: 500 });
  }
}

// DELETE user
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting user" }, { status: 500 });
  }
}
