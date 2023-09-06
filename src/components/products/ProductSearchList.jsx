import { Fragment, useState } from "react";
import { Grid, Pagination } from "@mui/material";
import { FlexBetween } from "components/flex-box";
import ProductCard1 from "components/product-cards/ProductCard1";
import { Span } from "components/Typography";
// ========================================================

const ProductSearchList = ({ products }) => {
  return (
    <Fragment>
      <Grid container spacing={3}>
        {/* <Grid item lg={4} sm={6} xs={12} key={item.id}> */}
        {products.map((item, index) => (
          <Grid item lg={3} sm={6} xs={6} key={index}>
            <ProductCard1
              id={item.ProductID}
              slug={item.ProductPageLink}
              //   .substring( 0,item.ProductPageLink.length - 3)}
              title={item.ProductShortName}
              price={item.Price}
              wasPrice={item.WasPrice}
              rating={item.rating}
              imgUrl={item.ThumbImage}
              imgHover={item.AlternateImages}
              discount={item.Discount}
              showProductSize={item.AvailableSizes}
            />
          </Grid>
        ))}
      </Grid>

      <FlexBetween flexWrap="wrap" mt={3}>
        <Span color="grey.600">
          Showing 1-{products.length} of {products.length} Products
        </Span>
      </FlexBetween>
    </Fragment>
  );
};
export default ProductSearchList;
