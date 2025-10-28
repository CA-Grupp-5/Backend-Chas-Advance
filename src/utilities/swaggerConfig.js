import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import allowedCompanies from '../config/allowedDomains.json' with { type: 'json' };

const allowedDomains = allowedCompanies.map(
  (entry) => `- **${entry.company}** - \`${entry.domain}\``)
  .join('\n');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API documentation for Group 5 Chas Advance Project.',
      version: '1.0.0',
      description: `
#### Allowed Email Domains for Registration

Only users with email addresses belonging to the following company domains may register:

${allowedDomains}
      `,
    },
  },
  apis: ['./src/routes/**/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
