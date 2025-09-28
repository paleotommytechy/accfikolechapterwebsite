// src/components/Gallery/ImageGrid.tsx
import React, { useEffect, useState, useMemo } from "react"; // Import useMemo
import AOS from "aos";
import "aos/dist/aos.css";
import Loader from './common/Loader'
import LightboxModal from "./LightboxModal";
import "./ImageGrid.css";

/** ------------  Types ------------- */
// ✨ STEP 1: Change the Category type to be a flexible string
export type Category = string;

export interface GalleryImage {
  src: string;
  category: Category;
}

interface ImageGridProps {
  images: GalleryImage[];
}

/** ------------  Component ------------- */
const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [visibleImages, setVisibleImages] = useState<GalleryImage[]>(images);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState<string | null>(null);

  // ✨ STEP 2: Dynamically create the list of categories
  // useMemo ensures this logic only re-runs when the 'images' prop changes.
  const categories = useMemo(() => {
    // 1. Get all category values from the images
    const allCats = images.map((img) => img.category);
    // 2. Use a Set to get only the unique category names
    const uniqueCats = [...new Set(allCats)];
    // 3. Add "All" to the beginning of the list for the filter button
    return ["All", ...uniqueCats];
  }, [images]); // Dependency array: this code runs if 'images' changes

  /* initialise AOS once */
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  /* preload images once on mount */
  useEffect(() => {
    const preload = async () => {
      await Promise.all(
        images.map(
          (img) =>
            new Promise<void>((resolve) => {
              const i = new Image();
              i.src = img.src;
              i.onload = i.onerror = () => resolve();
            })
        )
      );
      setLoading(false);
    };
    if (images.length > 0) {
        preload();
    } else {
        setLoading(false);
    }
  }, [images]);

  /* update visibleImages when category changes */
  useEffect(() => {
    if (selectedCategory === "All") {
      setVisibleImages(images);
    } else {
      setVisibleImages(
        images.filter((img) => img.category === selectedCategory)
      );
    }
  }, [selectedCategory, images]);

  /* ---- Render ---- */
  if (loading) return <Loader />;

  return (
    <>
      {/* ---------- Filter Buttons ---------- */}
      <div className="text-center mb-4" data-aos="fade-down">
        {/* ✨ STEP 3: Map over the new dynamic 'categories' array */}
        {categories.map((cat) => (
          <button
            key={cat}
            className={`btn btn-sm mx-2 ${
              selectedCategory === cat ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ---------- Image Grid (No changes here) ---------- */}
      <div className="row g-3">
        {visibleImages.map((img, idx) => (
          <div
            className="col-6 col-sm-4 col-md-3"
            key={`${img.src}-${idx}`}
            data-aos="zoom-in-up"
          >
            <div
              className="image-card position-relative overflow-hidden rounded-4 shadow-sm"
              onClick={() => setActiveImg(img.src)}
            >
              <img
                src={img.src}
                alt={img.category}
                className="img-fluid rounded-4 gallery-img"
              />
              <span className="overlay d-flex justify-content-center align-items-center">
                View
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ---------- Lightbox (No changes here)---------- */}
      {activeImg && (
        <LightboxModal image={activeImg} onClose={() => setActiveImg(null)} />
      )}
    </>
  );
};

export default ImageGrid;