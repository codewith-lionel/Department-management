const { z } = require('zod');
const { errorResponse } = require('../utils/response');

/**
 * Generic validation middleware factory
 * @param {object} schema - Zod schema object with optional body, params, query
 */
const validate = (schema) => {
  return (req, res, next) => {
    try {
      if (schema.body) {
        req.body = schema.body.parse(req.body);
      }
      if (schema.params) {
        req.params = schema.params.parse(req.params);
      }
      if (schema.query) {
        req.query = schema.query.parse(req.query);
      }
      next();
    } catch (error) {
      const message = error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
      return errorResponse(res, message, 400);
    }
  };
};

// Common validation schemas
const mongoIdSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ObjectId')
});

const paginationSchema = z.object({
  page: z.string().optional().transform(val => val ? parseInt(val, 10) : 1),
  limit: z.string().optional().transform(val => val ? Math.min(parseInt(val, 10), 100) : 10)
});

// Faculty validation schemas
const facultyCreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  title: z.string().optional(),
  department: z.string().optional(),
  specialization: z.string().optional(),
  imageUrl: z.string().url().optional()
});

// Achievement validation schemas
const achievementCreateSchema = z.object({
  type: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  imageUrl: z.string().url().optional()
});

// Event validation schemas
const eventCreateSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  date: z.string().or(z.date()).transform(val => new Date(val)),
  description: z.string().min(1, 'Description is required'),
  image: z.string().url().optional()
});

// ForemImage validation schemas
const foremImageCreateSchema = z.object({
  imageUrl: z.string().url('Valid image URL is required'),
  description: z.string().optional().default('Forem Event')
});

module.exports = {
  validate,
  mongoIdSchema,
  paginationSchema,
  facultyCreateSchema,
  achievementCreateSchema,
  eventCreateSchema,
  foremImageCreateSchema
};