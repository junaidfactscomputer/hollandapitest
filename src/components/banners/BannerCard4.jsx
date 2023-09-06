import { Box, styled } from "@mui/material";
import BazaarImage from "components/BazaarImage";

// custom styled components
const CardWrapper = styled(Box)({
  maxHeight: 240,
  overflow: "hidden",
  borderRadius: "10px",
  position: "relative",
  "& img": {
    transition: "0.3s",
  },
  ":hover": {
    img: {
      transform: "scale(1.1)",
    },
  },
});
const CardContent = styled(Box)({
  top: 0,
  zIndex: 1,
  padding: 32,
  width: "100%",
  color: "#fff",
  height: "100%",
  display: "flex",
  position: "absolute",
  alignItems: "center",
  justifyContent: "space-between",
});

// ========================================================

// ========================================================

const BannerCard4 = ({ img, url, text1, text2, text3 }) => {
  return (
    <CardWrapper>
      <BazaarImage
        href="#"
        alt="category"
        height="100%"
        width="100%"
        src={img}
      />

      <CardContent>
        {/* <Link href={url}>
            <Button variant="outlined" size="large" color="info">
              Shop Now
            </Button>
        </Link> */}
      </CardContent>
    </CardWrapper>
  );
};
export default BannerCard4;
