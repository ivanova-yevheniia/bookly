import CancelIcon from "@mui/icons-material/Cancel";
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import { useMemo } from "react";

export const Filters = ({
  query,
  setQuery,
  fetchBooks,
  year = null,
  setYear,
}) => {
  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const years = [];
    let startYear = 1700;
    while (startYear <= currentYear) {
      years.unshift(startYear++);
    }
    return years;
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        mb: "16px",
      }}
    >
      <Autocomplete
        disablePortal
        size="small"
        options={[...years.map((year) => `${year}`), ""]}
        sx={{ width: "150px" }}
        value={year}
        onChange={(e, newValue) => {
          setYear(newValue);
        }}
        renderInput={(params) => <TextField {...params} label="Year" />}
      />
      <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <TextField
          placeholder="Type in a book title.."
          size="small"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={() => {
                  setQuery("");
                }}
              >
                <CancelIcon />
              </IconButton>
            ),
          }}
        />
        <Button
          sx={{ height: "40px" }}
          variant="outlined"
          onClick={() => {
            fetchBooks(query);
          }}
        >
          Search
        </Button>
      </Box>
    </Box>
  );
};
