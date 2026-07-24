"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

export async function approveKYC(id: string) {
  const { error } = await supabase
    .from("kyc_submissions")
    .update({
      status: "approved",
      admin_notes: "KYC approved by admin.",
    })
    .eq("id", id);

  if (error) {
    throw new Error(
      `Failed to approve KYC: ${error.message}`
    );
  }

  // Optional notification
  const { data: submission } = await supabase
    .from("kyc_submissions")
    .select("user_id")
    .eq("id", id)
    .single();

  if (submission?.user_id) {
    await supabase.from("notifications").insert({
      user_id: submission.user_id,
      title: "KYC Approved",
      message:
        "Your identity verification has been approved.",
    });
  }

  revalidatePath("/admin/kyc");
}

export async function rejectKYC(
  id: string,
  reason = "Your KYC submission was rejected. Please resubmit."
) {
  const { error } = await supabase
    .from("kyc_submissions")
    .update({
      status: "rejected",
      admin_notes: reason,
    })
    .eq("id", id);

  if (error) {
    throw new Error(
      `Failed to reject KYC: ${error.message}`
    );
  }

  // Optional notification
  const { data: submission } = await supabase
    .from("kyc_submissions")
    .select("user_id")
    .eq("id", id)
    .single();

  if (submission?.user_id) {
    await supabase.from("notifications").insert({
      user_id: submission.user_id,
      title: "KYC Rejected",
      message: reason,
    });
  }

  revalidatePath("/admin/kyc");
}