import express from 'express';

import { index } from '../controllers/seasonsController';

const router = express.Router();

// GET localhost:8080/api/v1/seasons
// Get all players by Pagination
router.get('/', index);

export default router;