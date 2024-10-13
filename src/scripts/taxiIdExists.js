const { pool } = require('../database/db');
const fs = require('node:fs');
const path = require('node:path');

module.exports = {
  // Función para verficar que el taxi_id existe en taxis
  taxiIdExists: async (taxi_id) => {
    // console.log('Verificando taxi_id:', taxi_id);
    try {
      const result = await pool.query('SELECT 1 FROM taxis WHERE id = $1', [
        taxi_id,
      ]);
      return result.rows.length > 0;
    } catch (error) {
      console.error(`Error al verificar taxi_id ${taxi_id}: ${error.message}`);
      return false;
    }
  },
};
