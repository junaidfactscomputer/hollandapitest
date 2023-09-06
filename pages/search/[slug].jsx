import { useCallback, useEffect, useState } from "react";
import { Container, Grid, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import MainLayout from "components/layouts/MainLayout";
import ProductSearchList from "components/products/ProductSearchList";
import api from "utils/__api__/products";
import apihome from "utils/__api__/home";

const ProductSearch = ({ productlist, topcategory }) => {
  const [products, setProducts] = useState(productlist);

  const downMd = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const toggleView = useCallback((v) => () => setView(v), []);
  const theme = useTheme();

  useEffect(() => {
    setProducts(productlist);
  }, [productlist]);

  return (
    <MainLayout
      topbarBgColor={theme.palette.warning[200]}
      topcategory={topcategory}
    >
      <Container
        sx={{
          mt: 3,
          mb: 5,
          "padding-left": {
            //sm:  "0px !important",
            md: "0px !important",
            // xs:  "0px !important",
          },
          "padding-right": {
            //  sm:  "0px !important",
            md: "0px !important",
            //  xs:  "0px !important",
          },
        }}
      >
        <Grid container spacing={3}>
          {/* PRODUCT VIEW AREA */}
          <Grid item md={12} xs={12}>
            <ProductSearchList products={products} />
          </Grid>
        </Grid>
      </Container>
    </MainLayout>
  );
};

export async function getServerSideProps(context) {
  const topcategory = await apihome.getTopCategories();
  const productlist = await api.getSearchProducts(context.params.slug);

  return {
    props: {
      productlist: productlist.Table,
      topcategory: topcategory,
    },
  };
}

export default ProductSearch;
