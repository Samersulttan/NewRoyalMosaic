import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="pt-20 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Contact Us</h1>
          <p className="text-gray-400 text-center mb-12">
            Visit our showroom or get in touch with us to start planning your dream kitchen
          </p>

          <div className="bg-gray-900 p-8 rounded-lg">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 bg-black border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 bg-black border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 bg-black border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-white text-black py-3 rounded-md hover:bg-gray-200 transition"
              >
                Send Message
              </motion.button>
            </form>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Visit Our Showroom</h2>
            <p className="text-gray-400">Abu Dhabi Al Muhairy center</p>
            <p className="text-gray-400">Al Ain Industrial Area</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;