const express = require('express');
const {
  getTaxis,
  getTaxiLocations,
} = require('../controllers/taxisController.js');

const router = express.Router();

/**
 * @openapi
 * /api/taxis:
 *   get:
 *     tags:
 *       - Taxis
 *     summary: Retrieve a list of taxis
 *     description: Get a list of all available taxis with optional pagination.
 *     parameters:
 *       - name: limit
 *         in: query
 *         description: Number of taxis to return.
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *       - name: offset
 *         in: query
 *         description: Number of taxis to skip before starting to collect the result set.
 *         required: false
 *         schema:
 *           type: integer
 *           example: 0
 *     responses:
 *       200:
 *         description: A list of taxis
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       plate:
 *                         type: string
 *                         example: "ABC123"
 *       400:
 *         description: Invalid request parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid request parameters
 */

/**
 * @openapi
 * /api/taxis/{id}/locations:
 *   get:
 *     tags:
 *       - Taxis
 *     summary: Retrieve the locations of a specific taxi
 *     description: Get a list of locations for a specific taxi based on its ID, with optional date filtering and pagination.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the taxi to retrieve locations for
 *         required: true
 *         schema:
 *           type: integer
 *       - name: date
 *         in: query
 *         description: Filter locations by date (format YYYY-MM-DD)
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *       - name: limit
 *         in: query
 *         description: Number of locations to return per page
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *       - name: page
 *         in: query
 *         description: Page number to retrieve
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: A list of locations for the specified taxi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                     format: date-time
 *                   latitude:
 *                     type: number
 *                     format: float
 *                   longitude:
 *                     type: number
 *                     format: float
 *       400:
 *         description: Invalid request parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid request parameters
 *       404:
 *         description: No locations found for the given taxi ID and/or date
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No locations found for the taxi with the given ID and/or date
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */

// Ruta para obtener la lista de taxis
router.get('/', getTaxis);
// Ruta para obtener las ubicaciones de un taxi
router.get('/:id/locations', getTaxiLocations);

module.exports = router;
