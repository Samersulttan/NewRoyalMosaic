import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { actGetProducts, actDeleteProduct, resetDeleteStatus } from '../../store/products/productsSlice';
import { actGetCategories } from '../../store/categories/categoriesSlice';

const ProductList = () => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { records: products, loading, deleteStatus, deleteError } = useAppSelector((state) => state.products);
  const { records: categories } = useAppSelector((state) => state.categories);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(actGetProducts()).unwrap(),
          dispatch(actGetCategories()).unwrap()
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (deleteStatus === 'succeeded') {
      enqueueSnackbar('تم حذف المنتج بنجاح', {
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
    if (window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      try {
        await dispatch(actDeleteProduct(id)).unwrap();
      } catch (error) {
        console.error('Failed to delete product:', error);
      }
    }
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories?.find(cat => cat._id === categoryId);
    return category?.name || 'غير معروف';
  };

  const filteredProducts = selectedCategory && products
    ? products.filter(product => product.category === selectedCategory)
    : products;

  if (loading === 'pending') {
    return <div className="text-center mt-8">جاري التحميل...</div>;
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">المنتجات الحالية</h3>
        <div className="w-64">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">كل الفئات</option>
            {categories?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {!filteredProducts || filteredProducts.length === 0 ? (
        <div className="text-center py-8 bg-gray-800 rounded-lg">
          <p className="text-gray-400">
            {selectedCategory 
              ? 'لا توجد منتجات في هذه الفئة'
              : 'لا توجد منتجات مضافة بعد'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gray-800 rounded-lg p-4 relative group"
            >
              <div className="grid grid-cols-2 gap-2 mb-4">
                {product.images && Array.isArray(product.images) ? (
                  product.images.map((image, index) => (
                    <img 
                      key={index}
                      src={image}
                      alt={`${product.name} - ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ))
                ) : (
                  <div className="w-full h-32 flex items-center justify-center bg-gray-700 rounded-lg">
                    <p className="text-gray-400">لا توجد صورة</p>
                  </div>
                )}
              </div>
              <h4 className="font-bold">{product.name}</h4>
              <p className="text-blue-400 text-sm mb-2">
                الفئة: {getCategoryName(product.category)}
              </p>
              <p className="text-gray-400 text-sm">{product.description}</p>

              <button
                onClick={() => handleDelete(product._id)}
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

export default ProductList;