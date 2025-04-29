const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');

// Load environment variables from config.env file
dotenv.config({ path: path.join(__dirname, 'config.env') });

const dbConnection = require('./config/database');
const authRoute = require('./routes/authRoute');
const departmentRoute = require('./routes/departmentRoute');
const categoryRoute = require('./routes/categoryRoute');
const productRoute = require('./routes/productRoute');
const catalogRoute = require('./routes/catalogRoute');

const downloadRoute = require('./routes/downloadRoute');
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');

// Express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
// app.use(express.static(path.join(__dirname, 'uploads')));
app.use(
  express.static(path.join(__dirname, 'uploads'), {
    maxAge: '1y', // Cache for 1 year
    etag: true,
    lastModified: true,
    setHeaders: (res, path) => {
      // Set caching headers for images
      if (
        path.endsWith('.jpg') ||
        path.endsWith('.jpeg') ||
        path.endsWith('.png') ||
        path.endsWith('.gif')
      ) {
        res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year in seconds
        res.setHeader(
          'Expires',
          new Date(Date.now() + 31536000000).toUTCString()
        ); // 1 year from now
      }
    },
  })
);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount Routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/departments', departmentRoute);
app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/products', productRoute);
app.use('/api/v1/catalog-requests', catalogRoute);
app.use('/api/v1/download', downloadRoute);

// Handle unhandled routes
app.all('*', (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 404));
});

// Global error handling middleware
app.use(globalError);

// Start server with database connection
const startServer = async () => {
  try {
    // Connect to Database
    await dbConnection();

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

startServer();

// Handle rejection outside express
process.on('unhandledRejection', (err) => {
  console.error(`UnhandledRejection Error: ${err.name} | ${err.message}`);
  process.exit(1);
});
