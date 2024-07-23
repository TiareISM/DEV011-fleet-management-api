const db = require('./src/database/db'); // Asegúrate de que esta ruta sea correcta

const testConnection = async () => {
  try {
    // Realizar una consulta simple para verificar la conexión
    const result = await db.pool.query('SELECT * FROM taxis LIMIT 10');
    console.log('Connection test successful!');
    console.log('Sample data:', result.rows);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  } finally {
    // Cerrar la conexión
    await db.pool.end();
  }
};

testConnection();
