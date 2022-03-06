import database from "../database/index.js";
import { v4 as createId } from "uuid";

const filterByRange = (books, filter, queryParams) => {
  const min = Number(queryParams[`${filter.name}_min`]);
  const max = Number(queryParams[`${filter.name}_max`]);
  if (min) {
    books = books.filter(x => x[filter.property].value >= min);
  }
  if (max) {
    books = books.filter(x => x[filter.property].value <= max);
  }
  return books;
};

const filterFunctionMap = {
  range: filterByRange,
}

export const getBooks = (req, res) => {
  const books = database.data.books;
  const filters = database.data.filters;
  const genres = database.data.genres;

  if(Object.keys(req.query).length === 0){
    res.status(200).json(books);
  }

  const {
    genre: genreId,
    ...queryParams
  } = req.query;

  let selectedBooks = books
  .filter(x => x.genre === genreId)
  .map(({ genre, ...book }) => book);

  const genre = genres.find(x => x.id === genreId);
  const genreFilters = genre.filters.map(filterId => filters.find(x => x.id === filterId));

  genreFilters.forEach(filter => {
    selectedBooks = filterFunctionMap[filter.type](selectedBooks, filter, queryParams);
    if (filter.collection) {
      selectedBooks = mapWithFilterCollection(selectedBooks, filter, database.data);
    }
  });

  res.status(200).json(selectedBooks);
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
