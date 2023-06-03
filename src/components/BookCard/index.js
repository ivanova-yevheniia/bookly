import { Box, Card, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import notFoundCoverImage from "../../assets/images/image-not-found.jpeg";
import { getCoverImageByCoverId } from "../../utils/getCoverImageByCoverId";
import { getBookPageRoute } from "../../utils/router";
import { SkeletonImage } from "../SkeletonImage";

export const BookCard = ({ book }) => {
  const {
    title,
    author_name: authors,
    cover_i: coverId,
    first_publish_year: publishYear,
    key,
  } = book || {};

  const bookId = key?.replace("/works/", "");
  const author = authors?.join(", ");
  const coverImageUrl = coverId
    ? getCoverImageByCoverId(coverId)
    : notFoundCoverImage;

  return (
    <Link style={{ textDecoration: "none" }} to={getBookPageRoute(bookId)}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
          p: "16px",
          mb: "16px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <SkeletonImage
            src={coverImageUrl}
            sx={{
              mb: "12px",
              userSelect: "none",
              width: "100px",
              height: "150px",
            }}
          />
          <Typography
            variant="h6"
            fontWeight="bold"
            title={title}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
              textAlign: "center",
              fontSize: "16px",
              lineHeight: "20px",
            }}
          >
            {title}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            title={author}
            sx={{
              display: "flex",
              gap: "4px",
            }}
          >
            <Typography sx={{ textDecoration: "underline" }} component="span">
              Author:{" "}
            </Typography>
            <Typography
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "1",
                WebkitBoxOrient: "vertical",
              }}
              component="span"
            >
              {author}
            </Typography>
          </Typography>
          <Typography
            sx={{ mt: "4px", color: "#a7a7a7", display: "flex", gap: "4px" }}
          >
            <Typography fontWeight="bold" component="span">
              Publish year:
            </Typography>
            <Typography component="span">{publishYear}</Typography>
          </Typography>
        </Box>
      </Card>
    </Link>
  );
};
