import { Box, Container, Grid, useTheme } from "@mui/material";
import Link from "next/link";
import { BannerCard4 } from "components/banners";
import { FlexRowCenter } from "components/flex-box";
const Section_CategoryBanner = ({imgSrc,imgHref,zoomIn=false}) => {
  const { direction } = useTheme();
  return (
    <FlexRowCenter mt={0} flexDirection="column">

    <Container
      sx={{
        my: 1,
        mx:0.5,
      }}
      maxWidth={false}
      disableGutters
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {/* <BannerCard4 url="#" text3="Sale" text2="ss" text1="banner" img="/assets/images/banners/bannerK02-1.jpg" /> */}

          <Link href={imgHref}>
            {zoomIn?<BannerCard4
              url="#"
              text3="Sale"
              text2="ss"
              text1="banner"
              img={imgSrc}
            />:
            <Box
          component="img"
          src={imgSrc}
          alt="banner"
          sx={{
            //  mx: "auto",
            // maxHeight: 400,
            display: "block",
            maxWidth: "100%",
           
          }}
        />}
          </Link>
        </Grid>
      </Grid>
    </Container>
    </FlexRowCenter>
  );
};
export default Section_CategoryBanner;
