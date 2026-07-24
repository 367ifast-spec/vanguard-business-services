import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      sellerId,
      packageSlug,
      paymentId,
      amountPaid,
    } = body;

    if (!sellerId || !packageSlug) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // TODO:
    // 1. Insert into seller_subscriptions
    // 2. Assign seller_badges
    // 3. Update seller verification status if needed
    // 4. Log package activation

    return NextResponse.json({
      success: true,
      message: "Package activated successfully.",
      data: {
        sellerId,
        packageSlug,
        paymentId,
        amountPaid,
      },
    });
  } catch (error) {
    console.error("Package success error:", error);

    return NextResponse.json(
      {
        error: "Internal server error.",
      },
      {
        status: 500,
      }
    );
  }
}