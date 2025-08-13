// data/gallery.ts
import { supabase } from "../lib/supabaseClient";

export interface GalleryImage {
  src: string;
  categories: string[];
  title: string;
}

export async function fetchGalleryImages(): Promise<GalleryImage[]> {
  const { data } = await supabase.from("gallery_images").select("*").order("created_at", { ascending: false });
  return data?.map(img => ({
    src: img.image_url,
    categories: img.categories,
    title: img.title
  })) || [];
}
