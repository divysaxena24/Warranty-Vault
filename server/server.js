const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

// Route imports
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const maintenanceRoutes = require('./routes/maintenanceRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Initialize Cron Jobs
const initCronJobs = require('./utils/cronJobs');
initCronJobs();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Set static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', require('./routes/contactRoutes'));

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
