const express = require('express');
const { getTaxis } = require('../controllers/taxisController.js');
const taxisController = require('../controllers/taxisController.js');

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

// Ruta para obtener la lista de taxis
router.get('/', taxisController.getTaxis);

module.exports = { router };
