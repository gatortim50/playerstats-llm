import express from 'express';

import { index, update, getDescription, getTotalPage, getPlayer } from '../controllers/playersController';

const router = express.Router();

// GET localhost:8080/api/v1/players?page=1&limit=5&season=1990 
// Get all players by Pagination
// router.get('/players', authorise(false, "user"), index);
router.get('/?', index);

// GET localhost:8080/api/v1/players/pages - get a player's data
router.get('/pages', getTotalPage);


// POST localhost:8080/api/v1/players - udpate player's data
router.put('/:id', update);

// GET localhost:8080/api/v1/players/1234/description - get a player's data
router.get('/:id', getPlayer);

// GET localhost:8080/api/v1/players/1234/description - get a player's data
router.post('/:id/description', getDescription);


export default router;