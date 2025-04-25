import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    console.log("Fetching youtube config");
    const youtube = await prisma.youtube.findFirst();
    console.log("Youtube config:", youtube);
    if (!youtube) {
      return NextResponse.json({ error: "Youtube not found" }, { status: 404 });
    }

    return NextResponse.json({
      data: youtube,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch youtube" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const youtube = await prisma.youtube.findFirst();
    if (!youtube) {
      return NextResponse.json({ error: "Youtube not found" }, { status: 404 });
    }
    const updatedYoutube = await prisma.youtube.update({
      where: { id: youtube.id },
      data: body,
    });
    return NextResponse.json({ data: updatedYoutube });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create youtube" },
      { status: 500 }
    );
  }
}
