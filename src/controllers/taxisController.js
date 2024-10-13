const db = require('../database/db');
/**
 * Obtiene la lista de taxis de DB con paginación.
 * @param {Object} req - Objeto de la solicitug HTTP.
 * @param {Object} res - Objeto de la respuesta HTTP.
 */
module.exports = {
  getTaxis: async (req, res) => {
    // Obtener los parámetros de la consulta page y limit
    const limit = parseInt(req.query.limit, 10);
    const page = parseInt(req.query.page, 10);

    console.log(`limit: ${limit}, page: ${page}`);

    // Verficar que limit u offset sean números válidos
    if (isNaN(limit) || isNaN(page)) {
      console.log('Invalid query parameters detected');
      return res.status(400).json({ error: 'Invalid query parameters' });
    }

    const offset = (page - 1) * limit;
    console.log(`offset: ${offset}`);

    try {
      // Realizar consulta a la db.
      const result = await db.pool.query(
        'SELECT id, plate FROM taxis ORDER BY id LIMIT $1 OFFSET $2',
        [limit, offset]
      );
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error getting taxis:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getTaxiLocations: async (req, res) => {
    const taxiId = req.params.id; // Obtener el id desdo los parámetros
    const date = req.query.date; // Obtener la fecha de los parámetros de consulta.
    // Obtener los parámetros de la consulta page y limit
    const limit = parseInt(req.query.limit, 10);
    const page = parseInt(req.query.page, 10);

    console.log(`limit: ${limit}, page: ${page}`);

    // Verficar que limit u offset sean números válidos
    if (isNaN(limit) || isNaN(page)) {
      console.log('Invalid query parameters detected');
      return res.status(400).json({ error: 'Invalid query parameters' });
    }

    const offset = (page - 1) * limit;
    console.log(`offset: ${offset}`);

    try {
      // Consultar a la DB para obtener las ubicaciones.
      const query = `
      SELECT date, latitude, longitude
      FROM trajectories
      WHERE taxi_id = $1 AND DATE(date) = $2
      ORDER BY date
      LIMIT $3 OFFSET $4
      `;
      const result = await db.pool.query(query, [taxiId, date, limit, offset]);
      if (result.rows.length === 0) {
        return res
          .status(404)
          .json({ error: 'No locations found for the given taxi ID and date' });
      }
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error getting taxi locations:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  getTaxiLastLocation: async (req, res) => {
    // Obtener el id desde los parámetros
    const taxiId = parseInt(req.params.id, 10);
    // validar que ID sea un número valido.
    if (isNaN(taxiId)) {
      return res.status(400).json({ error: 'Invalid taxi Id' });
    }
    console.log('este es el id del taxi:', taxiId);
    // Obtener los parámetros de la consulta page y limit
    const limit = parseInt(req.query.limit, 10);
    const page = parseInt(req.query.page, 10);

    console.log(`limit: ${limit}, page: ${page}`);

    // Verficar que limit u offset sean números válidos
    if (isNaN(limit) || isNaN(page)) {
      console.log('Invalid query parameters detected');
      return res.status(400).json({ error: 'Invalid query parameters' });
    }

    const offset = (page - 1) * limit;
    console.log(`offset: ${offset}`);

    try {
      const query = `
      SELECT t.id, t.plate, tr.latitude, tr.longitude, tr.date
      FROM taxis t
      JOIN trajectories tr ON t.id = tr.taxi_id
      WHERE t.id = $1
      AND tr.date = (
      SELECT MAX(date)
      FROM trajectories
      WHERE taxi_id = t.id
      )
      ORDER BY tr.date DESC
      LIMIT $2 OFFSET $3
      `;
      const result = await db.pool.query(query, [taxiId, limit, offset]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'No locations found for taxi' });
      }
      console.log('resultado de:', result);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error getting last taxi locations:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
