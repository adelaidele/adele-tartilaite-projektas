import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import APIService from '../../../services/api-service';

const useGenres = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const setGenreFromUrl = (fetchedGenres) => {
    const genreParam = searchParams.get('genre');
    const foundGenre = fetchedGenres.find((x) => x.id === genreParam);
    const genre = foundGenre ?? fetchedGenres[0];
    if (!foundGenre) {
      setSearchParams({ genre: genre.id });
    }
    setSelectedGenre(genre.id);
    setGenres(fetchedGenres);
  };

  const changeGenre = (id) => {
    setSearchParams({ genre: id });
    setSelectedGenre(id);
  };

  useEffect(() => {
    (async () => {
      const genresData = await APIService.fetchGenres();
      const fetchedGenres = genresData.map((x) => ({
        ...x,
      }));
      setGenreFromUrl(fetchedGenres);
    })();
  }, []);

  return {
    genres,
    selectedGenre,
    changeGenre,
  };
};

export default useGenres;