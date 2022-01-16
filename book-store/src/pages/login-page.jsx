import React from "react";
import { TextField, Grid } from "@mui/material";
import AuthForm from "../components/auth-form/auth-form";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup.string("Enter a email").required("Email is required"),
  password: yup.string("Enter a password").required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => console.log(values),
  });

  return (
    <AuthForm
      title="Log in"
      linkTo="/register"
      linkTitle="No account? Create one"
      onSubmit={formik.handleSubmit}
    >
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            autoFocus
            id="email"
            variant="outlined"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item xs={12} sx={{ mb: 4 }}>
        <TextField
            fullWidth
            id="password"
            variant="outlined"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>
      </Grid>
    </AuthForm>
  );
};

export default LoginPage;
