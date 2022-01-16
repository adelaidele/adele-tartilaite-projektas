import axios from "axios";

const annonymousInstance = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  mode: "no-cors",
});

const fetchBooks = async () => {
  const response = await annonymousInstance.get("/books");
  return response.data;
};
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

const APIService = {
  fetchBooks,
  fetchAllBooks,
};


export default APIService;
