// import { Favorite } from "@mui/icons-material";
// import { Box, Button, Grid, styled } from "@mui/material";
// import BazaarImage from "components/BazaarImage";
// import { H2, H3, H4, Paragraph } from "components/Typography";

// ==================================================

// ==================================================

import { Grid, styled } from "@mui/material";
import BazaarImage from "components/BazaarImage";
import { FlexBetween } from "components/flex-box";
import Link from "next/link";

// styled component
const StyledBox = styled(FlexBetween)(({ theme }) => ({
  ".title": {
    fontSize: 50,
    marginTop: 0,
    lineHeight: 1.2,
    marginBottom: "1.35rem",
  },
  [theme.breakpoints.up("sm")]: {
    ".grid-item": {
      minHeight: 424,
      display: "flex",
      alignItems: "baseline",
      flexDirection: "column",
      justifyContent: "center",
    },
  },
  [theme.breakpoints.down("sm")]: {
    marginLeft: 0,
    paddingLeft: 0,
    ".title": {
      fontSize: 32,
    },
  },
  [theme.breakpoints.down("xs")]: {
    ".title": {
      fontSize: 16,
    },
    ".title + *": {
      fontSize: 13,
    },
    ".button-link": {
      height: 36,
      padding: "0 1.5rem",
      fontSize: 13,
    },
  },
}));

const CarouselCard = ({ title, imgUrl, buttonLik }) => {
  return (
    <StyledBox>
      <Grid
        // spacing={3}
        marginY={1.5}
        width="100%"
        maxHeight={false}
        alignItems="center"
        justifyContent="center"
        backgroundColor="red"
      >
        {/* <Grid item sm={12} xs={12}> */}
        <Link href={buttonLik}>
          <BazaarImage
            src={imgUrl}
            alt={title}
            width='100%'
            sx={{
              mx: "auto",

              // maxHeight: 400,
              display: "block",
              maxWidth: "100%",
            }}
          />
        </Link>
        {/* </Grid> */}
      </Grid>
    </StyledBox>
  );
};
export default CarouselCard;

// const CarouselCard5 = ({
//   imgUrl
// }) => {
//   return <Grid container alignItems="center">

//         <BazaarImage src={imgUrl} alt="banner" sx={{
//         display: "block",
//         mx: "auto",
//         maxWidth: "100%",
//         p: 5
//       }} />

//     </Grid>;
// };
// export default CarouselCard5;
