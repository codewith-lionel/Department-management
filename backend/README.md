# Department Management System - Backend API

A secure, scalable, and maintainable backend API for the Department Management System built with Node.js, Express, and MongoDB.

## Features

- **Secure Architecture**: Helmet, CORS allowlist, rate limiting, input sanitization
- **Image Storage**: Cloudinary integration with multipart/form-data support
- **Validation**: Request validation using Zod schemas
- **Logging**: Structured logging with Pino and request IDs
- **Health Checks**: Liveness and readiness probes
- **Metrics**: Prometheus metrics endpoint
- **Documentation**: OpenAPI/Swagger documentation
- **Development**: Hot reload, linting, Docker support

## Quick Start

### Prerequisites

- Node.js 18+ 
- MongoDB instance
- Cloudinary account (for image storage)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your actual values
```

4. Start the development server:
```bash
npm run dev
```

### Environment Variables

Create a `.env` file with the following variables:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/csdepartment
CORS_ORIGINS=http://localhost:3000,http://localhost:8000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
LOG_LEVEL=info
```

### Docker Development

Run the entire stack with Docker Compose:

```bash
docker-compose up -d
```

This will start:
- MongoDB on port 27017
- Backend API on port 5000

## API Endpoints

### Faculty Management
- `GET /api/faculty` - List all faculty
- `POST /api/faculty` - Create faculty (JSON or multipart/form-data)
- `DELETE /api/faculty/:id` - Delete faculty

### Achievements
- `GET /api/achievements` - List all achievements
- `POST /api/achievements` - Create achievement (JSON or multipart/form-data)
- `DELETE /api/achievements/:id` - Delete achievement

### Events
- `GET /api/events` - List all events
- `POST /api/events` - Create event (JSON or multipart/form-data)
- `DELETE /api/events/:id` - Delete event

### Forem Images
- `GET /api/forem-images` - List all forem images
- `POST /api/forem-images` - Create forem image (JSON or multipart/form-data)
- `DELETE /api/forem-images/:id` - Delete forem image

### System Endpoints
- `GET /health/live` - Liveness probe
- `GET /health/ready` - Readiness probe (checks DB connectivity)
- `GET /metrics` - Prometheus metrics
- `GET /docs` - API documentation

## Image Upload

The API supports two methods for image uploads:

### 1. Multipart Form Data (Recommended)
```bash
curl -X POST http://localhost:5000/api/faculty \
  -F "name=John Doe" \
  -F "title=Professor" \
  -F "department=Computer Science" \
  -F "image=@photo.jpg"
```

### 2. JSON with Image URL (Backward Compatible)
```bash
curl -X POST http://localhost:5000/api/faculty \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "title": "Professor",
    "department": "Computer Science",
    "imageUrl": "https://example.com/photo.jpg"
  }'
```

## Pagination

List endpoints support pagination:

```bash
# Get page 2 with 20 items per page
GET /api/faculty?page=2&limit=20
```

## Development Commands

```bash
# Start development server with hot reload
npm run dev

# Start production server
npm start

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Run tests
npm test

# Run tests in watch mode
npm test:watch
```

## Project Structure

```
backend/
├── src/
│   ├── app.js              # Express app setup
│   ├── server.js           # Server startup
│   ├── config/             # Configuration
│   ├── controllers/        # Request handlers
│   ├── services/           # Business logic
│   ├── models/             # Database models
│   ├── routes/             # Route definitions
│   ├── middleware/         # Custom middleware
│   ├── utils/              # Utilities (logger, cloudinary, etc.)
│   └── docs/               # API documentation
├── .env.example            # Environment template
├── .gitignore              # Git ignore rules
├── Dockerfile              # Docker configuration
├── docker-compose.yml      # Docker Compose for development
└── package.json            # Dependencies and scripts
```

## Security Features

- **Helmet**: Security headers
- **CORS**: Configurable origin allowlist
- **Rate Limiting**: Request rate limiting per IP
- **Input Sanitization**: MongoDB injection prevention
- **Validation**: Request validation with Zod
- **Error Handling**: Consistent error responses

## Monitoring

- **Health Checks**: `/health/live` and `/health/ready` endpoints
- **Metrics**: Prometheus metrics at `/metrics`
- **Logging**: Structured JSON logs with request IDs

## Contributing

1. Follow the existing code style
2. Run linting: `npm run lint:fix`
3. Ensure tests pass: `npm test`
4. Update documentation if needed

## License

MIT License