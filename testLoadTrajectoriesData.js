const { loadTrajectoriesData } = require('./src/scripts/loadTrajectoriesData');

loadTrajectoriesData()
  .then(() => console.log('Datos de trayectorias cargados exitosamente'))
  .catch((err) =>
    console.error('Error durante la carga de datos de trayectorias:', err)
  );
