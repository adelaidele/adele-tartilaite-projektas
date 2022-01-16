import React from "react";
import BookGridPage from "./pages/book-grid-page/book-grid-page";
import Navbar from "./components/navbar/navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="book-grid" element={<BookGridPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
