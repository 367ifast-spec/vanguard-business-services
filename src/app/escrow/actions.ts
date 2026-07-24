"use server";

import {
  releaseEscrow,
  completeEscrow,
  disputeEscrow,
} from "@/lib/escrow";

export async function releaseEscrowAction(
  id: string
) {
  try {
    await releaseEscrow(id);

    return {
      success: true,
      message: "Escrow payment released successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to release escrow payment.",
    };
  }
}

export async function completeEscrowAction(
  id: string
) {
  try {
    await completeEscrow(id);

    return {
      success: true,
      message: "Escrow marked as completed.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to complete escrow.",
    };
  }
}

export async function disputeEscrowAction(
  id: string
) {
  try {
    await disputeEscrow(id);

    return {
      success: true,
      message: "Escrow dispute opened successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to open escrow dispute.",
    };
  }
}