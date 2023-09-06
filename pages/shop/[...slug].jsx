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
import ProductCard9List from "components/products/ProductCard9List";
import ProductFilterCard from "components/products/ProductFilterCard";
import api from "utils/__api__/products";
import apihome from "utils/__api__/home";
import { useRouter } from "next/router";

const ProductSearchResult = ({
  productlist,
  sizeslist,
  topcategory,
  productCount,
}) => {
  const [view, setView] = useState("grid");
  const [products, setProducts] = useState(productlist);
  const [sizes, setSizes] = useState(sizeslist);
  //const [pageUrl, setPageUrl] = useState(mainUrl);
  const [pageno, setPageno] = useState("");
  const [filtervalue, setfilterValue] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedSort, setSelectedSort] = useState("");
  const downMd = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const toggleView = useCallback((v) => () => setView(v), []);
  const router = useRouter();
  //const { redirect } = router.query;
  const theme = useTheme();

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

  useEffect(() => {
    setProducts(productlist);
  }, [productlist]);

  useEffect(() => {
    handleFilterSelect();
    changeMainUrl();
    setPageno("");
  }, [filtervalue]);

  useEffect(() => {
    changeMainUrl();
  }, [pageno, selectedSort]);

  useEffect(() => {
    if (sizes[0].GROUP_DESCRIPTION) {
      setSizes(sizeslist);
    }
    setSelectedFilters([]);
    setfilterValue("");
    setSelectedSort("");
    setPageno("");
  }, [router.query.slug[1]]);

  async function changeMainUrl() {
    const newpageno = pageno;
    const sortby = selectedSort;
    const filterby = filtervalue;

    const query = {};

    // Assuming slug is a required query value
    if (router.query.slug) {
      query.slug = router.query.slug;
    }
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
          // "padding-left": {
          //   //sm:  "0px !important",
          //   // md: "0px !important",
          //   // xs:  "0px !important",
          // },
          "padding-right": {
            //  sm:  "0px !important",
            md: "0px !important",
            //  xs:  "0px !important",
          },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        disableGutters
        maxWidth={false}
      >
        {downMd && (
          <FlexBox alignItems="center" alignSelf="right">
            <Card
              elevation={1}
              sx={{
                mb: "24px",
                display: "flex",
                // flexWrap: "wrap",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: false,
                width: "95vw",
                ml: -3,
              }}
            >
              <FlexBox
                alignItems="center"
                columnGap={4}
                flexWrap="wrap"
                my={2}
                px={2}
              >
                <FlexBox alignItems="center" gap={2}>
                  <Paragraph color="grey.600" whiteSpace="pre">
                    Sort by:
                  </Paragraph>

                  <TextField
                    select
                    fullWidth
                    size="small"
                    variant="outlined"
                    placeholder="Sort by"
                    defaultValue={sortOptions[0].value}
                    sx={{
                      flex: "1 1 0",
                      minWidth: "150px",
                    }}
                  >
                    {sortOptions.map((item) => (
                      <MenuItem
                        onClick={handleSortChange(item.value)}
                        value={item.value}
                        key={item.value}
                      >
                        {item.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </FlexBox>
              </FlexBox>
              <FlexBox alignItems="center" my="0.25rem" mx={2}>
                <Sidenav
                  handle={
                    <IconButton>
                      <FilterList fontSize="small" />
                    </IconButton>
                  }
                >
                  <ProductFilterCard
                    sizes={sizes}
                    onFilterChange={handleFilterChange}
                    currentPage={pageno}
                  />
                </Sidenav>
              </FlexBox>
            </Card>
          </FlexBox>
        )}
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
            md={2}
            px={1}
            // xs={2}
            // sm={2}
          >
            {/* TOP BAR AREA */}
            <Card
              elevation={1}
              sx={{
                mb: "12px",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                p: {
                  sm: "01rem 1.25rem",
                  md: "0.5rem 1.25rem",
                  xs: "1.25rem 1.25rem 0.25rem",
                },
              }}
            >
              <FlexBox
                alignItems="center"
                columnGap={4}
                flexWrap="wrap"
                my="0.5rem"
              >
                <FlexBox alignItems="left" sx={{ flexDirection: "column" }}>
                  <Paragraph color="grey.600" whiteSpace="pre">
                    Sort by:
                  </Paragraph>

                  <TextField
                    select
                    fullWidth
                    size="small"
                    variant="outlined"
                    placeholder="Sort by"
                    defaultValue={sortOptions[0].value}
                    sx={{
                      flex: "1 1 0",
                      minWidth: "150px",
                    }}
                  >
                    {sortOptions.map((item) => (
                      <MenuItem
                        onClick={handleSortChange(item.value)}
                        value={item.value}
                        key={item.value}
                      >
                        {item.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </FlexBox>

                <FlexBox alignItems="center" my="0.25rem">
                  {/* <Paragraph color="grey.600" mr={1}>
                View:
              </Paragraph>

              <IconButton onClick={toggleView("grid")}>
                <Apps
                  color={view === "grid" ? "primary" : "inherit"}
                  fontSize="small"
                />
              </IconButton>

              <IconButton onClick={toggleView("list")}>
                <ViewList
                  color={view === "list" ? "primary" : "inherit"}
                  fontSize="small"
                />
              </IconButton> */}

                  {/* SHOW IN THE SMALL DEVICE */}
                  {downMd && (
                    <Sidenav
                      handle={
                        <IconButton>
                          <FilterList fontSize="small" />
                        </IconButton>
                      }
                    >
                      <ProductFilterCard
                        sizes={sizes}
                        onFilterChange={handleFilterChange}
                        currentPage={pageno}
                      />
                    </Sidenav>
                  )}
                </FlexBox>
              </FlexBox>
            </Card>
            <ProductFilterCard
              sizes={sizes}
              onFilterChange={handleFilterChange}
              currentPage={pageno}
            />
          </Grid>

          {/* PRODUCT VIEW AREA */}
          <Grid md={10} mt={1}>
            {view === "grid" ? (
              <ProductCard1List
                products={products}
                handlePageChange={handlePageChange}
                currentPage={pageno}
                productCount={productCount}
              />
            ) : (
              <ProductCard9List products={products} />
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
  const productlist = await api.getholexProducts(
    context.params.slug,
    varpageno,
    varfilter,
    varsort
  );
  // if (!productlist || !productlist.Table2) {
  //   return {
  //     notFound: true, // Return 404 status || productlist.Table2.length === 0
  //   };
  // }

  return {
    props: {
      productlist: productlist,
      sizeslist: [],
      //productlist?.Table3,
      productCount: 100,
      //productlist?.Table4[0].TOTAL_PRODUCTS ?? 0,
      topcategory: [],
    },
  };
}

export default ProductSearchResult;
