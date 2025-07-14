import precious from '../assets/images/executives/precious.jpg'
import tolu from '../assets/images/executives/toluwanimi.jpg'
import blog1 from '../assets/images/agailio.jpg'
import blog2 from '../assets/images/logos.jpg'
import blog3 from '../assets/images/judah.jpg'

export type Blog = {
  id: string;
  title: string;
  body: string;
  category: string;
  author: { name: string; avatar: string };
  date: string;       // ISO yyyy‑mm‑dd
  image: string;      // hero/featured
  thumbnail: string;  // card size
  featured?: boolean;
};

export const blogs: Blog[] = [
  {
    id: "faith‑101",
    title: "How to Strengthen Yourself on Campus",
    body: "Discover daily habits that can help you grow spiritually…",
    category: "Faith",
    author: { name: "Brother Precious A.", avatar: precious },
    date: "2025-07-01",
    image: blog1,
    thumbnail: blog1,
    featured: false,
  },
  {
    id: "communion-101",
    title: "Walking in God’s Purpose",
    body: "God’s purpose for your life isn’t hidden—learn…",
    category: "Communion",
    author: { name: "Brother Toluwanimi A.", avatar: tolu},
    date: "2025-06-01",
    image: blog2,
    thumbnail: blog2,
    featured: false,
  },
  {
    id: "realtionship-101",
    title: "God is Love",
    body: "Love is a must for all believers…",
    category: "Relationship",
    author: { name: "Brother Ifeoluwa 0.", avatar: tolu},
    date: "2025-07-12",
    image: blog3,
    thumbnail: blog3,
    featured: true,
  },
];
