import type { GalleryImage } from '../components/Gallery/ImageGrid';
const images = import.meta.glob('../assets/images/gallery/*/*.jpg', {eager: true});

export const galleryImages: GalleryImage[] = Object.entries(images).map(([path, module]:[string, any]) => {
  console.log(path);
  const src = module.default;
  const folder = path.split('/')[3];
  const category = capitalize(folder) as GalleryImage['category'];
  return {src, category};
});

function capitalize(str: string): string{
  return str.charAt(0).toUpperCase()+str.slice(1);
}