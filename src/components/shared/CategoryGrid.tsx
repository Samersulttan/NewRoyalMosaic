import { motion } from 'framer-motion';
import { TCategory } from '../../types';
import OptimizedImage from './OptimizedImage';

interface CategoryGridProps {
  categories: TCategory[];
  onCategoryClick: (categoryId: string) => void;
}

const CategoryGrid = ({ categories, onCategoryClick }: CategoryGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {categories.map((category) => (
        <motion.div
          key={category._id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="relative group cursor-pointer"
          onClick={() => onCategoryClick(category._id)}
        >
          <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg">
            <OptimizedImage
              src={category.mainImage}
              alt={category.name}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
            <h3 className="text-2xl font-bold text-white/90 bg-black/20 px-6 py-3 rounded-lg backdrop-blur-sm">
              {category.name}
            </h3>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CategoryGrid;