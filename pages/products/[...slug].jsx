import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Container, styled, Tab, Tabs, useTheme } from "@mui/material";
import { H2 } from "components/Typography";
import MainLayout from "components/layouts/MainLayout";
import ProductIntro from "components/products/ProductIntro";
// import ProductReview from "components/products/ProductReview";
// import RelatedProducts from "components/products/RelatedProducts";
// import RecentlyViewed from "components/products/RecentlyViewed";
// import ProductDescription from "components/products/ProductDescription";
// import api from "utils/__api__/products";
// import apihome from "utils/__api__/home";

// import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Typography from "@mui/material/Typography";
// import Link from "@mui/material/Link";
// import Stack from "@mui/material/Stack";
import axios from "axios";
import getConfig from "next/config";
//import { getuserCookie } from "lib";
// import {
//   getFrequentlyBought,
//   getRelatedProducts,
// } from "utils/__api__/related-products";

// styled component
const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: 0,
  marginTop: 20,
  marginBottom: 24,
  borderBottom: `1px solid ${theme.palette.text.disabled}`,
  "& .inner-tab": {
    minHeight: 40,
    fontWeight: 600,
    textTransform: "capitalize",
  },
}));

// ===============================================================

// ===============================================================

const ProductDetails = (props) => {
  const {
    frequentlyBought,
    relatedProducts,
    product,
    productid,
    sizes,
    colors,
    images,
    reviews,
    colorimages,
    topcategory,
    colorcode,
  } = props;
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(0);
  const handleOptionClick = (_, value) => setSelectedOption(value);
  const [products, setProducts] = useState([]);
  const theme = useTheme();

  const { publicRuntimeConfig } = getConfig();

  const apiurl = publicRuntimeConfig.factsApiUrl + "Page/getopensection";
  // Show a loading state when the fallback is rendered
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post(
          apiurl,
          {
            containerId: ["ProductDetails"],
            strProductSeoUrl: productid,
            strCustomCategoryUrlKey: productid,
            strProductUrl: "",
            strCustomCategorySeoUrlKey: productid,
            DefaultColorCode: "",
            strColourCode: "",
            strLoginId: "",
          },
          {
            headers: {
              "content-type": "application/json",
            },
          }
        );

        setProducts(response.data[0].data.productdetail);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchData();
  }, []);

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  return (
    <MainLayout
      topbarBgColor={theme.palette.warning[200]}
      topcategory={topcategory}
    >
      <Container
        sx={{
          my: 1,
        }}
      >
        {products.Table ? (
          <ProductIntro
            product={products.Table[0]}
            // images={images}
            // sizes={sizes}
            // colors={colors}
            // colorimages={colorimages}
            // colorcode={colorcode}
          />
        ) : (
          <H2>Loading...</H2>
        )}

        {/* {frequentlyBought && <RecentlyViewed productsData={frequentlyBought} />}

        {relatedProducts && <RelatedProducts productsData={relatedProducts} />} */}
      </Container>
    </MainLayout>
  );
};

export async function getServerSideProps(context) {
  //const userId = getuserCookie();
  console.log(context.params.slug);
  //const getData = await api.getProductDetailsHolex(context.params.slug, "");
  const topcategory = [];
  //await apihome.getTopCategories();
  // const colorcode = context.params.slug[1].substring(
  //   context.params.slug[1].length - 2
  // );

  return {
    props: {
      productid: context.params.slug[0],
      //product: getData.productdetail.Table,
      // sizes: getData.productdetail.Table2,
      // colors: getData.productdetail.Table4,
      // images: getData.productimages.Table,
      // colorimages: getData.productimages.Table1,
      // relatedProducts: getData.restofproducts.Table,
      // frequentlyBought: getData.restofproducts.Table3,
      // reviews: getData.restofproducts.Table5,
      // topcategory: topcategory,
      // colorcode: colorcode,
    },
  };
}

export default ProductDetails;
