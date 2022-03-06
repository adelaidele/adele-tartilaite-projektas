import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Button,
  Box,
  TextField,
  Select,
  MenuItem,
  Container,
  Grid,
  Snackbar,
  FormControl,
  InputLabel,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import APIService from '../../services/api-service';
import '../../index.css';

const validationSchema = yup.object({
  title: yup.string('Enter a title').required('Email is required'),
  genre: yup.string('Enter a title').required('Email is required'),
  author: yup.string('Enter a title').required('Email is required'),
  img: yup.string('Enter a title').required('Email is required'),
  price: yup.string('Enter a title').required('Email is required'),
  currency: yup.string('Select currency').required('Currency is required'),
});

const initialValues = {
  id: '',
  title: '',
  genre: '',
  author: '',
  img: '',
  price: '',
  currency: '',
};

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const ManagementPageBookForm = () => {
  const [formValues, setFormValues] = useState(initialValues);
  const [genres, setGenres] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const { id } = useParams();
  const [openNotification, setOpenNotification] = useState(false);

  const navigate = useNavigate();

  const navigateToManagementPage = useCallback(() => {
    navigate(`/management`);
  }, [navigate]);

  useEffect(() => {
    (async () => {
      if (id) {
        setEditMode(true);
        const book = await APIService.fetchBook(id);
        const formatedBook = {
          ...book,
          price: book.price.value,
          currency: book.price.currency,
        };
        setFormValues(formatedBook);
      }
    })();
    APIService.fetchGenres().then((result) => {
      setGenres(result);
    });
  }, []);

  const handleClose = () => {
    setOpenNotification(false);
  };

  const formik = useFormik({
    initialValues: formValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      const request = {
        ...values,
        price: {
          value: values.price,
          currency: values.currency,
        },
      };

      const { currency, ...newRequest } = request;
      if (editMode) {
        APIService.updateBook(id, request);
        setOpenNotification(true);
        setTimeout(() => {
          navigateToManagementPage();
        }, 2000);
      } else {
        APIService.addBook(newRequest);
        setOpenNotification(true);
        setTimeout(() => {
          navigateToManagementPage();
        }, 1000);
      }
    },
  });

  return (
    <Container maxWidth="xs" component="main" sx={{ pt: '7vh' }}>
      <Box component="form" onSubmit={formik.handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={12}>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
          </Grid>
          <Grid item xs={12} lg={12}>
            <TextField
              fullWidth
              id="author"
              name="author"
              label="Author"
              value={formik.values.author}
              onChange={formik.handleChange}
              error={formik.touched.author && Boolean(formik.errors.author)}
              helperText={formik.touched.author && formik.errors.author}
            />
          </Grid>
          <Grid item xs={12} lg={12}>
            <TextField
              fullWidth
              id="img"
              name="img"
              label="Image url"
              value={formik.values.img}
              onChange={formik.handleChange}
              error={formik.touched.img && Boolean(formik.errors.img)}
              helperText={formik.touched.img && formik.errors.img}
            />
          </Grid>
          <Grid item xs={12} lg={12}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <TextField
                  variant="outlined"
                  name="genre"
                  id="genre"
                  select
                  label="Genre"
                  value={formik.values.genre}
                  onChange={formik.handleChange}
                  error={formik.touched.genre && Boolean(formik.errors.genre)}
                  helperText={formik.touched.genre && formik.errors.genre}
                >
                  {genres.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.title}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              fullWidth
              id="price"
              name="price"
              label="Price"
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="currency-select-label">Currency</InputLabel>
                <Select
                  labelId="currency-select-label"
                  id="currency-select"
                  value={formik.values.currency}
                  label="Currency"
                  onBlur={formik.handleBlur}
                  onChange={(e) =>
                    formik.setFieldValue('currency', e.target.value)
                  }
                  error={
                    formik.touched.currency && Boolean(formik.errors.currency)
                  }
                >
                  <MenuItem value="EUR">Eur</MenuItem>
                  <MenuItem value="USD">Usd</MenuItem>
                </Select>
              </FormControl>
              <p className="select-error-message">
                {formik.touched.currency && formik.errors.currency}
              </p>
            </Box>
          </Grid>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </Grid>
        <Snackbar
          open={openNotification}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: '100%' }}
          >
            This is a success message!
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default ManagementPageBookForm;
