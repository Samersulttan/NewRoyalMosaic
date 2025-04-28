import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { actGetCategories, actDeleteCategory, resetDeleteStatus } from '../../store/categories/categoriesSlice';
import { actGetDepartments } from '../../store/departments/departmentsSlice';

const CategoryList = () => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { records: categories, loading, deleteStatus, deleteError } = useAppSelector((state) => state.categories);
  const { records: departments } = useAppSelector((state) => state.departments);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(actGetCategories()).unwrap(),
          dispatch(actGetDepartments()).unwrap()
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (deleteStatus === 'succeeded') {
      enqueueSnackbar('تم حذف الفئة بنجاح', {
        variant: 'success',
        style: { backgroundColor: '#10B981', color: 'white' }
      });
      dispatch(resetDeleteStatus());
    }

    if (deleteStatus === 'failed' && deleteError) {
      enqueueSnackbar(deleteError, {
        variant: 'error',
        style: { backgroundColor: '#EF4444', color: 'white' }
      });
      dispatch(resetDeleteStatus());
    }
  }, [deleteStatus, deleteError, dispatch, enqueueSnackbar]);

  const handleDelete = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الفئة؟')) {
      try {
        await dispatch(actDeleteCategory(id)).unwrap();
      } catch (error) {
        console.error('Failed to delete category:', error);
      }
    }
  };

  const getCategoryDepartment = (departmentId: string) => {
    const department = departments.find(dept => dept._id === departmentId);
    return department?.title || 'غير معروف';
  };

  const filteredCategories = selectedDepartment
    ? categories.filter(category => category.department === selectedDepartment)
    : categories;

  if (loading === 'pending') {
    return <div className="text-center mt-8">جاري التحميل...</div>;
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">الفئات الحالية</h3>
        <div className="w-64">
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">كل الأقسام</option>
            {departments.map((department) => (
              <option key={department._id} value={department._id}>
                {department.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredCategories.length === 0 ? (
        <div className="text-center py-8 bg-gray-800 rounded-lg">
          <p className="text-gray-400">
            {selectedDepartment 
              ? 'لا توجد فئات في هذا القسم'
              : 'لا توجد فئات مضافة بعد'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCategories.map((category) => (
            <motion.div
              key={category._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gray-800 rounded-lg p-4 relative group"
            >
              <img 
                src={category.mainImage} 
                alt={category.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="font-bold">{category.name}</h4>
              <p className="text-blue-400 text-sm mb-2">
                القسم: {getCategoryDepartment(category.department)}
              </p>
              <p className="text-gray-400 text-sm">{category.description}</p>

              <button
                onClick={() => handleDelete(category._id)}
                disabled={deleteStatus === 'pending'}
                className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-md 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-200
                  hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                حذف
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryList;