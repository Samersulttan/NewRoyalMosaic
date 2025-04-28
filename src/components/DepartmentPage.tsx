import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { actGetDepartmentCategories, departmentCategoriesCleanUp } from '../store/categories/categoriesSlice';
import { actGetDepartments } from '../store/departments/departmentsSlice';
import { actGetCategoryProducts, categoryProductsCleanUp } from '../store/products/productsSlice';
import LoadingSpinner from './shared/LoadingSpinner';
import ErrorMessage from './shared/ErrorMessage';
import EmptyState from './shared/EmptyState';
import CategoryGrid from './shared/CategoryGrid';
import ProductCarousel from './shared/ProductCarousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface DepartmentPageProps {
  path: string;
  title: string;
}

const DepartmentPage = ({ path, title }: DepartmentPageProps) => {
  const dispatch = useAppDispatch();
  const { records: categories, loading, error } = useAppSelector(
    (state) => state.categories.departmentCategories
  );
  const { records: products, loading: productsLoading, error: productsError } = useAppSelector(
    (state) => state.products.categoryProducts
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Reset state and clean up when component unmounts or path changes
  useEffect(() => {
    return () => {
      setSelectedCategory(null);
      setSelectedImageIndex(0);
      setImagesLoaded(false);
      dispatch(departmentCategoriesCleanUp());
      dispatch(categoryProductsCleanUp());
    };
  }, [dispatch, path]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Clean up previous data before fetching new data
        dispatch(departmentCategoriesCleanUp());
        dispatch(categoryProductsCleanUp());
        setImagesLoaded(false);

        const departmentsResult = await dispatch(actGetDepartments()).unwrap();
        const department = departmentsResult.find((dept) => dept.path === path);

        if (!department) {
          throw new Error(`${title} department not found`);
        }

        await dispatch(actGetDepartmentCategories(department._id)).unwrap();
      } catch (error) {
        console.error(`Failed to fetch ${title.toLowerCase()} categories:`, error);
      }
    };

    fetchData();
  }, [dispatch, path, title]);

  // Preload category images
  useEffect(() => {
    if (categories && categories.length > 0) {
      let loadedCount = 0;
      const totalImages = categories.length;
      let isMounted = true;

      const preloadImage = (src: string) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          if (!isMounted) return;
          loadedCount++;
          if (loadedCount === totalImages) {
            setImagesLoaded(true);
          }
        };
        img.onerror = () => {
          if (!isMounted) return;
          loadedCount++;
          if (loadedCount === totalImages) {
            setImagesLoaded(true);
          }
        };
      };

      // Start preloading all category images
      categories.forEach((category, index) => {
        if (index === 0) {
          // First image gets priority loading
          const img = new Image();
          img.src = category.mainImage;
          img.loading = 'eager';
          img.onload = () => {
            if (!isMounted) return;
            loadedCount++;
            if (loadedCount === totalImages) {
              setImagesLoaded(true);
            }
          };
        } else {
          preloadImage(category.mainImage);
        }
      });

      return () => {
        isMounted = false;
      };
    }
  }, [categories]);

  // Preload product images when a category is selected
  useEffect(() => {
    if (products && products.length > 0) {
      const allImages = products.reduce((acc, product) => {
        if (product.images && Array.isArray(product.images)) {
          return [...acc, ...product.images];
        }
        return acc;
      }, [] as string[]);

      let isMounted = true;
      console.log(isMounted)

      

      // Preload all product images
      allImages.forEach((imageUrl, index) => {
        const img = new Image();
        img.src = imageUrl;
        // First image gets priority loading
        if (index === 0) {
          img.loading = 'eager';
        }
      });

      return () => {
        isMounted = false;
      };
    }
  }, [products]);

  const handleCategoryClick = async (categoryId: string) => {
    try {
      setSelectedCategory(categoryId);
      setSelectedImageIndex(0);
      await dispatch(actGetCategoryProducts(categoryId)).unwrap();
    } catch (error) {
      console.error('Failed to fetch category products:', error);
    }
  };

  const closeSlider = () => {
    setSelectedCategory(null);
    setSelectedImageIndex(0);
    dispatch(categoryProductsCleanUp());
  };

  const getSelectedCategoryName = () => {
    if (!selectedCategory || !categories) return '';
    const category = categories.find(cat => cat._id === selectedCategory);
    return category ? category.name : '';
  };

  if (loading === 'pending' || !imagesLoaded) {
    return <LoadingSpinner />;
  }

  if (loading === 'failed' && error) {
    return <ErrorMessage message={error} />;
  }

  if (!categories || categories.length === 0) {
    return (
      <EmptyState 
        title="لا توجد تصاميم متاحة"
        description="لم يتم إضافة أي تصاميم بعد"
      />
    );
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-12 text-center text-white/70"
        >
          Our {title} Collection
        </motion.h1>

        <CategoryGrid 
          categories={categories}
          onCategoryClick={handleCategoryClick}
        />
      </div>

      <ProductCarousel
        isOpen={!!selectedCategory}
        onClose={closeSlider}
        products={products}
        loading={productsLoading}
        error={productsError}
        selectedImageIndex={selectedImageIndex}
        onImageChange={setSelectedImageIndex}
        categoryName={getSelectedCategoryName()}
      />
    </div>
  );
};

export default DepartmentPage;