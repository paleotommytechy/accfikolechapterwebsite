export interface Blog {
  id: string;
  title: string;
  body: string;
  category?: string;
  author_name: string;
  author_avatar_url: string;
  date: string;
  image_url?: string;
  thumbnail_url?: string;
  featured: boolean;
}
