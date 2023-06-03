import { Box } from "@mui/material";
import { Header } from "../Header";

export const PageContainer = ({ children }) => {
  return (
    <Box>
      <Header />
      <Box sx={{ p: "20px" }}>{children}</Box>
    </Box>
  );
};
