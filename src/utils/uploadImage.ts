import { supabase } from "../services/supabase";

// uri = caminho da imagem local
export async function uploadImageAsync(uri: string, path: string) {
  const response = await fetch(uri);
  const blob = await response.blob();

  const { data, error } = await supabase.storage
    .from("avatars") // nome do bucket
    .upload(path, blob, {
      upsert: true,
      contentType: "image/jpeg",
    });

  if (error) {
    console.error("Erro ao enviar imagem:", error);
    throw error;
  }

  const { data: publicUrlData } = supabase.storage
    .from("avatars")
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
}
