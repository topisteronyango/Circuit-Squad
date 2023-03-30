const swaggerJsDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Circuit Squad Medical Web Application Service.',
        version: '1.0.0',
        description: 'This is a REST API application built on Node.js and Express.js for the Circuit Squad Web Application',
        license: {
            name: 'Licenced Under MIT',
            url: 'https://spdx.org/licenses/MIT.html'
        },
        contact: {
            name: 'Paul Sanga',
            url: 'paulsanganyamawi@gmail.com'
        }
    },
    servers: [
        {
            url: 'http://127.0.0.1:3000',
            description: 'Development Server'
        }
    ]
};

const options = {
    swaggerDefinition,
    apis: ['./*.js']
};

const swaggerSpec = swaggerJsDoc(options);
module.exports = swaggerSpec;