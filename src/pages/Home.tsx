import { useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { EffectCreative, Autoplay, EffectCards } from 'swiper/modules';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { actGetDepartments, departmentsRecordsCleanUp } from '../store/departments/departmentsSlice';
import OptimizedImage from '../components/shared/OptimizedImage';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/effect-cards';

const REFRESH_INTERVAL = 30000;

const Home = () => {
  const dispatch = useAppDispatch();
  const { records: departments, loading, error } = useAppSelector((state) => state.departments);
  const swiperRef = useRef<SwiperType>();

  const fetchDepartments = useCallback(async () => {
    try {
      await dispatch(actGetDepartments()).unwrap();
    } catch (error) {
      console.error('Failed to fetch departments:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchDepartments();
    return () => {
      dispatch(departmentsRecordsCleanUp());
    };
  }, [dispatch, fetchDepartments]);

  useEffect(() => {
    const intervalId = setInterval(fetchDepartments, REFRESH_INTERVAL);
    return () => clearInterval(intervalId);
  }, [fetchDepartments]);

  // Preload images
  useEffect(() => {
    departments.forEach((department, index) => {
      const img = new Image();
      img.src = department.image;
      // First image should be high priority
      if (index === 0) {
        img.loading = 'eager';
      }
    });
  }, [departments]);

  const handleSlideClick = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  if (loading === 'pending' && departments.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-32 w-32 border-t-2 border-b-2 border-white rounded-full"
        />
      </div>
    );
  }

  if (loading === 'failed' && departments.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">عذراً، حدث خطأ</h2>
          <p className="mb-4">{error || 'لا يمكن تحميل الأقسام حالياً'}</p>
          <button 
            onClick={fetchDepartments}
            className="px-6 py-2 bg-white text-black rounded-full hover:bg-opacity-90 transition-all"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen relative overflow-hidden">
      <Swiper
        modules={[EffectCreative, Autoplay, EffectCards]}
        effect="creative"
        creativeEffect={{
          prev: {
            translate: [0, 0, -400],
            rotate: [0, 0, -8],
            opacity: 0
          },
          next: {
            translate: [0, 0, -400],
            rotate: [0, 0, 8],
            opacity: 0
          }
        }}
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="h-full w-full cursor-pointer"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {departments.map((department, index) => (
          <SwiperSlide 
            key={department._id} 
            className="relative" 
            onClick={handleSlideClick}
          >
            <div className="absolute inset-0">
              <OptimizedImage
                src={department.image}
                alt={department.title}
                className="w-full h-full object-cover"
                priority={index === 0} // First slide gets priority loading
              />
              <div className="absolute inset-0 bg-black bg-opacity-50" />
            </div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-center max-w-7xl mx-auto"
              >
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-xl md:text-2xl font-light mb-4 tracking-[0.2em] uppercase"
                >
                  {department.subtitle}
                </motion.h3>
                
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="text-6xl md:text-8xl font-bold mb-6 tracking-wider"
                >
                  {department.title}
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
                >
                  {department.description}
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <Link 
                    to={department.path}
                    className="inline-block px-12 py-4 bg-white text-black rounded-full 
                      text-lg font-medium tracking-wider uppercase hover:bg-opacity-90 
                      transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    Explore Collection
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center"
      >
        <p className="text-sm mb-2 tracking-wider uppercase">Click or swipe to explore</p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white rounded-full mx-auto relative"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-white rounded-full mx-auto mt-2"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;