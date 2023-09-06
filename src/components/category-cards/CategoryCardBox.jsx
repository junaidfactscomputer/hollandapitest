import Image from "next/image";
import { Box, styled } from "@mui/material";
import LazyImage from "components/LazyImage";

// custom styled components
const Wrapper = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  overflow: "hidden",
  borderRadius: "4px",
  "& img": {
    transition: "all 0.3s",
  },
  ":hover": {
    img: {
      transform: "scale(1.1)",
    },
    "& .category-title": {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.dark.main,
    },
  },
}));

// ============================================================

// ============================================================

const CategoryCardBox = ({ image, title }) => {
  return (
    <Wrapper position="relative">
      <LazyImage
        width={300}
        height={300}
        alt="category"
        className="product-img"
        src={image}
      />
      {/* <Image src={image} width={300} height={300} alt="category" /> */}
    </Wrapper>
  );
};
export default CategoryCardBox;
