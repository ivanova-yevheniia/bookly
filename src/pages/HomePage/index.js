import { Box, Pagination } from "@mui/material";
import localforage from "localforage";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CardList } from "../../components/CardList";
import { Filters } from "../../components/Filters";
import { Loader } from "../../components/Loader";
import { getBooks } from "../../utils/bookService";

export const HomePage = () => {
  const itemsPerPage = 20;
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [year, setYear] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    setPage(1);
  }, [year]);

  const filteredBooks = useMemo(() => {
    return year
      ? books.filter((book) => book["first_publish_year"]?.toString() === year)
      : books;
  }, [books, year]);

  const totalPages = useMemo(
    () => (filteredBooks ? Math.ceil(filteredBooks.length / itemsPerPage) : 0),
    [filteredBooks],
  );

  const pageBooks = useMemo(() => {
    if (!filteredBooks) {
      return [];
    }
    const firstItem = (page - 1) * itemsPerPage;
    const lastItem = firstItem + itemsPerPage;
    return filteredBooks.slice(firstItem, lastItem);
  }, [filteredBooks, page]);

  const fetchBooks = useCallback((search) => {
    setYear(null);
    setPage(1);
    setLoading(true);
    return getBooks(search).then((fetchedBooks) => {
      localforage.setItem("books", fetchedBooks);
      setBooks(fetchedBooks);
      setLoading(false);
      return fetchedBooks;
    });
  }, []);

  const handleLoadBooksData = useCallback(() => {
    setLoading(true);
    localforage.getItem("books").then((cachedBooks) => {
      if (!cachedBooks || cachedBooks.length === 0) {
        fetchBooks();
      } else {
        setBooks(cachedBooks);
        setLoading(false);
      }
    });
  }, [fetchBooks]);

  useEffect(() => {
    handleLoadBooksData();
  }, [handleLoadBooksData]);

  return (
    <Box>
      <Filters
        query={query}
        setQuery={setQuery}
        fetchBooks={fetchBooks}
        year={year}
        setYear={setYear}
      />
      {loading ? <Loader /> : <CardList books={pageBooks} />}
      <Box
        sx={{
          position: "fixed",
          display: "flex",
          justifyContent: "center",
          width: "100%",
          bottom: "20px",
        }}
      >
        {!!(!loading && totalPages) && (
          <Pagination
            sx={{
              display: "inline-block",
              bgcolor: "#eef5ff",
              padding: "8px",
              borderRadius: "16px",
              boxShadow: 3,
            }}
            page={page}
            count={totalPages}
            onChange={handleChangePage}
            variant="outlined"
            color="secondary"
          />
        )}
      </Box>
    </Box>
  );
};
