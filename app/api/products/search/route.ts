import prisma from "@/shared/lib/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // console.log(req.nextUrl.searchParams.get("query"));

  const query = req.nextUrl.searchParams.get("query") || "";

  try {
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
      take: 5,
    });
    return NextResponse.json({ products });
  } catch (e) {
    console.log(e);
    return NextResponse.error();
  }
}
