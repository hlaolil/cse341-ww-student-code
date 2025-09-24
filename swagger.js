const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');

function setupSwagger(app) {
  const swaggerDocument = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'swagger.json'), 'utf8')
  );
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

module.exports = setupSwagger;
