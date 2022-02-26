import { Router } from "express";
import { login, register, checkEmail } from "../controllers/auth-controller.js";
import {
  getBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook,
} from "../controllers/books-controller.js";
import {createOrder} from "../controllers/order-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.get("/check-email", checkEmail);

router.get("/books", authMiddleware, getBooks);

router.get("/books/:id", authMiddleware, getBook);

router.post("/books", authMiddleware, addBook);

router.patch("/books/:id", authMiddleware, updateBook);

router.delete("/books/:id", authMiddleware, deleteBook);

router.post("/order", authMiddleware, createOrder);

export default router;
