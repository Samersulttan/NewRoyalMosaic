import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMenu, IoClose } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { actGetDepartments } from '../store/departments/departmentsSlice';
import Logo from './Logo';

const Navbar = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { records: departments } = useAppSelector((state) => state.departments);

  useEffect(() => {
    dispatch(actGetDepartments());
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {departments.map((department) => (
              <Link
                key={department._id}
                to={department.path}
                className={`text-[#C69C6D] hover:text-[#E5B583] transition-colors ${
                  location.pathname === department.path ? 'font-bold' : ''
                }`}
              >
                {department.title}
              </Link>
            ))}
            <Link 
              to="/contact" 
              className={`text-[#C69C6D] hover:text-[#E5B583] transition-colors ${
                location.pathname === '/contact' ? 'font-bold' : ''
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-[#C69C6D] hover:text-[#E5B583] transition-colors"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/90 backdrop-blur-sm border-t border-[#C69C6D]/20"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
              {departments.map((department) => (
                <Link
                  key={department._id}
                  to={department.path}
                  className={`block py-2 text-[#C69C6D] hover:text-[#E5B583] transition-colors ${
                    location.pathname === department.path ? 'font-bold' : ''
                  }`}
                >
                  {department.title}
                </Link>
              ))}
              <Link 
                to="/contact" 
                className={`block py-2 text-[#C69C6D] hover:text-[#E5B583] transition-colors ${
                  location.pathname === '/contact' ? 'font-bold' : ''
                }`}
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;