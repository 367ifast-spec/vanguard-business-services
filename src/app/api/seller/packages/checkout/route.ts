import { NextResponse } from "next/server";

const PACKAGE_PRICES: Record<string, number> = {
  free: 0,
  verified: 10,
  bronze: 20,
  silver: 35,
  gold: 50,
  platinum: 75,
  diamond: 100,
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { packageSlug } = body;

    if (!packageSlug) {
      return NextResponse.json(
        { error: "Package slug is required." },
        { status: 400 }
      );
    }

    const price = PACKAGE_PRICES[packageSlug];

    if (price === undefined) {
      return NextResponse.json(
        { error: "Invalid package selected." },
        { status: 400 }
      );
    }

    // FREE package does not require payment.
    if (price === 0) {
      return NextResponse.json({
        success: true,
        requiresPayment: false,
        package: packageSlug,
        redirectUrl: "/seller/dashboard",
      });
    }

    // Placeholder for Stripe / NowPayments integration.
    return NextResponse.json({
      success: true,
      requiresPayment: true,
      package: packageSlug,
      amount: price,
      paymentProvider: "nowpayments",
      redirectUrl: `/payment?type=package&package=${packageSlug}`,
    });
  } catch (error) {
    console.error("Package checkout error:", error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}