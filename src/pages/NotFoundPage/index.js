import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <Box
      sx={{
        height: "calc(100vh - 300px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography fontWeight="bold" variant="h4" color="secondary">
          Such page does not exist..
        </Typography>
        <Button
          sx={{ mt: "24px", fontSize: "16px" }}
          variant="outlined"
          color="secondary"
          LinkComponent={Link}
          to="/"
        >
          Back to Home Page
        </Button>
      </Box>
    </Box>
  );
};
