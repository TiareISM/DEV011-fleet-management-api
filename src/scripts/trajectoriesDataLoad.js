const { pool } = require('../database/db');
const fs = require('node:fs');
const path = require('node:path');
const { taxiIdExists } = require('./taxiIdExists');

module.exports = {
  loadTrajectoriesData: async () => {
    // Función para cargar los datos desde trajectories.txt.
    console.log('Iniciando carga de datos de trayectorias...');

    // Define la ruta al directorio que contiene los archivos .txt.
    const trajectoriesDirPath = path.join(__dirname, '../../data/trajectories');
    console.log('__dirname:', __dirname);
    console.log('trajectoriesDirPath:', typeof trajectoriesDirPath);

    // Lee todos los elementos en el directorio (archivos y subdirectorios).
    const items = fs
      .readdirSync(trajectoriesDirPath)
      .filter(
        (item) =>
          fs.statSync(path.join(trajectoriesDirPath, item)).isFile() &&
          path.extname(item) === '.txt'
      );
    console.log(`Encontrados ${items.length} archivos en el directorio.`);
    console.log(`Filtered items: ${items}`);

    try {
      // Iniciar Transacción
      await pool.query('BEGIN');

      // Itera sobre cada elemento en el directorio.
      for (const item of items) {
        // Obtiene la ruta completa del elemento.
        const itemPath = path.join(trajectoriesDirPath, item);
        // console.log(`Procesando archivo: ${itemPath}`);
        const emptyFile = [];

        // Lee el contenido del archivo.
        const data = fs.readFileSync(itemPath, 'utf-8');

        // Verificar si el archivo esta vacío
        if (!data.trim()) {
          console.log(`Archivo vacío: ${itemPath}. No se pueden cargar datos`);
          emptyFile.push(itemPath);
          console.log('Este es el array:', emptyFile);
          continue;
        }

        // Divide el contenido del archivo en líneas Y filtra las vacías.
        const lines = data.split('\n').filter((line) => line.trim());

        // Itera sobre cada línea en el archivo.
        for (const line of lines) {
          // Verifica que la línea no esté vacía.
          if (!line.trim()) {
            console.log(`Línea vacía encontrada en ${itemPath}. Ignorando...`);
            continue; // Salta a la siguiente iteración
          }

          // Divide la línea en campos utilizando la coma como separador.
          const [taxi_id, date, latitude, longitude] = line.split(',');
          const taxiIdNum = parseInt(taxi_id);

          // Verifca datos faltantes
          if (!taxi_id || !date || !latitude || !longitude) {
            console.error(`Datos faltantes: ${line}`);
            continue;
          }

          // Verifica si el taxi_id es válido.
          if (!taxiIdNum || isNaN(taxiIdNum)) {
            console.error(`ID de taxi inválido en la línea: ${line}`);
            continue;
          }

          // Verifica si existe.
          const exists = await taxiIdExists(taxiIdNum);
          if (!exists) {
            // El ID no existe, manejar el error
            console.error(
              `El taxi_id ${taxiIdNum} no existe en la tabla taxis. Línea ignorada: ${line}`
            );
            continue; // Saltar a la siguiente iteración (si estás en un bucle)
          }

          // Inserta los datos en la tabla `trajectories` en la base de datos, omitiendo `id` ya que es serial.
          try {
            await pool.query(
              'INSERT INTO trajectories (taxi_id, date, latitude, longitude) VALUES ($1, $2, $3, $4)',
              [taxiIdNum, date, parseFloat(latitude), parseFloat(longitude)]
            );
          } catch (error) {
            console.error(
              `Error al insertar datos en la base de datos: ${error.message}`
            );
          }
        }
      }

      // Confirmar que todo salio ok
      await pool.query('COMMIT');
      console.log('Carga exitosa');
    } catch (error) {
      console.error(`Error durante la carga: ${error.message}`);
      console.log('Realizando rollback');
      await pool.query('ROLLBACK');
    }
  },
};
