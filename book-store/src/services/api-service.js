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

const fetchBooks = async () => {
  const { token } = store.getState().auth;
  
  const { data } = await annonymousInstance.get('/books', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return data;
};

const fetchBook = async (id) => {
  const { token } = store.getState().auth;
  const response = await annonymousInstance.get(`/books/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  console.log(response.data);
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
  console.log(id);
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

const fetchAllBooks = async () => {
  const [books] = await Promise.all([
    fetchBooks()
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
};

export default APIService;
