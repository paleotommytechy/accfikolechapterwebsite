// src/components/Gallery/ImageGrid.tsx
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Loader from './common/Loader'
import LightboxModal from "./LightboxModal";
import "./ImageGrid.css";

/** ------------  Types ------------- */
export type Category = "All" | "Sunday" | "Outreach" | "Events" ;

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
    preload();
  }, [images]);

  /* update visibleImages when category changes */
  useEffect(() => {
    if (selectedCategory === "All") setVisibleImages(images);
    else {
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
        {(["All", "Sunday", "Outreach", "Events"] as Category[]).map((cat) => (
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

      {/* ---------- Image Grid ---------- */}
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

      {/* ---------- Lightbox ---------- */}
      {activeImg && (
        <LightboxModal image={activeImg} onClose={() => setActiveImg(null)} />
      )}
    </>
  );
};

export default ImageGrid;
