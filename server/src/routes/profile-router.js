import {Router} from 'express';
import { updateProfile } from '../controllers/profile-controller.js';
import authMiddleware from '../middlewares/auth-middleware.js';

const router = Router();

router.patch('/', authMiddleware, updateProfile);

export default router;