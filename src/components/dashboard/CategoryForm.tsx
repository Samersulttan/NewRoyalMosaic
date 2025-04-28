import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { actCreateCategory, resetCategoryCreateStatus } from '../../store/categories/categoriesSlice';
import { actGetDepartments } from '../../store/departments/departmentsSlice';
import { compressImage } from '../../utils/imageCompression';
import CategoryList from './CategoryList';

const CategoryForm = () => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { records: departments } = useAppSelector((state) => state.departments);
  const { createStatus} = useAppSelector((state) => state.categories);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    mainImage: null as File | null,
    departmentId: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    dispatch(actGetDepartments());
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        setIsProcessing(true);
        const file = e.target.files[0];

        // Validate file type
        if (!file.type.startsWith('image/')) {
          throw new Error('Please select an image file');
        }

        // Compress image
        const compressedFile = await compressImage(file, {
          maxSizeMB: 1,
          maxWidth: 1920,
          maxHeight: 1080,
          useWebWorker: true
        });

        setFormData(prev => ({ ...prev, mainImage: compressedFile }));
      } catch (error) {
        enqueueSnackbar(error instanceof Error ? error.message : 'Error processing image', {
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
    
    if (!formData.mainImage) {
      enqueueSnackbar('الرجاء اختيار صورة للفئة', { 
        variant: 'error',
        style: { backgroundColor: '#EF4444', color: 'white' }
      });
      return;
    }

    if (!formData.departmentId) {
      enqueueSnackbar('الرجاء اختيار القسم', { 
        variant: 'error',
        style: { backgroundColor: '#EF4444', color: 'white' }
      });
      return;
    }

    try {
      await dispatch(actCreateCategory({
        name: formData.name,
        description: formData.description,
        mainImage: formData.mainImage,
        departmentId: formData.departmentId
      })).unwrap();

      enqueueSnackbar('تم إضافة الفئة بنجاح', {
        variant: 'success',
        style: { backgroundColor: '#10B981', color: 'white' }
      });

      setFormData({ name: '', description: '', mainImage: null, departmentId: '' });
    } catch (error) {
      enqueueSnackbar(error as string, {
        variant: 'error',
        style: { backgroundColor: '#EF4444', color: 'white' }
      });
    } finally {
      dispatch(resetCategoryCreateStatus());
    }
  };

  const isSubmitting = createStatus === 'pending' || isProcessing;

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-black p-8 rounded-lg shadow-lg space-y-6" dir="rtl">
        <h2 className="text-2xl font-bold mb-6 text-center">إضافة فئة جديدة</h2>

        <div>
          <label className="block text-sm font-medium mb-2">القسم</label>
          <select
            name="departmentId"
            value={formData.departmentId}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={isSubmitting}
          >
            <option value="">اختر القسم</option>
            {departments.map((department) => (
              <option key={department._id} value={department._id}>
                {department.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">اسم الفئة</label>
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
          <label className="block text-sm font-medium mb-2">وصف الفئة</label>
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
          <label className="block text-sm font-medium mb-2">صورة الفئة</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={isSubmitting}
          />
          <p className="text-gray-400 text-sm mt-1">
            {isProcessing ? 'جاري معالجة الصورة...' : 'يرجى اختيار صورة بحجم مناسب'}
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
              {isProcessing ? 'جاري معالجة الصورة...' : 'جاري الإضافة...'}
            </div>
          ) : (
            'إضافة الفئة'
          )}
        </motion.button>
      </form>

      <CategoryList />
    </>
  );
};

export default CategoryForm;