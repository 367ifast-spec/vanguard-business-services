import { NextResponse } from "next/server";

export async function POST() {
  try {
    return NextResponse.json({
      success: true,
      checkoutUrl: "/checkout",
    });
  } catch (error) {
    console.error(
      "Marketplace Payment Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to create checkout session.",
      },
      {
        status: 500,
      }
    );
  }
}