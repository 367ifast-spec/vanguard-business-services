"use server";

import {
  approveMarketplaceListing,
  rejectMarketplaceListing,
} from "@/lib/marketplace";

export async function approveListingAction(
  id: string
) {
  try {
    const listing =
      await approveMarketplaceListing(id);

    return {
      success: true,
      listing,
    };
  } catch (error) {
    console.error(
      "Approve Listing Error:",
      error
    );

    return {
      success: false,
      error: "Failed to approve listing.",
    };
  }
}

export async function rejectListingAction(
  id: string
) {
  try {
    const listing =
      await rejectMarketplaceListing(id);

    return {
      success: true,
      listing,
    };
  } catch (error) {
    console.error(
      "Reject Listing Error:",
      error
    );

    return {
      success: false,
      error: "Failed to reject listing.",
    };
  }
}