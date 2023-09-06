import { useEffect, useState } from "react";
import Carousel from "components/carousel/Carousel";
import ProductCard3 from "components/product-cards/ProductCard3";
import CategorySectionCreator from "components/CategorySectionCreator";
import useWindowSize from "hooks/useWindowSize";
import { Box } from "@mui/material";
import { H3 } from "components/Typography";
// ==========================================================

const arrowButtonStyle = {
  backgroundColor: "white",
  color: "#2B3445",
}; 

const RecentlyViewed = ({ productsData }) => {
  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(6);
  useEffect(() => {
    if (width < 500) setVisibleSlides(2);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(4);
    else setVisibleSlides(6);
  }, [width]);
  return (
    <Box mb={7.5}>
      
      <H3 mb={3}>Recently Viewed</H3>
    {/* <CategorySectionCreator title="Recently Viewed" seeMoreLink="#"> */}
      <Carousel
        infinite={true}
        visibleSlides={visibleSlides}
        totalSlides={productsData.length}
        leftButtonStyle={arrowButtonStyle}
        rightButtonStyle={arrowButtonStyle}
      >
        {productsData.map((item, ind) => (
          <ProductCard3
            hideReview
            hideFavoriteIcon
            key={item.ProductID}
            slug={item.ProductPageLink}
            title={`${item.ProductID} ${item.ProductShortName}`}
            price={item.Price}
            // off={item.discount}
            // rating={item.rating}
            imgUrl={item.ThumbImage}
          />
        ))}
      </Carousel>
    {/* </CategorySectionCreator> */}
    </Box>
  );
};
export default RecentlyViewed;
