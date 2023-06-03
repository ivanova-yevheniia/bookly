import { Alert, Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useAuth } from "reactfire";
import * as yup from "yup";
import { registerUser } from "../../utils/authService";
import { useNavigate } from "react-router-dom";
// import { capitalizeFirstLetter } from "../../../utils";

const validationSchema = yup.object({
  name: yup
    .string()
    .min(
      2,
      "Name should be of minimum 2 characters length, otherwise change it in your passport",
    )
    .required("Name is required"),
  surname: yup
    .string()
    .min(
      2,
      "Surname should be of minimum 2 characters length, otherwise change it in your passport",
    )
    .required("Surname is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

export const RegisterForm = () => {
  const auth = useAuth();
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();

  const onSubmitHandler = ({ email, password, name, surname }, helpers) => {
    const displayName = `${name} ${surname}`;
    registerUser(auth, email, password, displayName)
      .then(() => {
        setErrorMsg(null);
        navigate("/login");
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
    helpers.setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: onSubmitHandler,
  });

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex">
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            sx={{ my: 1, marginRight: 1 }}
          />
          <TextField
            fullWidth
            id="surname"
            name="surname"
            label="Surname"
            value={formik.values.surname}
            onChange={formik.handleChange}
            error={formik.touched.surname && Boolean(formik.errors.surname)}
            helperText={formik.touched.surname && formik.errors.surname}
            sx={{ my: 1, marginLeft: 1 }}
          />
        </Box>
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
          Register
        </Button>
      </form>
    </Box>
  );
};
