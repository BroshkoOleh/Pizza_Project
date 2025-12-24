import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const ingredients = await prisma.ingredient.findMany();

    return NextResponse.json({ ingredients });
  } catch (e) {
    console.log(e);
    return NextResponse.error();
  }
}
