import React from "react";
import SingleBookPage from "./pages/single-book-page/single-book-page";
import BookGridPage from "./pages/book-grid-page/book-grid-page";
import Navbar from "./components/navbar/navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ManagementPage from "./pages/management-page/management-page";
import ManagementPageBookForm from "./pages/management-page/management-page-book-form";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
      <Route path="book/:id" element={<SingleBookPage />} />
        <Route path="book-grid" element={<BookGridPage />} />
        <Route path="management" element={<ManagementPage />} />
    <Route path="management/add" element={<ManagementPageBookForm />} />
    <Route path="management/edit/:id" element={<ManagementPageBookForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
