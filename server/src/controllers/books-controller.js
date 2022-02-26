import database from "../database/index.js";
import { v4 as createId } from "uuid";

export const getBooks = (req, res) => {
  const books = database.data.books;
  res.status(200).json(books);
};

export const getBook = (req, res) => {
  const book = database.data.books.find((book) => book.id === req.params.id);
  res.status(200).json(book);
};

export const addBook = (req, res) => {
  const book = { ...req.body, id: createId() };
  database.data.books.push(book);
  database.write();
  res.status(200).json(book);
};

export const updateBook = (req, res) => {
  const { title, author, genre, img, price } = req.body;

  const foundBook = database.data.books.find((x) => x.id === req.body.id);

  if (title && title !== foundBook.title) foundBook.title = title;
  if (author && author !== foundBook.author) foundBook.author = author;
  if (genre && genre !== foundBook.genre) foundBook.genre = genre;
  if (img && img !== foundBook.img) foundBook.img = img;
  if (price.value && price.value !== foundBook.price.value)
    foundBook.price.value = price.value;
  if (price.currency && price.currency !== foundBook.price.currency)
    foundBook.price.currency = price.currency;

  database.write();

  res.status(200).json(foundBook);
};

export const deleteBook = (req, res) => {
  database.data.books = database.data.books.filter(
    (x) => x.id !== req.params.id
  );

  database.write();

  res.status(200).json(true);
};
