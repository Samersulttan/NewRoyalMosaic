import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { actGetDepartments, actDeleteDepartment, resetDeleteStatus } from '../../store/departments/departmentsSlice';

const DepartmentsList = () => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { records, loading, deleteStatus, deleteError } = useAppSelector((state) => state.departments);

  useEffect(() => {
    dispatch(actGetDepartments());
  }, [dispatch]);

  useEffect(() => {
    if (deleteStatus === 'succeeded') {
      enqueueSnackbar('تم حذف القسم بنجاح', {
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
    if (window.confirm('هل أنت متأكد من حذف هذا القسم؟')) {
      try {
        await dispatch(actDeleteDepartment(id)).unwrap();
      } catch (error) {
        console.error('Failed to delete department:', error);
      }
    }
  };

  if (loading === 'pending') {
    return <div className="text-center mt-8">جاري التحميل...</div>;
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">الأقسام الحالية</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {records.map((department) => (
          <motion.div
            key={department._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-800 rounded-lg p-4 relative group"
          >
            <img 
              src={department.image} 
              alt={department.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h4 className="font-bold">{department.title}</h4>
            <p className="text-gray-400 mb-2">{department.subtitle}</p>
            <p className="text-gray-400 text-sm">{department.description}</p>
            <p className="text-gray-500 text-sm mt-2">Path: {department.path}</p>

            <button
              onClick={() => handleDelete(department._id)}
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
    </div>
  );
};

export default DepartmentsList;