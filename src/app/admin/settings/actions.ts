"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase";


export async function updateSetting(
  key: string,
  value: string
) {

  if (!supabaseAdmin) {
    throw new Error(
      "Supabase is not configured."
    );
  }


  const cleanKey =
    key.trim();


  const cleanValue =
    value.trim();



  if (!cleanKey) {
    throw new Error(
      "Setting key is required."
    );
  }



  const { data: existing } =
    await supabaseAdmin
      .from("settings")
      .select("id")
      .eq(
        "key",
        cleanKey
      )
      .maybeSingle();



  if (existing) {


    const { error } =
      await supabaseAdmin
        .from("settings")
        .update({

          value: cleanValue,

          updated_at:
            new Date()
              .toISOString(),

        })
        .eq(
          "id",
          existing.id
        );



    if (error) {

      throw new Error(
        error.message
      );

    }


  } else {


    const { error } =
      await supabaseAdmin
        .from("settings")
        .insert({

          key: cleanKey,

          value: cleanValue,

        });



    if (error) {

      throw new Error(
        error.message
      );

    }


  }



  revalidatePath(
    "/admin/settings"
  );

}