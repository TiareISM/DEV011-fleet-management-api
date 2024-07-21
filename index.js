const express = require('express');
const { swaggerDocs } = require('./src/routes/swagger.js');
const dotenv = require('dotenv');
const taxisRouter = require('./src/routes/taxisRoutes.js');

dotenv.config(); // para cargar las variables

const app = express();
const PORT = process.env.PORT || 3000;

// Midleware para parsear JSOn
app.use(express.json());

// Enrutador para lasrutas
app.use('/api/taxis', taxisRouter);

// Config de Swagger
swaggerDocs(app, PORT);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
