import { Box, CircularProgress, Typography } from "@mui/material";

export const Loader = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transform: "translate(-50%, -50%)",
        gap: "32px",
      }}
    >
      <CircularProgress color="secondary" />
      <Typography
        variant="h1"
        sx={{ fontSize: "24px", fontWeight: "bold" }}
        color="secondary"
      >
        Loading content..
      </Typography>
    </Box>
  );
};
