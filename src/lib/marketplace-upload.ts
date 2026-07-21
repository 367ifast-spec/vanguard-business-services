import { supabase } from "@/lib/supabase";

export async function uploadMarketplaceImage(
  file: File
) {
  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("marketplace-images")
    .upload(fileName, file);

  if (error) {
    throw error;
  }

  const {
    data: { publicUrl },
  } = supabase.storage
    .from("marketplace-images")
    .getPublicUrl(fileName);

  return publicUrl;
}