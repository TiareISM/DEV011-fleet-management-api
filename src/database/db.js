const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config(); // Para caragar las variables

/*Verifica las variables de entorno
console.log('Database Config:', {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});*/

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

async function connect() {
  try {
    // Consulta para verificar la conexión
    const res = await pool.query('SELECT * FROM trajectories LIMIT 10');
    console.log('Datos de la tabla trajectories:', res.rows);
    return pool;
  } catch (error) {
    console.error('Error de conexión a PostgresSQL', error);
    throw error;
  }
}

module.exports = { pool, connect };
