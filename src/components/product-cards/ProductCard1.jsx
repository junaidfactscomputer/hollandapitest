import Link from "next/link";
import { Fragment, useCallback, useEffect, useState, useRef } from "react";
import {
  Add,
  AddCircle,
  Favorite,
  Remove,
  RemoveRedEye,
} from "@mui/icons-material";
import { Box, Button, Chip, IconButton, styled } from "@mui/material";
import { useSnackbar } from "notistack";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
//import LazyImage from "components/LazyImage";
import BazaarCard from "components/BazaarCard";
import { H3, H4, Span } from "components/Typography";
//import BazaarRating from "components/BazaarRating";
import { useAppContext } from "contexts/AppContext";
import ProductViewDialog from "components/products/ProductViewDialog";
import { FlexBox } from "../flex-box";
import {
  calculateDiscount,
  currency,
  calculatePercDiscount,
  getuserCookie,
} from "lib";
import { format } from "date-fns";

import Image from "components/BazaarImage";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import { getProduct } from "utils/__api__/products";
import api from "utils/__api__/products";
import getConfig from "next/config";
import axios from "axios";

const { publicRuntimeConfig } = getConfig();
const apiurl = publicRuntimeConfig.factsApiUrl + "Page/getopensection";

// styled components
const StyledBazaarCard = styled(BazaarCard)({
  height: "100%",
  margin: "auto",
  display: "flex",
  overflow: "hidden",
  borderRadius: "0px",
  position: "relative",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "all 250ms ease-in-out",
  ":hover": {
    "& .hover-box": {
      opacity: 1,
    },
  },
});
const ImageWrapper = styled(Box)(({ theme }) => ({
  textAlign: "center",
  position: "relative",
  display: "inline-block",
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));
const ContentWrapper = styled(Box)({
  // padding: "1rem",
  "& .title, & .categories": {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
});

const StyledChip = styled(Box)({
  zIndex: 1,
  top: "10px",
  right: "0px",
  // height:null,
  // maxHeight:null,
  backgroundColor: "rgba(210,51,67, .85)",
  color: "white",
  padding: "0.3rem",
  paddingLeft: "0.8rem",
  paddingRight: "0.8rem",
  fontWeight: 600,
  borderRadius: 0,

  fontSize: "5vw",
  "@media (min-width:600px)": {
    fontSize: "2rem",
  },

  position: "absolute",
});
const HoverIconWrapper = styled(Box)({
  zIndex: 2,
  top: "7px",
  opacity: 0,
  right: "15px",
  display: "flex",
  cursor: "pointer",
  position: "absolute",
  flexDirection: "column",
  transition: "all 0.3s ease-in-out",
});
const SizeViewWrapper = styled(Box)({
  zIndex: 2,
  position: "absolute",
  bottom: 0,

  right: 0,
  backgroundColor: "#fafafaf1",
  height: "100%",
  minHeight: "100px",
  transition: "all 0.3s ease-in-out",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "flex-start",
});
const SizeButton = styled(Button)({
  backgroundColor: "white",
  borderRadius: 0,
  display: "flex",
  padding: "2px",
  paddingRight: "7px",
  paddingLeft: "7px",
  marginLeft: "4px",
  marginRight: "4px",
  marginBottom: "5px",

  // color:'#aaaaaa',
  // border:'2px solid #dadada'
});
// const QuickViewButton = styled(Button)({
//   left: 0,
//   bottom: 0,
//   opacity: 0,
//   borderRadius: 0,
//   position: "absolute",
//   transition: "all 0.3s"
// });

// <QuickViewButton fullWidth size="large" color="dark" variant="contained" className="product-view-action" onClick={() => setOpenDialog(true)}>
// Quick View
// </QuickViewButton>

// ========================================================

// ========================================================

const ProductCard1 = ({
  id,
  slug,
  title,
  price,
  wasPrice,
  colorCode,
  imgUrl,
  imgHover,
  rating = 5,
  hideRating,
  hoverEffect,
  discount = 0,
  showProductSize,
  iso_code_2,
  AvailableStock,
  ProductWeight,
  StemLength,
  bunch_value,
}) => {
  const router = useRouter();
  const [isHovering, setIsHovered] = useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  const { enqueueSnackbar } = useSnackbar();
  const { state, dispatch } = useAppContext();
  const [sizeMenuIsOpen, setSizeMenuIsOpen] = useState(false);
  const [sizes, setSizes] = useState([]);

  const sizeOpenHandler = async () => {
    if (sizes.length === 0) {
      const pagelink = slug.split("/");
      const cps = [pagelink[2], pagelink[3]];
      const getData = await api.getProductDetails(cps, "");
      setSizes(getData.productdetail.Table2);
      // setSizes(getData)
    }
    // event.stopPropagation();
    setSizeMenuIsOpen(true);
  };
  const closeSizeMenuHandler = () => {
    setSizeMenuIsOpen(false);
  };
  const overflowingText = useRef();
  const checkOverflow = (textContainer) => {
    if (textContainer) {
      return (
        textContainer.offsetHeight < textContainer.scrollHeight ||
        textContainer.offsetWidth < textContainer.scrollWidth
      );
    }
    return false;
  };
  // console.log(showProductSize)
  // useEffect(async ()=>{
  //   const getData = await getProduct(slug)
  //   console.log(getData)
  // },[])

  const [isOverFlow, setIsOverFlow] = useState(false);
  useEffect(() => {
    const isTrue = checkOverflow(overflowingText.current);
    setIsOverFlow(isTrue);
  }, [overflowingText]);

  const [isbtnLoading, setIsbtnLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const handleCartAmountChange = async (quantity, sizeCode) => {
    if (sizeCode === "" || sizeCode === "-1") {
      setErrorMessage("Please select size");
    } else {
      setErrorMessage("");
      setIsbtnLoaded(true);
      const cartId = getuserCookie();
      const parmobj = {
        containerId: ["addtocart"],
        process: "add",
        CustomerId: cartId,
        DocDate: format(new Date(), "yyyy/MM/dd kk:mm:ss"), //"2023-04-10 12:15:24", //new Date()
        CustomCategoryUrl: slug, // params.slug,
        ProductDocNo: id, //params.id,
        SizeCode: sizeCode, //params.size,
        Qty: quantity, //params.qty,
        Rate: price, // params.price,
        ColorCode: colorCode ? colorCode : "",
      };

      try {
        const response = await axios.post(apiurl, parmobj, {
          headers: {
            "content-type": "application/json",
          },
        });

        //console.log("Response:", response.data[0].data);
        if (response.data[0]) {
          dispatch({
            type: "CHANGE_CART_AMOUNT",
            payload: {
              Rate: price,
              Qty: quantity,
              ProductDesc: title,
              ImageUrl: imgUrl,
              ProductId: id,
              ProductSeoUrl: slug,
              ColourCode: colorCode,
              SizeCode: sizeCode,
            },
          });

          let dispmessage = "Cart updated";
          if (quantity === 1) {
            dispmessage = "Added to Cart";
          }
          enqueueSnackbar(dispmessage, {
            variant: "success",
          });
        }
      } catch (error) {
        console.log(error);
        console.error("Error:", error);
      }
      setIsbtnLoaded(false);
    }
  };
  return (
    <StyledBazaarCard hoverEffect={hoverEffect}>
      <ImageWrapper>
        {/* {!!wasPrice && price != "" && wasPrice > 0 && (
          <StyledChip>{`${calculatePercDiscount(
            price,
            wasPrice
          )} OFF`}</StyledChip>
        )} */}

        <Link href={`${slug}`} legacyBehavior>
          <a onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {/* <LazyImage src={imgUrl} width={0} height={0} layout="responsive" alt={title} /> */}
            {isHovering & imgHover ? (
              <Image
                src={imgHover.substring(0, imgHover.indexOf(","))}
                alt={title}
                width="100%"
              />
            ) : (
              <Image src={imgUrl} alt={title} width="100%" />
            )}
          </a>
        </Link>
      </ImageWrapper>

      {/* <ProductViewDialog
        openDialog={openModal}
        handleCloseDialog={toggleDialog}
        product={{
          title,
          price,
          id,
          slug,
          imgGroup: [imgUrl, imgUrl],
        }}
      /> */}

      <ContentWrapper position="relative">
        <Box height="100%">
          <FlexBox
            justifyContent="space-between"
            position="relative"
            alignItems="stretch"
            height="100%"
            width="100%"
          >
            {/* <FlexBox position='absolute' top='0' left='0'> Hello</FlexBox> */}
            <FlexBox
              sx={{
                padding: "0.8rem",
                width: "87%",
                display: "block",
                display: "flex",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
              mr={1}
              onClick={() => {
                router.push(`${slug}`);
              }}
            >
              <div
                style={{
                  flexWrap: "wrap",
                  display: "flex",
                  boxSizing: "box",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 5,
                  maxWidth: "100%",
                }}
                ref={overflowingText}
              >
                <Box
                  display="flex"
                  flexDirection="row"
                  maxWidth="100%"
                  flexWrap="wrap"
                  gap={1}
                >
                  <H3
                    title={title}
                    fontSize="14px"
                    fontWeight="600"
                    className="title"
                    color="text.secondary"
                  >
                    {title}
                  </H3>
                  <Box color="grey.600" fontWeight="400">
                    SU : {bunch_value}
                  </Box>
                  <Box color="grey.600" fontWeight="400">
                    Stem Length : {StemLength}
                  </Box>
                  <Box color="grey.600" fontWeight="400">
                    Stock : {AvailableStock}
                  </Box>
                  <Box color="grey.600" fontWeight="400">
                    Weight : {ProductWeight}
                  </Box>
                </Box>

                <Box display="flex" flexDirection="row" gap={1}>
                  {!!discount && discount != "" && wasPrice > 0 && (
                    <Box color="grey.600" fontWeight="600">
                      <del>{currency(wasPrice)}</del>
                    </Box>
                  )}
                  <Box fontWeight="600" color="primary.main">
                    EUR {price}
                    {/* {calculateDiscount(price, discount)} */}
                  </Box>
                </Box>
              </div>
            </FlexBox>
            <FlexBox
              width="13%"
              // minHeight='100%'
              flex={1}
              justifyContent="center"
              alignItems="center"
            >
              {/* <Button onClick={sizeOpenHandler}>
                <AddCircle fontSize="small" />
              </Button> */}

              {/* <Button
                  size="large"
                  color="primary"
                  variant="contained"
                  onClick={handleCartAmountChange(1)}
                  sx={{
                    height: 45,
                  }}
                >
                  Buy Now
                </Button> */}
            </FlexBox>
            <SizeViewWrapper
              sx={{
                width: sizeMenuIsOpen ? "100%" : "0px",
                overflow: "hidden",
                opacity: sizeMenuIsOpen ? "1" : "0",
              }}
            >
              <H4
                sx={{ paddingLeft: "5px", paddingTop: "3px", color: "#6a6a6a" }}
              >
                Select your size:
              </H4>
              <FlexBox
                sx={{
                  // justifyContent: "space-evenly",
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {sizes.map((v, i) => {
                  const inStock = v?.Size_Code !== "-1";
                  return (
                    <SizeButton
                      disabled={!inStock}
                      sx={{
                        color: inStock ? "#2a2a2a" : "#aaaaaa",
                        border: inStock
                          ? "2px solid #2a2a2a"
                          : "2px solid #dadada",
                        textDecoration: inStock ? null : "line-through 1.5px",
                        cursor: inStock ? "pointer" : null,
                        ":hover": {
                          backgroundColor: "#2a2a2a",
                          color: "#fafafa",
                        },
                      }}
                      key={i}
                      onClick={async () =>
                        await handleCartAmountChange(1, v.Size_Code)
                      }
                    >
                      {v.SizeDesc.split(" ")[0]}
                    </SizeButton>
                  );
                })}
              </FlexBox>
              <CloseIcon
                onClick={closeSizeMenuHandler}
                sx={{
                  cursor: "pointer",
                  position: "absolute",
                  right: "3px",
                  top: "3px",
                  ":hover": { color: "#8a8a8a" },
                }}
              />
            </SizeViewWrapper>
          </FlexBox>
        </Box>
      </ContentWrapper>
    </StyledBazaarCard>
  );
};
export default ProductCard1;

// {/* <FlexBox
//             width="30px"
//             alignItems="center"
//             className="add-cart"
//             flexDirection="column-reverse"
//             justifyContent={!!cartItem?.qty ? "space-between" : "flex-start"}
//           >
//             <Button
//               color="primary"
//               variant="outlined"
//               sx={{
//                 padding: "3px",
//               }}
//               onClick={handleCartAmountChange({
//                 id,
//                 slug,
//                 price,
//                 imgUrl,
//                 name: title,
//                 qty: (cartItem?.qty || 0) + 1,
//               })}
//             >
//               <Add fontSize="small" />
//             </Button>

//             {!!cartItem?.qty && (
//               <Fragment>
//                 <Box color="text.primary" fontWeight="600">
//                   {cartItem?.qty}
//                 </Box>

//                 <Button
//                   color="primary"
//                   variant="outlined"
//                   sx={{
//                     padding: "3px",
//                   }}
//                   onClick={handleCartAmountChange(
//                     {
//                       id,
//                       slug,
//                       price,
//                       imgUrl,
//                       name: title,
//                       qty: (cartItem?.qty || 0) - 1,
//                     },
//                     "remove"
//                   )}
//                 >
//                   <Remove fontSize="small" />
//                 </Button>
//               </Fragment>
//             )}
//           </FlexBox> */}
