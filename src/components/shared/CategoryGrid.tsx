import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TCategory } from '../../types';
import OptimizedImage from './OptimizedImage';
import LoadingSpinner from './LoadingSpinner';

interface CategoryGridProps {
  categories: TCategory[];
  onCategoryClick: (categoryId: string) => void;
}

const CategoryGrid = ({ categories, onCategoryClick }: CategoryGridProps) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [hasError, setHasError] = useState<Set<string>>(new Set());
  console.log(hasError);

  useEffect(() => {
    // Preload all images
    categories.forEach((category) => {
      const img = new Image();
      img.src = category.mainImage;

      img.onload = () => {
        setLoadedImages((prev) => new Set([...prev, category._id]));
      };

      img.onerror = () => {
        setHasError((prev) => new Set([...prev, category._id]));
      };
    });

    // Cache images using the Cache API
    if ('caches' in window) {
      caches.open('category-images').then((cache) => {
        categories.forEach((category) => {
          cache.add(category.mainImage).catch(console.error);
        });
      });
    }
  }, [categories]);

  const isLoading = loadedImages.size < categories.length;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {categories.map((category) => (
        <motion.div
          key={category._id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -10 }}
          transition={{ duration: 0.3 }}
          onClick={() => onCategoryClick(category._id)}
          className="bg-gray-900 rounded-xl overflow-hidden cursor-pointer group"
        >
          {/* Image Container */}
          <div className="aspect-[4/3] overflow-hidden">
            <OptimizedImage
              src={category.mainImage}
              alt={category.name}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              priority={categories.indexOf(category) === 0}
              onLoad={() => {
                setLoadedImages((prev) => new Set([...prev, category._id]));
              }}
              onError={() => {
                setHasError((prev) => new Set([...prev, category._id]));
              }}
            />
          </div>

          {/* Content Container */}
          <motion.div
            className="p-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-3 text-[#C69C6D]">
              {category.name}
            </h3>
            <p className="text-gray-400 line-clamp-3">{category.description}</p>

            {/* View Details Button */}
            <motion.div
              className="mt-4 inline-flex items-center text-[#C69C6D] group-hover:text-[#E5B583]"
              initial={{ x: -10, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="mr-2">View Collection</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-2 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default CategoryGrid;
