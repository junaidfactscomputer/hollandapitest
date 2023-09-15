import { useCallback, useEffect, useState } from "react";
import { Apps, FilterList, ViewList } from "@mui/icons-material";
import {
  Box,
  Card,
  Chip,
  Container,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  useTheme,
} from "@mui/material";

import useMediaQuery from "@mui/material/useMediaQuery";
import Sidenav from "components/Sidenav";
import { FlexBox } from "components/flex-box";
import { H5, Paragraph } from "components/Typography";
import MainLayout from "components/layouts/MainLayout";
import ProductCard1List from "components/products/ProductCard1List";
import DatepickerMU from "components/form-controls/datepickerMU";
import { useRouter } from "next/router";
import axios from "axios";
import getConfig from "next/config";
import { useSession } from "next-auth/react";

const ProductSearchResult = ({
  productlist,
  sizeslist,
  topcategory,
  productCount,
  disabledDates,
}) => {
  const [view, setView] = useState("grid");
  const [products, setProducts] = useState([]);
  const [productsCount, setProductsCount] = useState([]);
  const [deliveryDate, setdeliveryDate] = useState([]);
  const [sizes, setSizes] = useState(sizeslist);
  //const [pageUrl, setPageUrl] = useState(mainUrl);
  const [pageno, setPageno] = useState("1");
  const [filtervalue, setfilterValue] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedSort, setSelectedSort] = useState("");
  const downMd = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const toggleView = useCallback((v) => () => setView(v), []);
  const router = useRouter();
  const { data: session } = useSession();
  const { redirect } = router.query;
  const theme = useTheme();
  const { publicRuntimeConfig } = getConfig();
  const apiurl = publicRuntimeConfig.factsApiUrl + "Page/getopensection";
  async function fetchData() {
    try {
      const response = await axios.post(
        apiurl,
        {
          containerId: ["CollectionProducts"],
          strCustomCategorySeoUrlKey: "tops-kurtis",
          nType: 2,
          nPageNo: pageno ?? 1,
          nItemsPerPage: 100,
          strDynamicFilterString: "",
          strDynamicSortOrder: "",
          strLastSelectedGroupCode: "",
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      console.log(response.data[0].data.products);
      setProducts(response.data[0].data.products);
      setProductsCount(response.data[0].data.products.Table1[0].TOTAL_PRODUCTS);
      setdeliveryDate(response.data[0].data.products.Table1[0].strDateDelivery);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!session?.user) {
      router.push(redirect || "/login");
    } else {
      fetchData();
    }
  }, [router, session, redirect]);

  const handleFilterSelect = () => {
    // const inputString = "GRP4_01_02_03-GRP5_06_07_08";

    // Split the string into two parts at the hyphen
    if (filtervalue != "") {
      const parts = filtervalue.split("-");
      if (parts[0]) {
        const firstPart = parts[0].slice(5);

        // Split the first part into an array of values
        const firstValues = firstPart.split("_");
        let secondPart = "";
        let onlyfirstvalue = true;
        if (parts[1]) {
          secondPart = parts[1].slice(5);
          onlyfirstvalue = false;
        }

        const secondValues = secondPart.split("_");

        let names1;
        let names2;
        if (onlyfirstvalue) {
          let grpcode = "GRP4";
          if (filtervalue.includes("GRP3")) {
            grpcode = "GRP3";
          }
          names1 = sizes
            .filter(
              (item) =>
                firstValues.includes(item.CODE) && item.GROUP_CODE == grpcode
            )
            .map((item) => item.DESCRIPTION);

          setSelectedFilters([...names1]);
        } else {
          names1 = sizes
            .filter(
              (item) =>
                firstValues.includes(item.CODE) && item.GROUP_CODE == "GRP4"
            )
            .map((item) => item.DESCRIPTION);

          names2 = sizes
            .filter(
              (item) =>
                secondValues.includes(item.CODE) && item.GROUP_CODE == "GRP3"
            )
            .map((item) => item.DESCRIPTION);

          setSelectedFilters([...names1, ...names2]);
        }
      } else {
        setSelectedFilters([]);
      }
    } else {
      setSelectedFilters([]);
    }
  };

  // useEffect(() => {
  //   setProducts(productlist);
  // }, [productlist]);

  useEffect(() => {
    handleFilterSelect();
    changeMainUrl();
    setPageno("");
  }, [filtervalue]);

  useEffect(() => {
    //changeMainUrl();
    fetchData();
  }, [pageno, selectedSort]);

  // useEffect(() => {
  //   if (sizes[0].GROUP_DESCRIPTION) {
  //     setSizes(sizeslist);
  //   }
  //   setSelectedFilters([]);
  //   setfilterValue("");
  //   setSelectedSort("");
  //   setPageno("");
  // }, [router.query.slug[1]]);

  async function changeMainUrl() {
    const newpageno = pageno;
    const sortby = selectedSort;
    const filterby = filtervalue;

    const query = {};

    // Assuming slug is a required query value
    // if (router.query.slug) {
    //   query.slug = router.query.slug;
    // }
    if (filterby) {
      query["filter"] = filterby;
    }
    if (newpageno) {
      query["pageno"] = newpageno;
    }
    if (sortby) {
      query["sort"] = sortby;
    }

    router.push({ pathname: router.pathname, query });
  }

  function handleFilterChange(e, filtercode) {
    setfilterValue(filtercode);
  }

  function handlePageChange(e, newPage) {
    setPageno(newPage);
  }

  const handleSortChange = (sortval) => (e) => {
    setSelectedSort(sortval);
  };

  const handleFilterDelete = (filter) => {
    setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    if (filtervalue != "") {
      const codedet = sizes
        .filter((item) => item.DESCRIPTION === filter)
        .map((item) => item.CODE);
      //  let fildelval = filtervalue.replace("_" + codedet, "");
      let fildelval = "";
      let onlyfirstvalue = true;
      const codedetgroup = sizes
        .filter((item) => item.DESCRIPTION === filter)
        .map((item) => item.GROUP_CODE);

      if (filtervalue != "") {
        const parts = filtervalue.split("-");
        if (parts[0]) {
          let firstPart = parts[0].toString();
          let secondPart = "";
          if (parts[1]) {
            onlyfirstvalue = false;
            secondPart = parts[1].toString();
          }

          if (onlyfirstvalue) {
            firstPart = firstPart.replace("_" + codedet, "");
          } else if (codedetgroup == "GRP3") {
            secondPart = secondPart.replace("_" + codedet, "");
          } else {
            firstPart = firstPart.replace("_" + codedet, "");
          }

          if (secondPart != "") {
            fildelval = firstPart + "-" + secondPart;
          } else {
            fildelval = firstPart;
          }
        }
      }

      if (fildelval.endsWith("GRP4") || fildelval.endsWith("GRP3")) {
        if (fildelval.endsWith("-GRP4") || fildelval.endsWith("-GRP3")) {
          fildelval = fildelval.slice(0, -5);
        } else {
          fildelval = fildelval.slice(0, -4);
        }
      }
      if (fildelval.startsWith("GRP4-") || fildelval.startsWith("GRP3-")) {
        fildelval = fildelval.slice(5);
      }

      if (fildelval === "GRP4" || fildelval === "GRP3") {
        fildelval = fildelval.slice(4);
      }
      setfilterValue(fildelval);
    }
  };

  return (
    <MainLayout
      topbarBgColor={theme.palette.warning[200]}
      topcategory={topcategory}
    >
      <Container
        sx={{
          mt: 3,
          mb: 5,
          paddingLeft: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        disableGutters
        maxWidth={false}
      >
        <Grid container spacing={3}>
          {/* PRODUCT FILTER SIDEBAR AREA */}
          <Grid
            // item
            sx={{
              display: {
                md: "block",
                xs: "none",
              },
            }}
            mt={1}
            px={1}
            md={12}
            // xs={2}
            // sm={2}
          >
            {/* TOP BAR AREA */}
            <Card
              sx={{
                mb: 3,
                py: 2,
              }}
            >
              <Box mb={3.5}>
                <Grid container spacing={3}>
                  <Grid item sm={4} xs={6}>
                    <DatepickerMU strDateDelivery={deliveryDate} />
                  </Grid>
                </Grid>
              </Box>
            </Card>
            {/* <ProductFilterCard
              sizes={sizes}
              onFilterChange={handleFilterChange}
              currentPage={pageno}
            /> */}
          </Grid>

          {/* PRODUCT VIEW AREA */}
          <Grid md={12} mt={1}>
            {products.Table && (
              <ProductCard1List
                products={products.Table}
                handlePageChange={handlePageChange}
                currentPage={pageno}
                productCount={productsCount}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </MainLayout>
  );
};
const sortOptions = [
  {
    label: "Popular",
    value: "popular",
  },
  {
    label: "New",
    value: "new",
  },
  {
    label: "Discount",
    value: "discount",
  },
  {
    label: "Price Low to High",
    value: "pricelow",
  },
  {
    label: "Price High to Low",
    value: "pricehigh",
  },
];

export async function getServerSideProps(context) {
  const varpageno = context.query.pageno ?? "1";
  const varfilter = context.query.filter ?? "";
  const varsort = context.query.sort ?? "";
  //const topcategory = await apihome.getTopCategories();
  // const productsdatas = await api.getholexProducts(
  //   "", //context.params.slug,
  //   varpageno,
  //   varfilter,
  //   varsort
  // );

  // if (!productlist || !productlist.Table2) {
  //   return {
  //     notFound: true, // Return 404 status || productlist.Table2.length === 0
  //   };
  // }

  return {
    props: {
      // productlist: productsdatas.Table,
      sizeslist: [],
      //productlist?.Table3,
      productCount: 100,
      //productlist?.Table4[0].TOTAL_PRODUCTS ?? 0,
      topcategory: [],
    },
  };
}

export default ProductSearchResult;
