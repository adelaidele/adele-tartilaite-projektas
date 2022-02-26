import React, {
  createContext, useState, useEffect, useMemo,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import APIService from '../../../services/api-service';

export const ProductContext = createContext();

const searchParamsToObject = (searchParams) => {
  const paramsObject = {};
  searchParams.forEach((value, key) => {
    if (paramsObject[key]) {
      paramsObject[key].push(value);
    } else {
      paramsObject[key] = [value];
    }
  });
  return paramsObject;
};

const ProductProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  // eslint-disable-next-line no-unused-vars
  const [products, setProducts] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [filters, setFilters] = useState([]);

  const changeGenre = (id) => {
    setSearchParams({ genre: id });
    setSelectedGenre(id);
  };

  const syncFiltersWithUrlParams = (newFilters) => {
    const urlParams = searchParamsToObject(searchParams);
    setSearchParams(urlParams);
  };

  const changeRangeFilter = (filter, { min, max }) => {
    console.log({ min, max });

    return filter;
  };

  const changeFilterMap = {
    range: changeRangeFilter,
  };

  const changeFilter = (id, type, props) => {
    const updatedFilters = filters.map((filter) => (filter.id === id
      ? changeFilterMap[type](filter, props)
      : filter));
    setFilters(updatedFilters);
    syncFiltersWithUrlParams(updatedFilters);
  };

  useEffect(() => {
    (async () => {
      const genreData = await APIService.fetchGenres();
      const fetchedGenres = genreData.map((x) => ({
        ...x,
      }));

      const genreParam = searchParams.get('genre');
      const foundGenre = fetchedGenres.find((x) => x.id === genreParam);
      const genre = foundGenre ?? fetchedGenres[0];
      if (!foundGenre) {
        setSearchParams({ genre: genre.id });
      }
      setSelectedGenre(genre.id);
      setGenres(fetchedGenres);
      // FILTRAI
      const filtersData = await APIService.fetchFilters(genre.id);

      const configuredFilters = filtersData.map((filter) => {
        const configuredFilter = { ...filter };
        configuredFilter.currMin = configuredFilter.min;
        configuredFilter.currMax = configuredFilter.max;

        return configuredFilter;
      });
      // TODO: Nuskaityti Url parametrus ir susinchronizuoti juos su filtrais

      setFilters(configuredFilters);
    })();
  }, [searchParams]);

  const contextValue = useMemo(() => ({
    products,
    filters,
    genres,
    selectedGenre,
    changeGenre,
    changeFilter,
  }), [genres, selectedGenre, filters]);

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
