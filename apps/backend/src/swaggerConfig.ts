import { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API with Swagger',
      version: '1.0.0',
      description: 'API documentation for Express application',
    },
    servers: [
      {
        url: 'http://localhost:8080', // Replace with your server URL
      },
    ],
  },
  // Path to API documentation
  apis: ['./src/routes/*.ts'], // Adjust the path based on your project structure
};

export default swaggerOptions;
