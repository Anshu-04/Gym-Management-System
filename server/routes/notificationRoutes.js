import express from 'express';
import {
  createNotification,
  getAllNotifications
} from '../controllers/notificationController.js';

const router = express.Router();

router.post('/', createNotification);  // Admin only
router.get('/', getAllNotifications);  // Everyone

export default router;