import { Router } from "express";
import {
getGenres
} from "../controllers/genres-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";

const router = Router();

router.get('/', authMiddleware, getGenres);

export default router;
