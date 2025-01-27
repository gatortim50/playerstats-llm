import express from 'express';

import { index } from '../controllers/seasonsController';

const router = express.Router();

/**
 * @swagger
 * /api/v1/seasons:
 *   get:
 *     summary: Retrieve unique player years
 *     description: Fetches a list of unique years from player stats, ordered in descending order.
 *     responses:
 *       200:
 *         description: A list of unique years from player stats.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: integer
 *                   description: A list of unique years in descending order.
 *                   example: [2023, 2022, 2021, 2020]
 *       400:
 *         description: Bad request, such as a database query failure.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 *                   description: Details about the error.
 *                   example:
 *                     message: "Database query failed."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred."
 */
router.get('/', index);

export default router;