const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');

// تحميل متغيرات البيئة من ملف config.env
dotenv.config({ path: path.join(__dirname, 'config.env') });

// استيراد الوحدات
const dbConnection = require('./config/database');
const authRoute = require('./routes/authRoute');
const departmentRoute = require('./routes/departmentRoute');
const categoryRoute = require('./routes/categoryRoute');
const productRoute = require('./routes/productRoute');
const catalogRoute = require('./routes/catalogRoute');
const downloadRoute = require('./routes/downloadRoute');
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');

// تهيئة تطبيق Express
const app = express();

// تحديد النطاقات المسموح بها
const allowedOrigins = [
  'https://royalmosaic.ae',
  'https://www.royalmosaic.ae',
  // إضافة localhost فقط في بيئة التطوير
  ...(process.env.NODE_ENV === 'development' ? ['http://localhost:5173'] : [])
];

// تكوين CORS
app.use(
  cors({
    origin: function(origin, callback) {
      // السماح بطلبات بدون أصل (مثل الواجهات البرمجية للتطبيقات المحلية)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      } else {
        return callback(new Error('غير مسموح بسبب سياسة CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
    exposedHeaders: ['Content-Length', 'Content-Type'],
    credentials: true,
    maxAge: 86400, // 24 ساعة
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
);

// معالجة طلبات OPTIONS بشكل خاص
app.options('*', cors());

// إضافة معالج مخصص للرؤوس
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  next();
});

// Middlewares
app.use(express.json({ limit: '20mb' }));

// إعداد المجلد الثابت مع تكوين التخزين المؤقت
app.use(
  express.static(path.join(__dirname, 'uploads'), {
    maxAge: process.env.STATIC_FILES_MAX_AGE || 31536000000, // سنة واحدة بالملي ثانية
    etag: true,
    lastModified: true,
    setHeaders: (res, filePath) => {
      // ضبط رؤوس التخزين المؤقت للصور
      if (
        filePath.endsWith('.jpg') ||
        filePath.endsWith('.jpeg') ||
        filePath.endsWith('.png') ||
        filePath.endsWith('.gif') ||
        filePath.endsWith('.webp')
      ) {
        res.setHeader('Cache-Control', 'public, max-age=31536000'); // سنة واحدة بالثواني
        res.setHeader(
          'Expires',
          new Date(Date.now() + 31536000000).toUTCString()
        );
      }
    },
  })
);

// تسجيل الطلبات في بيئة التطوير
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`التطبيق يعمل في بيئة التطوير`);
} else {
  console.log(`التطبيق يعمل في بيئة الإنتاج`);
}

// تكوين المسارات
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/departments', departmentRoute);
app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/products', productRoute);
app.use('/api/v1/catalog-requests', catalogRoute);
app.use('/api/v1/download', downloadRoute);

// معالجة المسارات غير الموجودة
app.all('*', (req, res, next) => {
  next(new ApiError(`لا يمكن العثور على هذا المسار: ${req.originalUrl}`, 404));
});

// معالجة الأخطاء العامة
app.use(globalError);

// بدء الخادم مع الاتصال بقاعدة البيانات
const startServer = async () => {
  try {
    // الاتصال بقاعدة البيانات
    await dbConnection();
    console.log('تم الاتصال بقاعدة البيانات بنجاح');

    // تحديد منفذ الخادم
    const PORT = process.env.PORT || 8000;
    
    // بدء الاستماع على المنفذ المحدد
    const server = app.listen(PORT, () => {
      console.log(`الخادم يعمل على المنفذ ${PORT}`);
      console.log(`الرابط الأساسي للخادم: ${process.env.BASE_URL || `http://localhost:${PORT}/api/v1`}`);
    });

    // معالجة إنهاء الخادم بسلاسة
    process.on('SIGTERM', () => {
      console.log('تم استلام إشارة SIGTERM، إغلاق الخادم بسلاسة');
      server.close(() => {
        console.log('تم إغلاق الخادم');
        process.exit(0);
      });
    });

  } catch (err) {
    console.error('خطأ في بدء الخادم:', err);
    process.exit(1);
  }
};

// بدء الخادم
startServer();

// معالجة الاستثناءات غير المعالجة
process.on('unhandledRejection', (err) => {
  console.error(`خطأ غير معالج: ${err.name} | ${err.message}`);
  console.error(err.stack);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error(`استثناء غير متوقع: ${err.name} | ${err.message}`);
  console.error(err.stack);
  process.exit(1);
});

module.exports = app; // تصدير التطبيق للاختبارات