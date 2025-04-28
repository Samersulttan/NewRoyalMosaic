const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');

// Load environment variables from config.env file
dotenv.config({ path: path.join(__dirname, 'config.env') });

const dbConnection = require('./config/database');
const sectionRoute = require('./routes/sectionRoute');
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');

// Express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads')));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Meranti Kitchen API' });
});

// Mount Routes
app.use('/api/v1/sections', sectionRoute);

// Handle unhandled routes
app.all('*', (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 404));
});

// Global error handling middleware
app.use(globalError);

// Start server with port fallback handling
const startServer = async (port) => {
  try {
    // Connect to Database
    await dbConnection();
    
    const server = app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${port} is busy, trying ${port + 1}`);
        startServer(port + 1);
      } else {
        console.error('Server error:', err);
        process.exit(1);
      }
    });
  } catch (err) {
    console.error('Failed to connect to the database:', err);
    process.exit(1);
  }
};

// Initial port from environment or default
const initialPort = parseInt(process.env.PORT || '8000', 10);
startServer(initialPort);

// Handle rejection outside express
process.on('unhandledRejection', (err) => {
  console.error(`UnhandledRejection Error: ${err.name} | ${err.message}`);
  process.exit(1);
});