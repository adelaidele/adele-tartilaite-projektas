import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SingleBookPage from './pages/single-book-page/single-book-page';
import BookGridPage from './pages/book-grid-page/book-grid-page';
import Navbar from './components/navbar/navbar';
import ManagementPage from './pages/management-page/management-page';
import ManagementPageBookForm from './pages/management-page/management-page-book-form';
import LoginPage from './pages/login-page';
import RegisterPage from './pages/register-page';

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="book/:id" element={<SingleBookPage />} />
      <Route path="book-grid" element={<BookGridPage />} />
      <Route path="management" element={<ManagementPage />} />
      <Route path="management/add" element={<ManagementPageBookForm />} />
      <Route path="management/edit/:id" element={<ManagementPageBookForm />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
