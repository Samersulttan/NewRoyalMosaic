import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  const handleClick = () => {
    window.open('https://wa.me/971524186312', '_blank');
  };

  return (
    <motion.button
      onClick={handleClick}
      className="fixed bottom-8 left-8 z-50 bg-green-600 text-white p-4 rounded-full shadow-lg"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <FaWhatsapp size={24} />
    </motion.button>
  );
};

export default WhatsAppButton;