import Link from "next/link";
import { useEffect, useState } from "react";
import { Add, Remove, Info, DragIndicator } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Chip,
  Grid,
  Button,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
//import LazyImage from "components/LazyImage";
import BazaarRating from "components/BazaarRating";
import { H1, H2, H3, H4, H6, Paragraph, Span } from "components/Typography";
import { useAppContext } from "contexts/AppContext";
import { FlexBox, FlexRowCenter } from "../flex-box";
import { currency } from "lib";
import axios from "axios";
import { getuserCookie } from "lib";
import { format } from "date-fns";
import Typography from "@mui/material/Typography";
import Cookies from "js-cookie";
//import Image from "components/BazaarImage";
import {
  CarouselProvider,
  Slider,
  Slide,
  ImageWithZoom,
  // DotGroup,
  // ButtonBack,
  //  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import Stack from "@mui/material/Stack";
import Image from "next/image";
import compStyling from "./ImageCarousel.module.css";
import { useSnackbar } from "notistack";
import getConfig from "next/config";
import LazyImage from "components/LazyImage";
import SizeChart from "./SizeChart";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
const { publicRuntimeConfig } = getConfig();
const apiurl = publicRuntimeConfig.factsApiUrl + "Page/getopensection";

// ================================================================

// ================================================================

const ProductIntro = ({
  product,
  images,
  colorimages,
  sizes,
  colors,
  colorcode,
}) => {
  const id = product.ProductID;
  const price = product.Price;
  const title = product.ProductFullName;
  // const title = product.PRM_META_TITLE
  const subtitle = product.subtitle;
  const minqty = product.Price_MinimumQuantity;
  const iso_code_2 = product.iso_code_2;
  const ProductQuality = product.ProductQuality;
  const ProductWeight = product.ProductWeight;
  const StemLength = product.StemLength;
  const ColorCode = product.ColorCode;
  const AvailableStock = product.AvailableStock;
  const slug = product.ProductID;
  const thumbnail = product.ImageRootUrl;
  const maxOrderQty = product.maxOrderQty;
  // const industryCode = product.ProductID;
  // const supplierCode = product.Product_SupplierAssignedID;
  // const AgentParty_PrimaryID = product.AgentParty_PrimaryID;
  // const PrimaryID = product.ID;
  // const ParcelId = product.ParcelId;
  // const ID_schemeURI = product.ID_schemeURI;
  // const ReferencedDocument_IssuerAssignedID =
  //   product.ReferencedDocument_IssuerAssignedID;
  // const ManufacturerCode = product.ManufacturerCode;
  // const LatestOrderDateTime = product.LatestOrderDateTime;
  // const LatestDeliveryDateTime = product.LatestDeliveryDateTime;
  const ProductXml = product.ProductXml;
  const ProductCancelXml = product.ProductCancelXml;
  // const prddetails = product.PRM_DETAILS;
  // console.log(product)

  const [currentSlide, setCurrentSlide] = useState(0);
  const [sizeChart, setChart] = useState([]);
  const [sizeChartRow, setChartRow] = useState([]);
  const [sizeChartHeaders, setChartHeaders] = useState([]);
  //const [imageData, setImageData] = useState(images);
  //const [quantity, setQuantity] = useState(0);
  //const [isMounted, setIsMounted] = useState(false);
  const [isbtnLoading, setIsbtnLoaded] = useState(false);
  const { state, dispatch } = useAppContext();
  const [errorMessage, setErrorMessage] = useState("");
  const [prdQty, setprdQty] = useState(0);
  const router = useRouter();
  const { data: session } = useSession();
  const { redirect } = router.query;
  //const [selectedImage, setSelectedImage] = useState(0);
  // const [selectVariants, setSelectVariants] = useState({
  //   size: "",
  //   color: colorcode,
  // });

  // useEffect(() => {
  //   setSelectVariants({
  //     size: "",
  //     color: colorcode,
  //   });
  // }, [router.query.slug[1]]);

  // HANDLE CHAMGE TYPE AND OPTIONS

  useEffect(() => {
    if (!session?.user) {
      router.push("/login");
    }
  }, [router, session, redirect]);
  const handleChangeVariant = (variantName, value) => () => {
    setSelectVariants((state) => ({
      ...state,
      [variantName.toLowerCase()]: value,
    }));
  };

  // //
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => async (e) => {
    setAnchorEl(e.currentTarget);
    const response = await axios.post(
      apiurl,
      {
        containerId: ["getSizeChart"],
        strProductDocNo: id,
      },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );

    const tabledata = response.data[0].data.sizechart;

    const tabledataArray = Object.values(tabledata.Table1);
    setChart(Object.values(tabledata.Table2));

    const newObject = {
      STK_GRPM_DOCNO: "0",
      STK_GRPM_DESC: "Size",
    };
    tabledataArray.unshift(newObject);

    const tableHeaders = tabledataArray.map((header, index) => (
      <TableCell sx={{ fontWeight: "bold" }} key={index}>
        {" "}
        {header.STK_GRPM_DESC}
      </TableCell>
    ));

    const tableRows = tabledata.Table.map((row, ind) => (
      <TableRow key={ind}>
        <TableCell>{row.PD4_DESC}</TableCell>
        {tabledata.Table2.filter((list) => list.PD4_DESC === row.PD4_DESC).map(
          (values, index) => (
            <TableCell key={index}>{values.PMM_VALUE}</TableCell>
          )
        )}
      </TableRow>
    ));

    setChartHeaders(tableHeaders);
    setChartRow(tableRows);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const chartid = open ? "size-chart-popover" : undefined;

  // CHECK PRODUCT EXIST OR NOT IN THE CART
  //const cartItem = state.cart.find((item) => item.id === id);
  const { enqueueSnackbar } = useSnackbar();
  // HANDLE SELECT IMAGE
  const handleImageClick = (ind) => () => setSelectedImage(ind);

  // HANDLE CHANGE CART
  // const handleCartAmountChange = (quantity) => async () => {
  //   if (selectVariants["size"] === "") {
  //     setErrorMessage("Please select size");
  //   } else {
  //     setErrorMessage("");
  //     setIsbtnLoaded(true);
  //     const cartId = getuserCookie();
  //     const parmobj = {
  //       containerId: ["addtocart"],
  //       process: "add",
  //       CustomerId: cartId,
  //       DocDate: format(new Date(), "yyyy/MM/dd kk:mm:ss"), //"2023-04-10 12:15:24", //new Date()
  //       CustomCategoryUrl: slug, // params.slug,
  //       ProductDocNo: id, //params.id,
  //       SizeCode: selectVariants["size"], //params.size,
  //       Qty: quantity, //params.qty,
  //       Rate: price, // params.price,
  //       ColorCode: selectVariants["color"],
  //     };

  //     try {
  //       const response = await axios.post(apiurl, parmobj, {
  //         headers: {
  //           "content-type": "application/json",
  //         },
  //       });

  //       //console.log("Response:", response.data[0].data);
  //       if (response.data[0]) {
  //         dispatch({
  //           type: "CHANGE_CART_AMOUNT",
  //           payload: {
  //             Rate: price,
  //             Qty: quantity,
  //             ProductDesc: title,
  //             ImageUrl: thumbnail,
  //             ProductId: id,
  //             ProductSeoUrl: slug,
  //             ColourCode: selectVariants["color"],
  //             SizeCode: selectVariants["size"],
  //           },
  //         });

  //         let dispmessage = "Cart updated";
  //         if (quantity === 1) {
  //           dispmessage = "Added to Cart";
  //         }
  //         enqueueSnackbar(dispmessage, {
  //           variant: "success",
  //         });
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //     setIsbtnLoaded(false);
  //   }
  // };
  const handleCartAmountChange = (quantity) => async () => {
    if (Number(quantity) > Number(maxOrderQty)) {
      alert("Maximum Order Quantity is " + Number(maxOrderQty));
      return;
    }
    let replacedXML = ProductXml.replace("{Quantity}", minqty);
    let orderapitype = "Page/holexputorder";
    if (quantity < prdQty) {
      let trnproductId = Cookies.get("trnproductId");
      replacedXML = ProductCancelXml.replace("{trnproductId}", trnproductId);

      orderapitype = "Page/holexputordercancel";
    }

    setprdQty(quantity);

    console.log(replacedXML);
    try {
      const response = await axios.post(
        publicRuntimeConfig.factsApiUrl + orderapitype,
        {
          containerXml: replacedXML,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );

      const parts = response.data.split("-");
      const lastPart = parts[parts.length - 1];
      const trnValue = lastPart.trim().replace("id=", "");
      Cookies.set("trnproductId", trnValue);
      alert(response.data);
      // const parmobj = {
      //   containerId: ["addtocart"],
      //   CustomerId: session?.user,
      //   ProductDocNo: "", //params.id,
      //   Qty: quantity, //params.qty,
      //   Rate: 0, // params.price,
      //   ColorCode: "",
      //   strResponseJson: response.data,
      //   strInputJson: replacedXML,
      // };

      // const responsesql = await axios.post(apiurl, parmobj, {
      //   headers: {
      //     "content-type": "application/json",
      //   },
      // });
      // if (responsesql.data[0]) {
      //   setprdQty(quantity);
      //   if (quantity === 0) {
      //     router.reload(window.location.pathname);
      //   } else {
      //     let dispmessage = "Cart updated";
      //     enqueueSnackbar(dispmessage, {
      //       variant: "success",
      //     });
      //   }
      // }
    } catch {}

    const cartId = getuserCookie();

    // try {
    //   const response = await axios.post(apiurl, parmobj, {
    //     headers: {
    //       "content-type": "application/json",
    //     },
    //   });
    //   if (response.data[0]) {
    //     setprdQty(quantity);
    //     if (quantity === 0) {
    //       router.reload(window.location.pathname);
    //     } else {
    //       let dispmessage = "Cart updated";
    //       enqueueSnackbar(dispmessage, {
    //         variant: "success",
    //       });
    //     }
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  };

  return (
    <Box width="100%">
      <Grid
        container
        spacing={3}
        sx={{ mb: 4.5 }}
        justifyContent="space-around"
      >
        <Grid item container md={6} xs={12} alignItems="center">
          <Grid item md={12} xs={12}>
            <LazyImage
              src={thumbnail}
              width={500}
              height={500}
              alt="category"
              sx={{
                height: "100%",
                objectFit: "cover",
                objectPosition: "center center",
              }}
            />
          </Grid>
        </Grid>

        <Grid item md={6} xs={12} alignItems="center">
          <H1 mb={1}>
            {title} <H3>VBN {id}</H3>{" "}
          </H1>

          <FlexBox alignItems="center" mb={1}>
            <H6 sx={{ color: "grey", fontWeight: "bold" }}>{subtitle}</H6>
          </FlexBox>

          <FlexBox alignItems="center" mb={1}>
            <H6 sx={{ color: "grey" }}>
              SU: <H4 sx={{ color: "black", fontWeight: "bold" }}>{minqty}</H4>
            </H6>
          </FlexBox>

          <FlexBox alignItems="center" mb={1}>
            <H6 sx={{ color: "grey" }}>
              Country:{" "}
              <H4 sx={{ color: "black", fontWeight: "bold" }}> {iso_code_2}</H4>
            </H6>
          </FlexBox>

          {/* <FlexBox alignItems="center" mb={1}>
            <H6 sx={{ color: "grey" }}>
              Weight:{" "}
              <H4 sx={{ color: "black", fontWeight: "bold" }}>
                {" "}
                {ProductWeight}
              </H4>
            </H6>
          </FlexBox> */}

          <FlexBox alignItems="center" mb={1}>
            <H6 sx={{ color: "grey" }}>
              Stem Length:,
              <H4 sx={{ color: "black", fontWeight: "bold" }}>
                {StemLength} cm
              </H4>
            </H6>
          </FlexBox>

          <FlexBox alignItems="center" mb={1}>
            <H6 sx={{ color: "grey" }}>
              Color:{" "}
              <H4 sx={{ color: "black", fontWeight: "bold" }}> {ColorCode}</H4>
            </H6>
          </FlexBox>

          <FlexBox alignItems="center" mb={1}>
            <H6 sx={{ color: "grey" }}>
              Stock:
              <H4 sx={{ color: "black", fontWeight: "bold" }}>
                {AvailableStock}
              </H4>
            </H6>
          </FlexBox>

          <FlexBox alignItems="center" mb={1}>
            <H6 sx={{ color: "grey" }}>
              Quality:
              <H4 sx={{ color: "black", fontWeight: "bold" }}>
                {ProductQuality}
              </H4>
            </H6>
          </FlexBox>

          <Box pt={1} mb={3}>
            <H2 color="primary.main" mb={0.5} lineHeight="1">
              EUR {price}
            </H2>
            {/* <Box color="inherit">Stock Available</Box> */}
          </Box>
          <Box pt={0} mb={1}>
            {errorMessage && (
              <label style={{ color: "red" }}>{errorMessage}</label>
            )}
          </Box>

          <FlexBox alignItems="center" mb={1}>
            <H6 sx={{ color: "grey" }}>Your Order:</H6>
          </FlexBox>

          <FlexBox alignItems="center">
            <Button
              color="primary"
              sx={{
                p: "5px",
              }}
              variant="outlined"
              // disabled={prdQty === 1}
              onClick={handleCartAmountChange(parseFloat(prdQty) - 1)}
            >
              <Remove fontSize="small" />
            </Button>
            <Span mx={1} fontWeight={600} fontSize={15}>
              {prdQty}
            </Span>
            <Button
              color="primary"
              sx={{
                p: "5px",
              }}
              variant="outlined"
              onClick={handleCartAmountChange(parseFloat(prdQty) + 1)}
            >
              <Add fontSize="small" />
            </Button>
            <Span mx={1} fontWeight={600} fontSize={15}>
              X {minqty}
            </Span>
          </FlexBox>
          {/* <LoadingButton
            color="primary"
            variant="contained"
            onClick={handleCartConfirmLIVE}
            sx={{
              px: "1.75rem",
              height: 40,
              marginRight: "1rem",
            }}
            loading={isbtnLoading}
          >
            Add to cart (1 X {minqty})
          </LoadingButton>

          <LoadingButton
            color="primary"
            variant="contained"
            onClick={handleCartCancel}
            sx={{
              px: "1.75rem",

              height: 40,
            }}
            loading={isbtnLoading}
          >
            Cancel (1 X {minqty})
          </LoadingButton> */}
        </Grid>
      </Grid>
    </Box>
  );
};
export default ProductIntro;
