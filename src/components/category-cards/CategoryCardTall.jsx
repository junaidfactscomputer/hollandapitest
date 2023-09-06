import Image from "next/image";
import { H4 } from "components/Typography";
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
      // display:'block',
      
      // left: 50,
      // right: 0,
      opacity:0.78,
      
    
      color: theme.palette.common.white,
      
      backgroundColor: theme.palette.dark.main,
    },
  },
}));
const CategoryTitle = styled(Box)({
  
  // maxWidth:0,
  // left:-200,
  // opacity:0,
  padding: 6,
  left: 20,
      right: 20,
  bottom: 10,
  maxWidth:'100%',
  textAlign: "center",
  borderRadius: "2px",
  position: "absolute",
  transition: "all 0.4s",
  backgroundColor: "rgba(210,51,67, .89)",
  color:'white',
  // display:'none',
  // textAlign:'right'
});

// ============================================================

// ============================================================

const CategoryCardTall = ({ image, title }) => {
  return (
    <Wrapper position="relative">
      <LazyImage
        src={image}
        width={500}
        height={500}
        alt="category"
        sx={{
          height: "100%",
          objectFit: "cover",
          objectPosition: "center center",
        }}
      />

      <CategoryTitle className="category-title">
        <H4 sx={{ fontSize:{sm:'1.2rem',md:'1.6vw'} }}>{title}</H4>
      </CategoryTitle>
    </Wrapper>
  );
};
export default CategoryCardTall;
