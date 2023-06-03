import { Box, Grid, Typography } from "@mui/material";
import { BookCard } from "../BookCard";

export const CardList = ({ books }) => {
  if (!books || books.length === 0) {
    return (
      <Box
        sx={{
          height: "calc(100vh - 300px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography fontWeight="bold" variant="h4" color="secondary">
          Requested books were not found..
        </Typography>
      </Box>
    );
  }

  return (
    <Grid
      container
      spacing={2}
      rowGap={2}
      columns={{ xs: 1, sm: 2, md: 4, lg: 5 }}
      sx={{ mb: "72px" }}
    >
      {books.map((book) => (
        <Grid key={book.key} item xs={1}>
          <BookCard book={book} />
        </Grid>
      ))}
    </Grid>
  );
};
