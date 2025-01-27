import express from 'express';

import { index, update, getDescription, getTotalPage, getPlayer } from '../controllers/playersController';

const router = express.Router();

/**
 * @swagger
 * /api/v1/players:
 *   get:
 *     summary: Retrieve a list of players
 *     description: Retrieve a list of all players in the system.
 *     parameters:
 *       - in: query
 *         name: year
 *         required: false
 *         description: Filter players by year.
 *         schema:
 *           type: number
 *       - in: query
 *         name: take
 *         required: true
 *         description: The number per page, i.e., 10.
 *         schema:
 *           type: number
 *       - in: query
 *         name: page
 *         required: true
 *         description: The page number.
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: A list of players.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The player ID.
 *                   rank:
 *                     type: number
 *                     description: The player's rank.
 *                   player:
 *                     type: string
 *                     description: The player's name.
 *                   ageThatYear:
 *                     type: number
 *                     description: The player's age that year.
 *                   hits:
 *                     type: number
 *                     description: The player's hits.
 *                   year:
 *                     type: number
 *                     description: The year.
 *                   bats:
 *                     type: string
 *                     description: The bats.
 */
router.get('/?', index);

/**
 * @swagger
 * /api/v1/players/pages:
 *   get:
 *     summary: Get total number of pages
 *     description: Calculates the total number of pages for the player stats based on the number of items per page and an optional year filter.
 *     parameters:
 *       - in: query
 *         name: take
 *         required: true
 *         description: The number of items per page.
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: year
 *         required: false
 *         description: Filter the stats by a specific year.
 *         schema:
 *           type: integer
 *           example: 2023
 *     responses:
 *       200:
 *         description: The total number of pages calculated based on the provided `take` and optional `year` filter.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: integer
 *                   description: The total number of pages.
 *                   example: 5
 *       400:
 *         description: Validation error for missing or invalid query parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Details about the validation error.
 *                   example: "Validation failed for query parameters."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Details about the server error.
 *                   example: "An unexpected error occurred."
 */

router.get('/pages', getTotalPage);

/**
 * @swagger
 * /api/v1/players/{id}:
 *   put:
 *     summary: Update a player's details
 *     description: Updates a player's details in the database using the provided `id` and validated request body.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the player to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rank:
 *                 type: number
 *                 description: The player's rank.
 *                 example: 1
 *               player:
 *                 type: string
 *                 description: The player's name.
 *                 example: "John Doe"
 *               ageThatYear:
 *                 type: number
 *                 description: The player's age in the specified year.
 *                 example: 25
 *               hits:
 *                 type: number
 *                 description: The number of hits by the player.
 *                 example: 120
 *               year:
 *                 type: number
 *                 description: The year associated with the stats.
 *                 example: 2023
 *               bats:
 *                 type: string
 *                 description: The player's batting hand (e.g., L for left, R for right, S for switch).
 *                 example: "L"
 *     responses:
 *       200:
 *         description: Successfully updated the player's details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   description: The updated player details.
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The player ID.
 *                       example: "123"
 *                     rank:
 *                       type: number
 *                       description: The player's rank.
 *                       example: 1
 *                     player:
 *                       type: string
 *                       description: The player's name.
 *                       example: "John Doe"
 *                     ageThatYear:
 *                       type: number
 *                       description: The player's age in the specified year.
 *                       example: 25
 *                     hits:
 *                       type: number
 *                       description: The number of hits by the player.
 *                       example: 120
 *                     year:
 *                       type: number
 *                       description: The year associated with the stats.
 *                       example: 2023
 *                     bats:
 *                       type: string
 *                       description: The player's batting hand.
 *                       example: "L"
 *       400:
 *         description: Validation errors occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: array
 *                   description: A list of validation errors from Zod.
 *                   items:
 *                     type: object
 *                     properties:
 *                       path:
 *                         type: array
 *                         description: The path to the invalid property.
 *                         items:
 *                           type: string
 *                           example: "rank"
 *                       message:
 *                         type: string
 *                         description: A validation error message.
 *                         example: "Rank must be a number."
 *       500:
 *         description: Server error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Something went wrong."
 */

router.put('/:id', update);

/**
 * @swagger
 * /api/v1/players/{id}:
 *   get:
 *     summary: Fetch a player's details
 *     description: Fetch information for a specific player.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the player to update.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Player details updated successfully.
 *       404:
 *         description: Player not found.
 */
router.get('/:id', getPlayer);

/**
 * @swagger
 * /api/v1/players/{id}/description:
 *   post:
 *     summary: Get the description of a player
 *     description: Retrieves a dynamically generated description of a player using OpenAI.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the player whose description is to be retrieved.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The dynamically generated player description in a streaming response.
 *         content:
 *           text/event-stream:
 *             schema:
 *               type: string
 *               description: Streamed chunks of text forming the player description.
 *       400:
 *         description: Bad request, such as invalid ID or OpenAI service error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 *                   description: Details about the error.
 *       404:
 *         description: Player not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Player not found."
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
router.post('/:id/description', getDescription);


export default router;