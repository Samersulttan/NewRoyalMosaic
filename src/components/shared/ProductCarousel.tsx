import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { TProduct } from '../../types';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import EmptyState from './EmptyState';

interface ProductCarouselProps {
  isOpen: boolean;
  onClose: () => void;
  products: TProduct[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  selectedImageIndex: number;
  onImageChange: (index: number) => void;
  categoryName: string;
}

const ProductCarousel = ({
  isOpen,
  onClose,
  products,
  loading,
  error,
  selectedImageIndex,
  onImageChange,
  categoryName
}: ProductCarouselProps) => {
  const getAllProductImages = () => {
    if (!products) return [];
    
    return products.reduce((acc, product) => {
      if (product.images && Array.isArray(product.images)) {
        const productImages = product.images.map(image => ({
          image,
          productName: product.name,
          productDescription: product.description
        }));
        return [...acc, ...productImages];
      }
      return acc;
    }, [] as Array<{ image: string; productName: string; productDescription: string }>);
  };

  const allProductImages = getAllProductImages();

  const handlePrevImage = () => {
    onImageChange(selectedImageIndex === 0 ? allProductImages.length - 1 : selectedImageIndex - 1);
  };

  const handleNextImage = () => {
    onImageChange(selectedImageIndex === allProductImages.length - 1 ? 0 : selectedImageIndex + 1);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4 sm:p-8"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white p-2 hover:text-gray-300 z-50 bg-black/50 rounded-full backdrop-blur-sm"
          >
            <IoClose size={24} />
          </button>

          <div className="w-full max-w-6xl mx-auto">
            {loading === 'pending' ? (
              <LoadingSpinner />
            ) : loading === 'failed' ? (
              <ErrorMessage message={error || 'Failed to load products'} />
            ) : !products || products.length === 0 ? (
              <EmptyState 
                title="No Products Available"
                description="No products available for this category"
              />
            ) : (
              <div className="flex flex-col h-[90vh]">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
                  {categoryName}
                </h2>
                
                <div className="flex flex-1 gap-4 min-h-0">
                  {/* Vertical Thumbnails */}
                  <div className="hidden sm:flex flex-col gap-2 overflow-y-auto w-16 md:w-20 py-2">
                    {allProductImages.map((item, index) => (
                      <motion.div
                        key={index}
                        className={`aspect-square cursor-pointer relative ${
                          selectedImageIndex === index ? 'ring-2 ring-white' : ''
                        }`}
                        onClick={() => onImageChange(index)}
                        whileHover={{ scale: 1.05 }}
                      >
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-full h-full object-cover rounded-sm"
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 flex flex-col min-h-0">
                    {/* Image Container */}
                    <div className="relative flex-1 min-h-0 bg-black/30 rounded-lg overflow-hidden">
                      <motion.div
                        key={selectedImageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <img
                          src={allProductImages[selectedImageIndex]?.image}
                          alt={allProductImages[selectedImageIndex]?.productName}
                          className="max-w-full max-h-full object-contain"
                        />
                      </motion.div>

                      {/* Mobile Thumbnails */}
                      <div className="sm:hidden absolute bottom-20 left-0 right-0 flex justify-center gap-2 px-4">
                        {allProductImages.map((_, index) => (
                          <button
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all ${
                              selectedImageIndex === index ? 'bg-white scale-150' : 'bg-gray-500'
                            }`}
                            onClick={() => onImageChange(index)}
                          />
                        ))}
                      </div>
                      
                      {/* Navigation Buttons */}
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white w-8 h-8 rounded-full hover:bg-black/70 transition-colors flex items-center justify-center"
                      >
                        ←
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white w-8 h-8 rounded-full hover:bg-black/70 transition-colors flex items-center justify-center"
                      >
                        →
                      </button>

                      {/* Caption */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                        <h3 className="text-xl font-bold mb-2">
                          {allProductImages[selectedImageIndex]?.productName}
                        </h3>
                        <p className="text-sm text-gray-200">
                          {allProductImages[selectedImageIndex]?.productDescription}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductCarousel;