import React, {
  createContext, useMemo,
} from 'react';
import useGenres from './use-genres';
import useBooks from './use-books';
import useFilters from './use-filters';

export const ProductContext = createContext();
const ProductProvider = ({ children }) => {
  const { genres, selectedGenre, changeGenre} = useGenres();
  const {filters, changeFilter} = useFilters(selectedGenre); 
  const books = useBooks(selectedGenre);

  const contextValue = useMemo(() => ({ //hooksas skirtas duomenu prisiminimui, reiksmes bus perskaiciuojamos jei tik kazkas is dependencies pasikeistu
    books,
    filters,
    genres,
    selectedGenre,
    changeGenre,
    changeFilter,
  }), [genres, selectedGenre, filters, books]);

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
