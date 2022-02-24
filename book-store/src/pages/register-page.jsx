import React from 'react';
import { TextField, Grid } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import AuthForm from '../components/auth-form/auth-form';
import APIService from '../services/api-service';

const validationSchema = yup.object({
  username: yup.string('Enter User Name').required('User Name is required'),
  firstName: yup.string('Enter First Name').required('First Name is required'),
  lastName: yup.string('Enter Last Name').required('Last Name is required'),
  email: yup.string('Enter email').required('Email is required'),
  telephoneNumber: yup
    .string('Enter Telephne Number')
    .required('Telephne Number is required'),
  address: yup.string('Enter address').required('Address is required'),
  city: yup.string('Enter city').required('City is required'),
  password: yup.string('Enter a password').required('Password is required'),
});

const initialValues = {
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  telephoneNumber: '',
  address: '',
  city: '',
  password: '',
};

const RegisterPage = () => {
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      APIService.addUser({ ...values, role: 'user' });
    },
  });

  return (
    <AuthForm
      title="Register"
      linkTo="/login"
      linkTitle="Already have an account? Log in"
      onSubmit={formik.handleSubmit}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            autoComplete="username"
            name="username"
            variant="outlined"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            fullWidth
            id="username"
            label="User Name"
            autoFocus
          />
        </Grid>
        <Grid item xs={6} sm={6} lg={6}>
          <TextField
            autoComplete="fname"
            name="firstName"
            variant="outlined"
            fullWidth
            id="firstName"
            label="First Name"
            autoFocus
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
        </Grid>
        <Grid item xs={6} sm={6} lg={6}>
          <TextField
            variant="outlined"
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="lname"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            name="telephoneNumber"
            label="Telephone Number"
            id="telephoneNumber"
            autoComplete="telephoneNumber"
            value={formik.values.telephoneNumber}
            onChange={formik.handleChange}
            error={
              formik.touched.telephoneNumber &&
              Boolean(formik.errors.telephoneNumber)
            }
            helperText={
              formik.touched.telephoneNumber && formik.errors.telephoneNumber
            }
          />
        </Grid>
        <Grid item xs={6} sm={6} lg={6}>
          <TextField
            variant="outlined"
            fullWidth
            name="address"
            label="Address"
            id="address"
            autoComplete="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
        </Grid>
        <Grid item xs={6} sm={6} lg={6}>
          <TextField
            variant="outlined"
            fullWidth
            name="city"
            label="City"
            id="city"
            autoComplete="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
          />
        </Grid>
      </Grid>
    </AuthForm>
  );
};
export default RegisterPage;
