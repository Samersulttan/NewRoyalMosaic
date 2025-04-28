import { motion } from 'framer-motion';
import { FaWhatsapp, FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa';

const SocialMediaLanding = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="h-screen relative bg-[url('https://images.unsplash.com/photo-1600489000022-c2086d79f9d4')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-8xl font-bold mb-6">ROYAL MOSAIC</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              تصاميم مطابخ عصرية وفاخرة مع ضمان 25 عاماً. نقدم أفضل الخامات الألمانية بأسعار تنافسية.
            </p>
            <div className="flex justify-center space-x-6">
              <motion.a
                href="https://wa.me/+971551234567"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="bg-white text-black px-8 py-3 rounded-full font-bold"
              >
                تواصل معنا
              </motion.a>
              <motion.a
                href="#gallery"
                whileHover={{ scale: 1.1 }}
                className="border-2 border-white px-8 py-3 rounded-full font-bold"
              >
                معرض أعمالنا
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold text-center mb-16"
          >
            لماذا تختار رويال موزاييك؟
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="text-6xl mb-6">🛡️</div>
              <h3 className="text-xl font-bold mb-4">ضمان 25 عام</h3>
              <p className="text-gray-400">نقدم أطول فترة ضمان في السوق لثقتنا في جودة منتجاتنا</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-6xl mb-6">🌳</div>
              <h3 className="text-xl font-bold mb-4">خشب ألماني فاخر</h3>
              <p className="text-gray-400">نستخدم أجود أنواع الخشب الألماني المقاوم للرطوبة والحرارة</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="text-6xl mb-6">🚚</div>
              <h3 className="text-xl font-bold mb-4">توصيل خلال 45 يوم</h3>
              <p className="text-gray-400">نلتزم بمواعيد التسليم المحددة مع التركيب الاحترافي</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <div className="text-6xl mb-6">💰</div>
              <h3 className="text-xl font-bold mb-4">أسعار تنافسية</h3>
              <p className="text-gray-400">نقدم أفضل الأسعار مع إمكانية التقسيط المريح</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold text-center mb-16"
          >
            معرض أعمالنا
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                className="relative aspect-square overflow-hidden rounded-lg"
              >
                <img
                  src={`https://images.unsplash.com/photo-160048900002${item}-c2086d79f9d4`}
                  alt={`Kitchen ${item}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold mb-8"
          >
            تواصل معنا
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-xl text-gray-400 mb-12"
          >
            زورونا في معارضنا أو تواصلوا معنا عبر وسائل التواصل الاجتماعي
          </motion.p>

          <div className="flex justify-center space-x-8">
            <motion.a
              href="#"
              whileHover={{ scale: 1.2 }}
              className="bg-green-600 p-4 rounded-full text-2xl"
            >
              <FaWhatsapp />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.2 }}
              className="bg-pink-600 p-4 rounded-full text-2xl"
            >
              <FaInstagram />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.2 }}
              className="bg-blue-600 p-4 rounded-full text-2xl"
            >
              <FaFacebookF />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.2 }}
              className="bg-black p-4 rounded-full text-2xl border-2"
            >
              <FaTiktok />
            </motion.a>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">معرض أبوظبي</h3>
              <p className="text-gray-400">مركز المهيري</p>
              <p className="text-gray-400">هاتف: 971551234567+</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">معرض العين</h3>
              <p className="text-gray-400">المنطقة الصناعية</p>
              <p className="text-gray-400">هاتف: 971551234567+</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SocialMediaLanding;