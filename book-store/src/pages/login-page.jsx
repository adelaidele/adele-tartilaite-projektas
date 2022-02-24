import React, { useState } from 'react';
import { TextField, Grid, Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import * as yup from 'yup';
import AuthForm from '../components/auth-form/auth-form';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Email is not valid!')
    .required('Email is required!'),
  password: yup.string().required('Password is required!'),
});

const initialValues = {
  email: '',
  password: '',
};

const LoginPage = () => {
  const [errorMsg, setErrorMsg] = useState(null);

  const handleLogin = ({ email, password }) => {
    console.log(email, password);
  };

  const {
    values,
    errors,
    touched,
    isValid,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <AuthForm
      title="Login"
      linkTitle="Don't have an account? Register"
      onSubmit={handleSubmit}
      loading={isSubmitting}
      isValid={dirty && isValid}
    >
      <Grid container spacing={4}>
        {errorMsg ? (
          <Grid item xs={12}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => setErrorMsg(null)}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {errorMsg}
            </Alert>
          </Grid>
        ) : null}
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            id="email"
            label="Email"
            autoFocus
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            disabled={isSubmitting}
          />
        </Grid>
        <Grid item xs={12} sx={{ mb: 4 }}>
          <TextField
            variant="outlined"
            fullWidth
            label="Password"
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            disabled={isSubmitting}
          />
        </Grid>
      </Grid>
    </AuthForm>
  );
};

export default LoginPage;
