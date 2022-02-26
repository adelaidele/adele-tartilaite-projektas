import database from '../database/index.js';

export const getFilters = (req, res) => {
  let filters = database.data.filters;
  console.log(filters);
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
          books.sort((a, b) => a[filter.property] - b[filter.property]);
          filter.min = Math.floor(books[0][filter.property].value);
          filter.max = Math.max(...books.flatMap(x => x.price.value));
          console.log(filter.max);
        }
    return filter;
  });
  res.status(200).json(filters);
}

