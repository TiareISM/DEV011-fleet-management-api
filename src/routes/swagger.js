const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Información meta sobre la API
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fleet Management API',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/taxisRoutes.js'], // archivo donde se encuentran los endpoints
};

// Documentación en fomarto JSON
const swaggerSpec = swaggerJSDoc(options);

//Función para configurar la docu
const swaggerDocs = (app, port) => {
  // Ruta para acceder a la doc.
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // Para que la doc esté disponible en formato json.
  app.get('/api/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res, send(swaggerSpec);
  });
  // console.log(`Docs disponibles en http://localhost:${port}/api/docs`);
};

module.exports = { swaggerDocs };
