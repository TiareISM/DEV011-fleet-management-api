const { pool } = require('../database/db');
const fs = require('node:fs');
const path = require('node:path');

// Función para cargar los datos desde el archivo taxis.txt.
async function loadTaxisData() {
  // Definir la ruta al archivo txt.
  const taxisFilePath = path.join(__dirname, '../../data/taxis/taxi.txt');
  console.log(
    'Expected path:',
    path.join(__dirname, '../../data/taxis/taxi.txt')
  );

  try {
    // Leer el archivo.
    const data = fs.readFileSync(taxisFilePath, 'utf-8');
    // Ver el contenido del archivo
    console.log('Contenido:', data);
    // Validar que sea han laído correctamente
    if (!data.trim()) {
      console.log(
        `Archivo vacío: ${taxisFilePath}. No se pueden cargar datos.`
      );
      return; // Finalizar la ejecución.
    }

    // Divide el contenido en líneas.
    const lines = data.split('\n');

    // Iniciar una transacción
    console.log('Iniciando transacción');
    await pool.query('BEGIN');
    // Para recorrer cada línea del archivo.
    for (const line of lines) {
      // Verificar que no este vacía.
      if (line.trim()) {
        // Divide las líneas en id y patente.
        const [id, plate] = line.split(',');

        // Validacion si no es un número
        if (isNaN(id)) {
          console.error(`ID invaálido: ${id}`);
          continue;
        }

        // Validar la plate
        const plateRegex = /^[A-Z0-9-]{6,9}$/;
        if (!plateRegex.test(plate)) {
          console.error(`Placa inválida: ${plate}`);
          continue;
        }
        try {
          // Insertar los datos en la tabla `taxis` en la BD.
          await pool.query('INSERT INTO taxis (id, plate) VALUES ($1, $2)', [
            parseInt(id),
            plate,
          ]);
        } catch (error) {
          console.error('Error al insetar datos:', error);
        }
      }
    }
    // Confirmar que salio todo bien
    console.log('Confirmando transacción');
    await pool.query('COMMIT');
    // Su mensajito para saber que todo salio ok.
    console.log('Carga de datos de Taxis exitoso');
  } catch (error) {
    // Por si ocurre un error general, se hara rollback, si es que es posible
    console.error('Error durante la carga de datos:', error);
    console.log('Realizando rollback');
    await pool.query('ROLLBACK');
  }
}

module.exports = { loadTaxisData };
