import { useAuth } from "reactfire";
import { loginUser } from "../../utils/authService";
import { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Alert, Box, Button, TextField } from "@mui/material";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

export const LoginForm = () => {
  const auth = useAuth();
  const [errorMsg, setErrorMsg] = useState(null);

  const onSubmitHandler = ({ email, password }, helpers) => {
    loginUser(auth, email, password)
      .then(() => {
        setErrorMsg(null);
      })
      .catch((error) => {
        setErrorMsg(error.message);
        helpers.setSubmitting(false);
      });
    helpers.setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: onSubmitHandler,
  });

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          sx={{ my: 1 }}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          sx={{ my: 1 }}
        />
        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          sx={{ my: 1, padding: 2 }}
          disabled={formik.isSubmitting}
        >
          Login
        </Button>
      </form>
    </Box>
  );
};
