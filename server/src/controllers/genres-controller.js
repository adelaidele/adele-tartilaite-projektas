import database from '../database/index.js';

export const getGenres = (req, res) => {
  const genres = database.data.genres;
  res.status(200).json(genres);
}
