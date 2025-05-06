import { motion } from 'framer-motion';
import { TProduct } from '../../types';
import OptimizedImage from './OptimizedImage';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import EmptyState from './EmptyState';

interface ProductGridProps {
  products: TProduct[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  onProductClick: (productId: string) => void;
  categoryName: string;
}

const ProductGrid = ({ products, loading, error, onProductClick, categoryName }: ProductGridProps) => {
  if (loading === 'pending') {
    return <LoadingSpinner />;
  }

  if (loading === 'failed' && error) {
    return <ErrorMessage message={error} />;
  }

  if (!products || products.length === 0) {
    return (
      <EmptyState 
        title={`No products in ${categoryName}`}
        description="No products have been added to this category yet"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <motion.div
          key={product._id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -10 }}
          transition={{ duration: 0.3 }}
          onClick={() => onProductClick(product._id)}
          className="bg-gray-900 rounded-xl overflow-hidden cursor-pointer group"
        >
          {/* Image Container */}
          <div className="aspect-[4/3] overflow-hidden">
            <OptimizedImage
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
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
              {product.name}
            </h3>
            <p className="text-gray-400 line-clamp-3">
              {product.description}
            </p>
            
            {/* View Details Button */}
            <motion.div
              className="mt-4 inline-flex items-center text-[#C69C6D] group-hover:text-[#E5B583]"
              initial={{ x: -10, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="mr-2">View Details</span>
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

export default ProductGrid;