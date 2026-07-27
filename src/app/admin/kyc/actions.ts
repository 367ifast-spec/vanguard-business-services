"use server";

import { revalidatePath } from "next/cache";

import { supabase } from "@/lib/supabase";

async function getKYCSubmission(id: string) {
  const { data, error } = await supabase
    .from("seller_kyc")
    .select("id, user_id, status")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(
      `Failed to load KYC submission: ${error.message}`
    );
  }

  if (!data) {
    throw new Error("KYC submission not found.");
  }

  return data;
}

export async function approveKYC(id: string) {
  if (!id) {
    throw new Error("KYC submission ID is required.");
  }

  const submission = await getKYCSubmission(id);

  const { error } = await supabase
    .from("seller_kyc")
    .update({
      status: "approved",
    })
    .eq("id", id);

  if (error) {
    throw new Error(
      `Failed to approve KYC: ${error.message}`
    );
  }

  if (submission.user_id) {
    const { error: notificationError } = await supabase
      .from("notifications")
      .insert({
        user_id: submission.user_id,
        title: "KYC Approved",
        message:
          "Your identity verification has been approved.",
      });

    if (notificationError) {
      console.error(
        "Failed to create KYC approval notification:",
        notificationError.message
      );
    }
  }

  revalidatePath("/admin/kyc");
  revalidatePath(`/admin/kyc/${id}`);
  revalidatePath("/seller/kyc");
  revalidatePath("/seller/dashboard");
}

export async function rejectKYC(
  id: string,
  reason = "Your KYC submission was rejected. Please resubmit."
) {
  if (!id) {
    throw new Error("KYC submission ID is required.");
  }

  const submission = await getKYCSubmission(id);

  const { error } = await supabase
    .from("seller_kyc")
    .update({
      status: "rejected",
    })
    .eq("id", id);

  if (error) {
    throw new Error(
      `Failed to reject KYC: ${error.message}`
    );
  }

  if (submission.user_id) {
    const { error: notificationError } = await supabase
      .from("notifications")
      .insert({
        user_id: submission.user_id,
        title: "KYC Rejected",
        message: reason,
      });

    if (notificationError) {
      console.error(
        "Failed to create KYC rejection notification:",
        notificationError.message
      );
    }
  }

  revalidatePath("/admin/kyc");
  revalidatePath(`/admin/kyc/${id}`);
  revalidatePath("/seller/kyc");
  revalidatePath("/seller/dashboard");
}