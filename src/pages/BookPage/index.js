import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import notFoundCoverImage from "../../assets/images/image-not-found.jpeg";
import { Loader } from "../../components/Loader";
import { SkeletonImage } from "../../components/SkeletonImage";
import { getBookById } from "../../utils/bookService";
import { getCoverImageByCoverId } from "../../utils/getCoverImageByCoverId";

export const BookPage = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    title,
    covers,
    description,
    first_publish_date: publishYear,
    subject_places: subjectPlaces,
    subjects,
  } = book || {};

  const descriptionText = description?.value || description;
  const coverId = covers?.[0];
  const coverImageUrl = coverId
    ? getCoverImageByCoverId(coverId)
    : notFoundCoverImage;

  useEffect(() => {
    setLoading(true);
    getBookById(bookId).then((bookData) => {
      const { error: dataError } = bookData || {};
      if (dataError) {
        setError(dataError);
      } else {
        setBook(bookData);
      }
      setLoading(false);
    });
  }, [bookId]);

  if (error) {
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
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography fontWeight="bold" variant="h4" color="secondary">
            Such a book does not exist..
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
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", pb: "16px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "70vw",
          maxWidth: "1000px",
          gap: "16px",
        }}
      >
        <Button
          LinkComponent={Link}
          to="/"
          variant="outlined"
          startIcon={<ArrowBackIcon />}
        >
          Back to Homepage
        </Button>
        <Box
          sx={{
            flexGrow: 1,
            width: "100%",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <SkeletonImage
            skeletonHeight="70vh"
            src={coverImageUrl}
            sx={{
              userSelect: "none",
              width: "40%",
              maxWidth: "600px",
            }}
            objectFit="contain"
          />
          <Box sx={{ width: "50%" }}>
            <Typography
              sx={{ fontSize: "24px", fontWeight: "bold", mb: "16px" }}
            >
              {title}
            </Typography>
            <Typography color="#565656" sx={{ mb: "8px" }}>
              <Typography fontWeight="bold" component="span">
                Subjects:{" "}
              </Typography>
              <Typography component="span">
                {subjects?.slice(0, 5)?.join(", ")}
              </Typography>
            </Typography>
            <Typography color="#565656" sx={{ mb: "8px" }}>
              <Typography fontWeight="bold" component="span">
                Subject places:{" "}
              </Typography>
              <Typography component="span">
                {subjectPlaces?.join(", ")}
              </Typography>
            </Typography>
            <Typography color="#565656" sx={{ mb: "16px" }}>
              <Typography fontWeight="bold" component="span">
                Publish year:{" "}
              </Typography>
              <Typography component="span">{publishYear}</Typography>
            </Typography>
            <Typography>
              <Typography
                sx={{ textDecoration: "underline", display: "block" }}
                color="#565656"
                component="span"
              >
                Description:
              </Typography>
              <Typography
                sx={{
                  fontStyle: "italic",
                  textAlign: "justify",
                  overflowWrap: "anywhere",
                }}
                component="span"
              >
                {descriptionText || "No description found."}
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
