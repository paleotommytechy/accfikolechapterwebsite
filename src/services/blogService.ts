import { supabase } from '../lib/supabaseClient';
import type  { Blog } from '../types/blog';

export async function fetchBlogs(): Promise<Blog[]> {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('date', { ascending: false });

  if (error) throw error;
  return data;
}
