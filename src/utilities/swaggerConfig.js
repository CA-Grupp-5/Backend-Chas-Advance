import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for Group 5 Chas Advance Project.',
    },
  },
  apis: ['./routes/**/*.js'], // Updated path to be relative to src
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
