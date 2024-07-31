const { loadTaxisData } = require('./src/scripts/loadTaxisData');

loadTaxisData()
  .then(() => {
    console.log('Datos cargados exitosamente');
  })
  .catch((error) => {
    console.error('Error al cargar los datos:', error);
  });
