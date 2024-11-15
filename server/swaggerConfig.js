// swaggerConfig.js
const swaggerJsDoc = require('swagger-jsdoc');

// Swagger definition
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Car API Documentation',
        version: '1.0.0',
        description: 'API documentation for the car management system',
    },
    servers: [
        {
            url: 'http://localhost:8000',
            description: 'Local server',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    security: [{ bearerAuth: [] }],
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'], // Path to your API routes files
};

const swaggerDocs = swaggerJsDoc(options);

module.exports = swaggerDocs;
