import axios from "axios";
import store from '../store/index';

const annonymousInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  }
});

const addOrder = async (orderData) => {
  const { token } = store.getState().auth;
  const response = await annonymousInstance.post('/order',  orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
}

const fetchBooks = async (searchParams) => {
  const { token } = store.getState().auth;
  if(!searchParams) {
    const { data } = await annonymousInstance.get(`books`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return data;
  } else {
    const { data } = await annonymousInstance.get(`books?${searchParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return data;
  }
};

const fetchBook = async (id) => {
  const { token } = store.getState().auth;
  const response = await annonymousInstance.get(`/books/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
}

const addBook = async (bookData) => {
  const { token } = store.getState().auth;

  const response = await annonymousInstance.post(`/books`, bookData,  {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
}

const deleteBook = async (id) => {
  const { token } = store.getState().auth;
  const response  = await annonymousInstance.delete(`/books/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response;
}

const updateBook = async (id, data) => {
  const { token } = store.getState().auth;
  const response = await annonymousInstance.patch(`/books/${id}`, {...data, id: id}, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response;
}

const fetchAllBooks = async (searchParams) => {
  const [books] = await Promise.all([
    fetchBooks(searchParams)
  ]);

  const formatedBooks = books.map(
    ({ title, props, price, ...rest }) => {
      const book = {
        ...rest,
        title,
        price: `${price.value} ${price.currency}`,
      };

      return book;
    }
  );

  return formatedBooks;
};

const fetchFormatedBook = async (id) => {
  const [book] = await Promise.all([
    fetchBook(id)
  ]);

  const formattedBook = {
    ...book,
    price: `${book.price.value} ${book.price.currency}`
  }

  return formattedBook;
}

const checkEmail = (email) => new Promise(((success) => {
  const existingEmails = ['admin@gmail.com', 'user1@gmail.com'];
  setTimeout(() => {
    const emailAvailable = !existingEmails.includes(email);
    success(emailAvailable);
  }, 1000);
}));

const register = () => new Promise(((success) => {
  setTimeout(() => {
    success(true);
  }, 2000);
}));

const fetchFilters = async (genreId) => {
  const { token } = store.getState().auth;
  let queryParams = '';
  if (genreId) {
    queryParams = `?genre=${genreId}`;
  }

  try {
    const { data } = await annonymousInstance.get(`/filters${queryParams}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const fetchGenres = async () => {
  const { token } = store.getState().auth;
  try {
    const { data } = await annonymousInstance.get('/genres', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const APIService = {
  fetchBooks,
  fetchAllBooks,
  fetchBook,
  addBook,
  deleteBook,
  fetchFormatedBook,
  updateBook,
  checkEmail,
  register,
  addOrder,
  fetchFilters,
  fetchGenres,
};

export default APIService;
