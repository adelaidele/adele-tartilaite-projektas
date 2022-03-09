import React, { useState, useCallback, useEffect } from 'react';
import APIService from '../../services/api-service';
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Typography,
  TablePagination,
  Paper,
  Box,
  Modal,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { theme } from '../../libs/ThemeCreator';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: theme.palette.white.main,
  border: 'none',
  boxShadow: 24,
  outline: 'none',
  p: 4,
};

const ManagementTable = () => {
  const [books, setBooks] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState({});
  const [page, setPage] = useState(0);

  const rowsPerPage = 5;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

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
      const fetchedManagementBooks = await APIService.fetchFormatedBooks();
      setBooks(fetchedManagementBooks);
    })();
  }, []);

  const deleteBook = (id) => {
    APIService.deleteBook(id).then(() => {
      handleModalClose(false);
      (async () => {
        const fetchedManagementBooks = await APIService.fetchAllBooks();
        setBooks(fetchedManagementBooks);
      })();
    });
  };

  const columns = [
    'Id',
    'Image',
    'Title',
    'Author',
    'Genre',
    'Price',
    'Actions',
  ];

  return (
    <Box display="flex" flexDirection="column" flex={1}>
      <Button
        variant="contained"
        sx={{ width: 150, height: 50, mb: '20px' }}
        onClick={navigateToAddBook}
      >
        Add new book
      </Button>
      <Modal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Do you want to delete book "{selectedBook.title}"?
          </Typography>
          <Box sx={{display:'flex', justifyContent: 'flex-end'}}>
          <Button
            variant="contained"
            color="error"
            onClick={() => deleteBook(selectedBook.id)}
            sx={{marginRight: '15px'}}
          >
            Delete
          </Button>
          <Button variant="contained" color="warning" onClick={handleModalClose}>
            Cancel
          </Button>
          </Box>
        </Box>
      </Modal>
      <Paper elevation={3}>
        <Box display="flex" flexDirection="column" flex={1}>
          <TableContainer>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column}>
                      <Typography variant="h6">{column}</Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? books.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : books
                ).map((book) => {
                  return (
                    <TableRow key={book.id} title="tableRow" hover>
                      <TableCell>{book.id}</TableCell>
                      <TableCell align="left">
                        <img
                          className="grid-image"
                          style={{ width: 100, height: 150 }}
                          src={book.img}
                          alt="#"
                        />
                      </TableCell>
                      <TableCell align="left">{book.title}</TableCell>
                      <TableCell align="left">{book.author}</TableCell>
                      <TableCell align="left">{book.genre}</TableCell>
                      <TableCell align="left">{book.price}</TableCell>
                      <TableCell>
                        <ModeEditOutlineOutlinedIcon
                          onClick={() => navigateToEditBook(book.id)}
                        />
                        <HighlightOffOutlinedIcon
                          onClick={() => handleDelete(book)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box
          display="flex"
          justifyContent="flex-end"
          flex={1}
          padding={1}
          paddingRight={10}
        >
          <TablePagination
            page={page}
            rowsPerPage={5}
            count={books.length}
            rowsPerPageOptions={[5]}
            shape="rounded"
            color="primary"
            onPageChange={handleChangePage}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default ManagementTable;
