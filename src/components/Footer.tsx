import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import CatalogForm from './CatalogForm';
import OpenStreetMapComponent from './OpenStreetMapComponent';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16">
      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="text-4xl mb-4">🛡️</div>
            <p className="text-sm">25 Years Warranty</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl mb-4">✓</div>
            <p className="text-sm">Finest German Wood</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl mb-4">🚚</div>
            <p className="text-sm">Delivery Within 45 Days</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl mb-4">💰</div>
            <p className="text-sm">Affordable Price</p>
          </div>
        </div>
      </div>

      {/* Download Catalog Section */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-gray-900 p-8 rounded-lg"
        >
          <h2 className="text-2xl font-bold text-center mb-8">Download Our Catalog</h2>
          <CatalogForm />
        </motion.div>
      </div>

      {/* Map and Contact Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map */}
          <OpenStreetMapComponent />

          {/* Contact Info */}
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-6">Visit Our Showroom</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold mb-2">Dubai</h4>
                <p className="text-gray-400">67QC+5MG - Al Wasl Rd - Jumeirah - Jumeirah 1 - Dubai</p>
                <p className="text-gray-400">Tel: +971 2 1234567</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <div className="flex justify-center space-x-6">
            <a 
              href="https://wa.me/971524186312"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition"
            >
              <FaWhatsapp size={24} />
            </a>
            <a 
              href="https://www.instagram.com/royal.mosaic.ae?igsh=MXJuZ2lvaHczZ254YQ%3D%3D&utm_source=qr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-gray-300 transition"
            >
              <FaInstagram size={24} />
            </a>
            <a 
              href="https://www.facebook.com/share/16Pp8Tpfp1/?mibextid=wwXIfr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-gray-300 transition"
            >
              <FaFacebookF size={24} />
            </a>
            <a 
              href="#" 
              className="hover:text-gray-300 transition"
            >
              <FaTiktok size={24} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-8 border-t border-gray-800">
          <p className="text-sm text-gray-400">© 2024 Royal Mosaic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;