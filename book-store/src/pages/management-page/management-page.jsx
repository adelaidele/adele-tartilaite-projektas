import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Modal, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

import APIService from '../../services/api-service';
import '../../index.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ManagementPage = () => {
  const emptyBooks = [...new Array(20)].map((_, id) => ({ id }));
  const [books, setBooks] = useState(emptyBooks);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState({});

  const navigate = useNavigate();

  const navigateToAddBook = () => navigate(`/management/add`);

  const navigateToEditBook = useCallback(
    (id) => {
      navigate(`/management/edit/${id}`);
    },
    [navigate]
  );

  const handleDelete = (book) => {
    setSelectedBook(book);
    setIsDeleteModalOpen(true);
  };

  const handleModalClose = () => setIsDeleteModalOpen(false);

  useEffect(() => {
    (async () => {
      const fetchedManagementBooks = await APIService.fetchAllBooks('');
      setBooks(fetchedManagementBooks);
    })();
  }, []);

  const deleteBook = (id) => {
    APIService.deleteBook(id);

    handleModalClose(false);

    (async () => {
      const fetchedManagementBooks = await APIService.fetchAllBooks();
      setBooks(fetchedManagementBooks);
    })();
  };

  return (
    <Box>
      <Button variant="contained" onClick={navigateToAddBook}>
        add new book
      </Button>
      <Modal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Do you want to delete book {selectedBook.title}?
          </Typography>
          <Button
            variant="contained"
            onClick={() => deleteBook(selectedBook.id)}
          >
            Delete
          </Button>
          <Button variant="contained" onClick={handleModalClose}>
            Cancel
          </Button>
        </Box>
      </Modal>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Id</TableCell>
              <TableCell align="right">Image</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Author</TableCell>
              <TableCell align="right">Genre</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow
                key={book.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="right">{book.id}</TableCell>
                <TableCell align="right">
                  <img className="grid-image" src={book.img} alt="#" />
                </TableCell>
                <TableCell align="right">{book.title}</TableCell>
                <TableCell align="right">{book.author}</TableCell>
                <TableCell align="right">{book.genre}</TableCell>
                <TableCell align="right">{book.price}</TableCell>
                <TableCell align="center">
                  <ModeEditOutlineOutlinedIcon
                    onClick={() => navigateToEditBook(book.id)}
                  />
                  <HighlightOffOutlinedIcon
                    onClick={() => handleDelete(book)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ManagementPage;
