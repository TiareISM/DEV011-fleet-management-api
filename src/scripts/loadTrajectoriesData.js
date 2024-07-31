const { pool } = require('../database/db');
const db = require('../database/db');
const fs = require('node:fs');
const path = require('node:path');

// Función para verficar que el taxi_id existe en taxis
async function taxiIdExists(taxi_id) {
  try {
    const result = await db.pool.query('SELECT 1 FROM taxis WHERE id = $1', [
      taxi_id,
    ]);
    return result.rowCount > 0;
  } catch (error) {
    console.error(`Error al verificar taxi_id ${taxi_id}: ${error.message}`);
    return false;
  }
}

// Función para cargar los datos desde trajectories.txt.
async function loadTrajectoriesData() {
  console.log('Iniciando carga de datos de trayectorias...');
  // Define la ruta al directorio que contiene los archivos .txt.
  const trajectoriesDirPath = path.join(__dirname, '../../data/trajectories');

  // Lee todos los elementos en el directorio (archivos y subdirectorios).
  const items = fs
    .readdirSync(trajectoriesDirPath)
    .filter(
      (item) =>
        fs.statSync(path.join(trajectoriesDirPath, item)).isFile() &&
        path.extname(item) === '.txt'
    );
  console.log(`Encontrados ${items.length} archivos en el directorio.`);

  // Itera sobre cada elemento en el directorio.
  for (const item of items) {
    // Obtiene la ruta completa del elemento.
    const itemPath = path.join(trajectoriesDirPath, item);
    console.log(`Procesando archivo: ${itemPath}`);
    // Lee el contenido del archivo.
    const data = fs.readFileSync(itemPath, 'utf-8');
    // Divide el contenido del archivo en líneas.
    const lines = data.split('\n');

    // Itera sobre cada línea en el archivo.
    for (const line of lines) {
      // Verifica que la línea no esté vacía.
      if (line.trim()) {
        // Divide la línea en campos utilizando la coma como separador.
        const [taxi_id, date, latitude, longitude] = line.split(',');
        const taxiIdNum = parseInt(taxi_id);
        // Verifica si el taxi_id es válido.
        if (!taxiIdNum || isNaN(taxiIdNum)) {
          console.error(`ID de taxi inválido en la línea: ${line}`);
          continue;
        }
        // Verifica si existe.
        if (!(await taxiIdExists(taxiIdNum))) {
          console.error(
            `El taxi_id ${taxiIdNum} no existe en la tabla taxis. Línea ignorada: ${line}`
          );
          continue; // Salta a la siguiente iteración si los datos son inválidos.
        }

        // Inserta los datos en la tabla `trajectories` en la base de datos, omitiendo `id` ya que es serial.
        try {
          await db.pool.query(
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
  }
}

// Mensajito para saber que todo salio ok.
console.log('Carga exitosa a trajectories');

module.exports = { loadTrajectoriesData };
