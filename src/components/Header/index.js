import {
  AppBar,
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useSigninCheck } from "reactfire";
import bookIcon from "../../assets/images/book.svg";
import { logoutUser } from "../../utils/authService";
import LogoutIcon from "@mui/icons-material/Logout";

export const Header = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const { data: signInData } = useSigninCheck();

  const userName = signInData?.user?.displayName;
  const signedIn = signInData?.signedIn;

  const isUserSignedIn = signedIn && userName;

  const logoutUserHandler = () => {
    logoutUser(auth);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        height: "72px",
        p: "8px 16px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: "16px",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "16px",
          alignItems: "center",
        }}
      >
        <IconButton
          LinkComponent={Link}
          onClick={() => {
            navigate("/");
          }}
        >
          <Box sx={{ width: "40px" }} component="img" src={bookIcon}></Box>
        </IconButton>
        <Typography>
          <Typography
            sx={{ fontSize: "20px", fontWeight: "bold" }}
            component="span"
          >
            Bookly
          </Typography>
          <Typography sx={{ fontSize: "18px" }} component="span">
            {" "}
            - book search service
          </Typography>
        </Typography>
      </Box>

      {isUserSignedIn && (
        <Box sx={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <Typography fontWeight="bold">{userName}</Typography>
          <Button
            onClick={logoutUserHandler}
            color="secondary"
            variant="contained"
            sx={{ display: "flex", gap: "8px" }}
          >
            Logout
            <LogoutIcon sx={{ width: "16px", height: "16px" }} />
          </Button>
        </Box>
      )}

      {!isUserSignedIn && (
        <ButtonGroup color="secondary" variant="contained">
          <Button component={Link} to="/login" sx={{ color: "white" }}>
            Login
          </Button>
          <Button component={Link} to="/register" sx={{ color: "white" }}>
            Register
          </Button>
        </ButtonGroup>
      )}
    </AppBar>
  );
};
