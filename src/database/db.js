import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config(); // Para caragar las variables
const { Client } = pg;

const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

async function connect() {
  try {
    await client.connect();
    console.log('Conectada a PostgreSQL');

    const res = await client.query('SELECT * FROM trajectories LIMIT 10');
    console.log('Datos de la tabla taxis:', res.rows);

    return client;
  } catch (error) {
    console.error('Error de conexión a PostgresSQL');
    throw error;
  } finally {
    await client.end();
  }
}

export { client, connect };
