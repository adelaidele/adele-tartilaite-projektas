import database from '../database/index.js';

export const getFilters = (req, res) => {
  let filters = database.data.filters;
  const genre = database.data.genres.find(x => x.id === req.query.genre);
  if (genre && genre.filters) {
    filters = filters.filter(x => genre.filters.includes(x.id));
  }

  filters = filters.map((filter) => {
        let books = database.data.books;
        if (genre && genre.id) books = books.filter(x => x.genre === genre.id);
        filter.min = 0;
        filter.max = 0;
        if (books.length > 0) {
          const sortedBooks = books.sort((a, b) => a.price.value - b.price.value);
          filter.min = sortedBooks[0].price.value;
          filter.max = sortedBooks[sortedBooks.length - 1].price.value;
        }

    return filter;
  });
  res.status(200).json(filters);
}

