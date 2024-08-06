const { loadTrajectoriesData } = require('./src/scripts/trajectoriesDataLoad');

loadTrajectoriesData()
  .then(() => console.log('Datos de trayectorias cargados exitosamente'))
  .catch((err) =>
    console.error('Error durante la carga de datos de trayectorias:', err)
  );
