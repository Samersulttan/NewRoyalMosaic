import { motion } from 'framer-motion';

const GoogleMapComponent = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="w-full h-[400px] rounded-lg overflow-hidden bg-gray-800"
    >
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.9701207563953!2d55.26911647415524!3d25.237931330051975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43006d4328db%3A0xb531fc6d3582207e!2zUm95YWwgbW9zYWljIGZ1cm5pdHVyZSDYsdmI2YrYp9mEINmF2YjYstin2YrZitmDINmE2YTYo9ir2KfYqw!5e0!3m2!1sen!2sae!4v1746457505489!5m2!1sen!2sae"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Royal Mosaic Furniture Location"
      />
    </motion.div>
  );
};

export default GoogleMapComponent;