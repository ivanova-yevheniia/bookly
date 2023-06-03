import { Box, Container, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { LoginForm } from "../../components/LoginForm";
import { useSigninCheck } from "reactfire";

export const LoginPage = () => {
  const { data: signInData } = useSigninCheck();
  const navigate = useNavigate();

  const userName = signInData?.user?.displayName;
  const signedIn = signInData?.signedIn;

  const isUserSignedIn = signedIn && userName;

  if (isUserSignedIn) {
    navigate("/");
  }

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography my={1} color="primary" variant="h4" fontWeight="bold">
          Sign in to Bookly
        </Typography>
        <Box width={1 / 2} my={1}>
          <LoginForm />
        </Box>
        <Typography my={1} color="primary" component={Link} to="/register">
          Click to Register!
        </Typography>
      </Box>
    </Container>
  );
};
