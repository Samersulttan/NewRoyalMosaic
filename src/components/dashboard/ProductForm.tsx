import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { actCreateProduct, resetProductCreateStatus } from '../../store/products/productsSlice';
import { actGetCategories } from '../../store/categories/categoriesSlice';
import { compressImage } from '../../utils/imageCompression';
import ProductList from './ProductList';

const ProductForm = () => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { records: categories } = useAppSelector((state) => state.categories);
  const { createStatus, createError } = useAppSelector((state) => state.products);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    images: [] as File[],
    categoryId: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    dispatch(actGetCategories());
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      try {
        setIsProcessing(true);
        const files = Array.from(e.target.files);
        
        // Validate file types
        const invalidFiles = files.filter(file => !file.type.startsWith('image/'));
        if (invalidFiles.length > 0) {
          throw new Error('Please select only image files');
        }

        // Compress images
        const compressedFiles = await Promise.all(
          files.map(file => compressImage(file))
        );

        setFormData(prev => ({ ...prev, images: compressedFiles }));
      } catch (error) {
        enqueueSnackbar(error instanceof Error ? error.message : 'Error processing images', {
          variant: 'error',
          style: { backgroundColor: '#EF4444', color: 'white' }
        });
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.images.length === 0) {
      enqueueSnackbar('الرجاء اختيار صور للمنتج', { 
        variant: 'error',
        style: { backgroundColor: '#EF4444', color: 'white' }
      });
      return;
    }

    if (!formData.categoryId) {
      enqueueSnackbar('الرجاء اختيار الفئة', { 
        variant: 'error',
        style: { backgroundColor: '#EF4444', color: 'white' }
      });
      return;
    }

    try {
      await dispatch(actCreateProduct({
        name: formData.name,
        description: formData.description,
        images: formData.images,
        categoryId: formData.categoryId
      })).unwrap();

      enqueueSnackbar('تم إضافة المنتج بنجاح', {
        variant: 'success',
        style: { backgroundColor: '#10B981', color: 'white' }
      });

      setFormData({ name: '', description: '', images: [], categoryId: '' });
    } catch (error) {
      enqueueSnackbar(error as string, {
        variant: 'error',
        style: { backgroundColor: '#EF4444', color: 'white' }
      });
    } finally {
      dispatch(resetProductCreateStatus());
    }
  };

  const isSubmitting = createStatus === 'pending' || isProcessing;

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-black p-8 rounded-lg shadow-lg space-y-6" dir="rtl">
        <h2 className="text-2xl font-bold mb-6 text-center">إضافة منتج جديد</h2>

        <div>
          <label className="block text-sm font-medium mb-2">الفئة</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={isSubmitting}
          >
            <option value="">اختر الفئة</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">اسم المنتج</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">وصف المنتج</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">صور المنتج</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={isSubmitting}
          />
          <p className="text-gray-400 text-sm mt-1">
            {isProcessing ? 'جاري معالجة الصور...' : 'يمكنك اختيار عدة صور للمنتج'}
          </p>
        </div>

        <motion.button
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 rounded-md transition-all duration-200 ${
            isSubmitting
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin h-5 w-5 mr-3 border-2 border-white rounded-full border-t-transparent" />
              {isProcessing ? 'جاري معالجة الصور...' : 'جاري الإضافة...'}
            </div>
          ) : (
            'إضافة المنتج'
          )}
        </motion.button>
      </form>

      <ProductList />
    </>
  );
};

export default ProductForm;