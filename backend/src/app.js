const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const pinoHttp = require('pino-http');
const path = require('path');

const config = require('./config');
const logger = require('./utils/logger');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const { httpRequestDuration, httpRequestsTotal } = require('./routes/metricsRoutes');

// Import route modules
const facultyRoutes = require('./routes/facultyRoutes');
const achievementRoutes = require('./routes/achievementRoutes');
const eventRoutes = require('./routes/eventRoutes');
const foremImageRoutes = require('./routes/foremImageRoutes');
const healthRoutes = require('./routes/healthRoutes');
const { router: metricsRouter } = require('./routes/metricsRoutes');

// Import swagger docs
const setupSwagger = require('./docs/swagger');

const app = express();

// Trust proxy (for production behind reverse proxy)
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());

// CORS configuration
const corsOptions = {
  origin: config.CORS_ORIGINS === '*' ? true : config.CORS_ORIGINS.split(','),
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 1000 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false
});
app.use(limiter);

// Compression middleware
app.use(compression());

// Request parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// MongoDB injection prevention
app.use(mongoSanitize());

// Logging middleware with request ID
app.use(pinoHttp({
  logger,
  customLogLevel: (req, res, err) => {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return 'warn';
    } else if (res.statusCode >= 500 || err) {
      return 'error';
    }
    return 'info';
  },
  customSuccessMessage: (req, res) => {
    return `${req.method} ${req.url} - ${res.statusCode}`;
  },
  customErrorMessage: (req, res, err) => {
    return `${req.method} ${req.url} - ${res.statusCode} - ${err.message}`;
  }
}));

// Metrics middleware
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    const route = req.route ? req.route.path : req.path;
    
    httpRequestDuration
      .labels(req.method, route, res.statusCode)
      .observe(duration);
    
    httpRequestsTotal
      .labels(req.method, route, res.statusCode)
      .inc();
  });
  
  next();
});

// API routes
app.use('/api/faculty', facultyRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/forem-images', foremImageRoutes);

// Health and metrics endpoints
app.use('/health', healthRoutes);
app.use('/metrics', metricsRouter);

// Setup Swagger documentation
setupSwagger(app);

// Static file serving (for backward compatibility)
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));
app.use('/faculty-image', express.static(path.join(__dirname, '../../front-end/faculty-image')));
app.use(express.static(path.join(__dirname, '../../front-end')));

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../front-end/pages/index.html'));
});

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

module.exports = app;