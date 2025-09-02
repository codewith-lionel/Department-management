const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Department Management System API',
      version: '1.0.0',
      description: 'Backend API for Department Management System',
      contact: {
        name: 'Department Management Team',
        email: 'support@department.edu'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server'
      }
    ],
    components: {
      schemas: {
        Faculty: {
          type: 'object',
          required: ['name'],
          properties: {
            _id: {
              type: 'string',
              description: 'MongoDB ObjectId'
            },
            name: {
              type: 'string',
              description: 'Faculty member name'
            },
            title: {
              type: 'string',
              description: 'Faculty title/position'
            },
            imageUrl: {
              type: 'string',
              description: 'URL of faculty photo'
            },
            department: {
              type: 'string',
              description: 'Department name'
            },
            specialization: {
              type: 'string',
              description: 'Area of specialization'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Achievement: {
          type: 'object',
          required: ['title'],
          properties: {
            _id: {
              type: 'string',
              description: 'MongoDB ObjectId'
            },
            type: {
              type: 'string',
              description: 'Achievement type'
            },
            title: {
              type: 'string',
              description: 'Achievement title'
            },
            description: {
              type: 'string',
              description: 'Achievement description'
            },
            imageUrl: {
              type: 'string',
              description: 'URL of achievement image'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Event: {
          type: 'object',
          required: ['title', 'date', 'description'],
          properties: {
            _id: {
              type: 'string',
              description: 'MongoDB ObjectId'
            },
            title: {
              type: 'string',
              description: 'Event title'
            },
            date: {
              type: 'string',
              format: 'date-time',
              description: 'Event date'
            },
            description: {
              type: 'string',
              description: 'Event description'
            },
            image: {
              type: 'string',
              description: 'URL of event image'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        ForemImage: {
          type: 'object',
          required: ['imageUrl'],
          properties: {
            _id: {
              type: 'string',
              description: 'MongoDB ObjectId'
            },
            imageUrl: {
              type: 'string',
              description: 'URL of forem image'
            },
            description: {
              type: 'string',
              description: 'Image description'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string',
              description: 'Error message'
            }
          }
        },
        Health: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            message: {
              type: 'string'
            },
            data: {
              type: 'object',
              properties: {
                status: {
                  type: 'string'
                },
                timestamp: {
                  type: 'string',
                  format: 'date-time'
                }
              }
            }
          }
        }
      }
    },
    paths: {
      '/api/faculty': {
        get: {
          tags: ['Faculty'],
          summary: 'Get all faculty members',
          parameters: [
            {
              name: 'page',
              in: 'query',
              schema: { type: 'integer', minimum: 1 },
              description: 'Page number for pagination'
            },
            {
              name: 'limit',
              in: 'query',
              schema: { type: 'integer', minimum: 1, maximum: 100 },
              description: 'Number of items per page'
            }
          ],
          responses: {
            200: {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Faculty' }
                  }
                }
              }
            }
          }
        },
        post: {
          tags: ['Faculty'],
          summary: 'Create a new faculty member',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name'],
                  properties: {
                    name: { type: 'string' },
                    title: { type: 'string' },
                    imageUrl: { type: 'string' },
                    department: { type: 'string' },
                    specialization: { type: 'string' }
                  }
                }
              },
              'multipart/form-data': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    title: { type: 'string' },
                    department: { type: 'string' },
                    specialization: { type: 'string' },
                    image: {
                      type: 'string',
                      format: 'binary'
                    }
                  }
                }
              }
            }
          },
          responses: {
            201: {
              description: 'Faculty created successfully',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Faculty' }
                }
              }
            },
            400: {
              description: 'Validation error',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' }
                }
              }
            }
          }
        }
      },
      '/api/faculty/{id}': {
        delete: {
          tags: ['Faculty'],
          summary: 'Delete a faculty member',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string' },
              description: 'Faculty ID'
            }
          ],
          responses: {
            200: {
              description: 'Faculty deleted successfully'
            },
            404: {
              description: 'Faculty not found'
            }
          }
        }
      },
      '/health/live': {
        get: {
          tags: ['Health'],
          summary: 'Liveness probe',
          responses: {
            200: {
              description: 'Service is alive',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Health' }
                }
              }
            }
          }
        }
      },
      '/health/ready': {
        get: {
          tags: ['Health'],
          summary: 'Readiness probe',
          responses: {
            200: {
              description: 'Service is ready',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Health' }
                }
              }
            },
            503: {
              description: 'Service not ready'
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js'] // Path to the API files
};

const specs = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true,
    customSiteTitle: 'Department Management API Documentation'
  }));
};

module.exports = setupSwagger;