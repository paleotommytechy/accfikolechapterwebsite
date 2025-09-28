import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Img from "../assets/images/agailio.jpg";
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import ImageGrid from "../components/Gallery/ImageGrid"; 
import { supabase } from "../lib/supabaseClient"; 

// The Supabase data type
interface SupabaseImage {
  id: number;
  image_url: string;
  title: string;
  category: string; 
}

// ✨ THE ONLY CHANGE IS HERE ✨
// The type your ImageGrid component now expects
interface GalleryImage {
  src: string;
  category: string; // This now correctly matches the type in ImageGrid.tsx
}

const GalleryPage: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const { data, error } = await supabase
          .from('gallery_images')
          .select('id, image_url, title, category')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        if (data) {
          const formattedImages = data.map((image: SupabaseImage) => ({
            src: image.image_url,
            category: image.category,
          }));
          setImages(formattedImages);
        }
      } catch (err: any) {
        console.error('Error fetching images:', err);
        setError('Failed to load the gallery. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // No changes needed in the return() statement
  return (
    <>
      <Navbar />
      <div 
        className="d-flex align-items-center text-white z-1 mb-0"
        style={{
          position: 'relative',
          height: '50vh',
          background: `url(${Img})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'center',
          borderRadius: '0 0 15px 15px'
        }}>
        <div style={{margin:'240px 0 0 50px'}}>
          <h1>GALLERY</h1>
          <p>
            <Link to="/" className="text-white fw-bold text-decoration-none fs-6">HOME</Link>
            &nbsp;&nbsp;|| &nbsp;&nbsp;
            <Link to='/gallery' className="text-white fw-bold text-decoration-none fs-6">
              GALLERY
            </Link>
          </p>
        </div>
      </div>
      <div className="container py-5">
        <section className="py-5 text-center">
          <div className="container">
            <h2 className="display-5 fw-bold" data-aos="fade-down">
              Moments in His Presence
            </h2>
            <p className="lead text-muted" data-aos="fade-up">
              Explore beautiful highlights from our fellowship – Unity, Worship, and Grace.
            </p>
          </div>
        </section>
        
        {loading && <p className="text-center">Loading gallery...</p>}
        {error && <p className="text-center text-danger">{error}</p>}
        
        {!loading && !error && images.length > 0 && (
          <ImageGrid images={images} />
        )}

        {!loading && !error && images.length === 0 && (
          <p className="text-center text-muted">The gallery is currently empty.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default GalleryPage;