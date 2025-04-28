import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { actCreateDepartment, resetCreateStatus } from '../../store/departments/departmentsSlice';
import DepartmentsList from './DepartmentsList';

const DepartmentForm = () => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { createStatus, createError } = useAppSelector((state) => state.departments);
  
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    path: '',
    image: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'title') {
      // Generate path from title: convert to lowercase, replace spaces with hyphens
      const generatedPath = `/${value.toLowerCase().replace(/\s+/g, '-')}`;
      setFormData(prev => ({ ...prev, [name]: value, path: generatedPath }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.image) {
      enqueueSnackbar('الرجاء اختيار صورة للقسم', { 
        variant: 'error',
        style: { backgroundColor: '#EF4444', color: 'white' }
      });
      return;
    }

    await dispatch(actCreateDepartment({
      title: formData.title,
      subtitle: formData.subtitle,
      description: formData.description,
      path: formData.path,
      image: formData.image,
    }));
  };

  useEffect(() => {
    if (createStatus === 'succeeded') {
      enqueueSnackbar('تم إضافة القسم بنجاح', {
        variant: 'success',
        style: { backgroundColor: '#10B981', color: 'white' }
      });
      setFormData({ title: '', subtitle: '', description: '', path: '', image: null });
      dispatch(resetCreateStatus());
    }

    if (createStatus === 'failed' && createError) {
      enqueueSnackbar(createError, {
        variant: 'error',
        style: { backgroundColor: '#EF4444', color: 'white' }
      });
      dispatch(resetCreateStatus());
    }
  }, [createStatus, createError, dispatch, enqueueSnackbar]);

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-black p-8 rounded-lg shadow-lg space-y-6" dir="rtl">
        <h2 className="text-2xl font-bold mb-6 text-center">إضافة قسم جديد</h2>

        <div>
          <label className="block text-sm font-medium mb-2">عنوان القسم</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">العنوان الفرعي</label>
          <input
            type="text"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">الوصف</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">المسار</label>
          <input
            type="text"
            name="path"
            value={formData.path}
            readOnly
            className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-not-allowed"
          />
          <p className="text-gray-400 text-sm mt-1">يتم إنشاء المسار تلقائياً من العنوان</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">صورة القسم</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <motion.button
          whileHover={{ scale: createStatus === 'pending' ? 1 : 1.02 }}
          whileTap={{ scale: createStatus === 'pending' ? 1 : 0.98 }}
          type="submit"
          disabled={createStatus === 'pending'}
          className={`w-full py-3 rounded-md transition-all duration-200 ${
            createStatus === 'pending'
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {createStatus === 'pending' ? 'جاري الإضافة...' : 'إضافة القسم'}
        </motion.button>
      </form>

      <DepartmentsList />
    </>
  );
};

export default DepartmentForm;