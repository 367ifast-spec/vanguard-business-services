import { NextResponse } from "next/server";
import { getCartCount } from "@/app/cart/actions";

export async function GET() {
  try {
    const count = await getCartCount();

    return NextResponse.json({
      count,
    });
  } catch {
    return NextResponse.json({
      count: 0,
    });
  }
}