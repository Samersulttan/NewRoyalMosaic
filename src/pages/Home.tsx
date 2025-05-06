import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { actGetDepartments } from '../store/departments/departmentsSlice';
import OptimizedImage from '../components/shared/OptimizedImage';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import ErrorMessage from '../components/shared/ErrorMessage';

const Home = () => {
  const dispatch = useAppDispatch();
  const { records: departments, loading, error } = useAppSelector((state) => state.departments);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    dispatch(actGetDepartments());
  }, [dispatch]);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % departments.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [departments.length, isAutoPlaying]);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false); // Pause autoplay when user interacts
    
    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleNextSlide = () => {
    handleSlideChange((currentSlide + 1) % departments.length);
  };

  const handlePrevSlide = () => {
    handleSlideChange(currentSlide === 0 ? departments.length - 1 : currentSlide - 1);
  };

  if (loading === 'pending' && departments.length === 0) {
    return <LoadingSpinner />;
  }

  if (loading === 'failed' && error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Slider Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Slides */}
        <AnimatePresence initial={false}>
          {departments.map((department, index) => (
            <motion.div
              key={department._id}
              className={`absolute inset-0 ${index === currentSlide ? 'z-20' : 'z-10'}`}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{
                opacity: index === currentSlide ? 1 : 0,
                scale: index === currentSlide ? 1 : 1.1,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            >
              <OptimizedImage
                src={department.image}
                alt={department.title}
                className="w-full h-full object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50" />
              
              {/* Slide Content */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center text-center px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: index === currentSlide ? 1 : 0, y: index === currentSlide ? 0 : 20 }}
                transition={{ delay: 0.3 }}
              >
                <div>
                  <h2 className="text-4xl md:text-6xl font-bold mb-4">{department.title}</h2>
                  <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-200">
                    {department.subtitle}
                  </p>
                  <Link
                    to={department.path}
                    className="inline-block bg-[#C69C6D] text-black px-8 py-3 rounded-full 
                      hover:bg-[#E5B583] transition-colors duration-300"
                  >
                    View Collection
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 text-white w-12 h-12 
            rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-black/70 
            transition-colors"
        >
          ←
        </button>
        <button
          onClick={handleNextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 text-white w-12 h-12 
            rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-black/70 
            transition-colors"
        >
          →
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
          {departments.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Rest of the content */}
      {departments.map((department, index) => (
        <motion.section
          key={department._id}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className={`py-20 ${index % 2 === 0 ? 'bg-black' : 'bg-gray-900'}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <Link 
                to={department.path} 
                className="block group relative overflow-hidden rounded-lg"
              >
                <motion.div
                  initial={{ scale: 1.1 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="relative aspect-[4/3]"
                >
                  <OptimizedImage
                    src={department.image}
                    alt={department.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-500 group-hover:bg-opacity-30" />
                </motion.div>
              </Link>

              <div className="text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    {department.title}
                  </h2>
                  <p className="text-xl text-[#C69C6D] mb-4">
                    {department.subtitle}
                  </p>
                  <p className="text-gray-400 mb-8 leading-relaxed">
                    {department.description}
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={department.path}
                      className="inline-block bg-[#C69C6D] text-black px-8 py-3 rounded-full 
                        hover:bg-[#E5B583] transition-colors duration-300"
                    >
                      View Collection
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>
      ))}
    </div>
  );
};

export default Home;