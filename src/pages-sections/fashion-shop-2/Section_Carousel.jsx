import Image from "next/image";
import { Box, Container, styled } from "@mui/material";
import Carousel from "components/carousel/Carousel";
import CarouselCard from "components/carousel/CarouselCard";
import { arrowButtonStyle } from "./style";
import { FlexRowCenter } from "components/flex-box";

// styled components
const ContentWrapper = styled(Box)(({
  theme
}) => ({
  borderRadius: "8px",
  position: "relative",
  backgroundColor: "#F3F6F9",
  boxShadow: theme.shadows[1]
}));

// ========================================================

// ========================================================

const Section_Carousel = ({
  mainCarouselData
}) => {

  

  return (
    <FlexRowCenter mt={0} flexDirection="column">
      <ContentWrapper>
        <Carousel
          spacing="0px"
          totalSlides={2}
          infinite={true}
          autoPlay={true}
          visibleSlides={1}
          leftButtonStyle={arrowButtonStyle}
          rightButtonStyle={arrowButtonStyle}
        >
          {mainCarouselData.map((item, index) => {
            return (
              <CarouselCard
                key={index}
                imgUrl={item.imgUrl}
                title={item.title}
                buttonLik={item.buttonLik}
              />
            );
          })}
        </Carousel>
      </ContentWrapper>
    </FlexRowCenter>
  );
};
export default Section_Carousel;