import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import APIService from '../../../services/api-service';

const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [searchParams] = useSearchParams();
  useEffect(() => {
    (async () => {
      if (searchParams.get('genre')) {
        const fetchedBooks = await APIService.fetchFormatedBooks(searchParams);
        setBooks(fetchedBooks);
      }
    })();
  }, [searchParams]);

  return books;
};

export default useBooks;