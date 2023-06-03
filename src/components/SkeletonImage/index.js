import { Box, Skeleton } from "@mui/material";
import { useState } from "react";

export const SkeletonImage = ({
  src,
  sx,
  objectFit = "cover",
  skeletonHeight,
  ...rest
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoaded = () => {
    setImageLoaded(true);
  };

  return (
    <Box sx={{ position: "relative", ...sx }} {...rest}>
      <Box
        component="img"
        src={src}
        sx={{
          display: imageLoaded ? "block" : "none",
          width: "100%",
          height: "100%",
          objectFit,
          objectPosition: "center",
          userSelect: "none",
        }}
        onLoad={handleImageLoaded}
      />
      {!imageLoaded && (
        <Skeleton
          animation="wave"
          variant="rectangular"
          sx={{
            display: imageLoaded ? "none" : "block",
            height: skeletonHeight || "100%",
            userSelect: "none",
          }}
        />
      )}
    </Box>
  );
};
