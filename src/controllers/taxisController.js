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
};
