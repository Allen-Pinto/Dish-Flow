import express from 'express';
import {
  getAllDishes,
  getDishById,
  toggleDishStatus,
  getDishStats,
  bulkUpdateDishes,
} from '../controllers/dishController.js';

const router = express.Router();

// Stats route (must be before /:dishId)
router.get('/stats/summary', getDishStats);

// Bulk operations
router.patch('/bulk/update', bulkUpdateDishes);

// Standard CRUD routes
router.get('/', getAllDishes);
router.get('/:dishId', getDishById);
router.patch('/:dishId/toggle', toggleDishStatus);

export default router;