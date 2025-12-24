import express from "express";
import {
  getBooks,
  getBookById,
  createBook
} from "../controllers/bookController.js";
import validateBook from "../middleware/validateBook.js";

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/", validateBook, createBook);

export default router;
