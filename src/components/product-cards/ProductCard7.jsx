import Link from "next/link";
import { Add, Close, Remove } from "@mui/icons-material";
import { Box, Button, Card, IconButton, styled } from "@mui/material";
import Image from "components/BazaarImage";
import { Span } from "components/Typography";
import { FlexBox } from "components/flex-box";
import { useAppContext } from "contexts/AppContext";
import axios from "axios";
import { getuserCookie, currency } from "lib";
import { format } from "date-fns";
import { useSnackbar } from "notistack";
import getConfig from "next/config";
import { useState } from "react";
import { useRouter } from "next/router";

const { publicRuntimeConfig } = getConfig();
const apiurl = publicRuntimeConfig.factsApiUrl + "Page/getopensection";

// styled components
const Wrapper = styled(Card)(({ theme }) => ({
  display: "flex",
  overflow: "hidden",
  alignItems: "center",
  position: "relative",
  borderRadius: "10px",
  marginBottom: "1.5rem",
  boxShadow: theme.shadows[2],
  backgroundColor: theme.palette.background.paper,
  "@media only screen and (max-width: 425px)": {
    flexWrap: "wrap",
    img: {
      height: "auto",
      minWidth: "100%",
    },
  },
}));

// =========================================================

// =========================================================

const ProductCard7 = ({
  ProductId,
  ProductDesc,
  Qty,
  Rate,
  ImageUrl,
  CustomCategorySeoUrl,
  SizeCode,
  ColourCode,
  ColourDesc,
  SizeDesc,
}) => {
  const { dispatch } = useAppContext();
  const { enqueueSnackbar } = useSnackbar();
  const [prdQty, setprdQty] = useState(Qty);
  const router = useRouter();

  // handle change cart
  // const handleCartAmountChange = (amount) => () => {
  //   dispatch({
  //     type: "CHANGE_CART_AMOUNT",
  //     payload: {
  //       ProductId,
  //       ProductDesc,
  //       price,
  //       ImageUrl,
  //       Qty: amount,
  //       CustomCategorySeoUrl,
  //     },
  //   });
  // };
  // HANDLE CHANGE CART
  const handleCartAmountChange = (quantity) => async () => {
    const cartId = getuserCookie();
    const parmobj = {
      containerId: ["addtocart"],
      process: "update",
      CustomerId: cartId,
      DocDate: format(new Date(), "yyyy/MM/dd kk:mm:ss"), //"2023-04-10 12:15:24", //new Date()
      CustomCategoryUrl: CustomCategorySeoUrl, // params.slug,
      ProductDocNo: ProductId, //params.id,
      SizeCode: SizeCode, //params.size,
      Qty: quantity, //params.qty,
      Rate: Rate, // params.price,
      ColorCode: ColourCode,
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
            ProductId: ProductId,
            Rate: Rate,
            Qty: quantity,
            ProductDesc: ProductDesc,
            ImageUrl: ImageUrl,
            ProductSeoUrl: CustomCategorySeoUrl,
            ColourCode: ColourCode,
            SizeCode: SizeCode,
          },
        });

        setprdQty(quantity);
        if (quantity === 0) {
          router.reload(window.location.pathname);
        } else {
          let dispmessage = "Cart updated";
          enqueueSnackbar(dispmessage, {
            variant: "success",
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Wrapper>
      <Image
        alt={ProductDesc}
        width={140}
        height={140}
        display="block"
        src={ImageUrl || "/assets/images/categories/cat-6.png"}
      />

      <IconButton
        size="small"
        onClick={handleCartAmountChange(0)}
        sx={{
          position: "absolute",
          right: 15,
          bottom:15,
          borderRadius:0,
          fontSize:'small',
          fontStyle:'italic'
        }}
      >
        Remove
      </IconButton>

      <FlexBox p={2} rowGap={2} width="100%" flexDirection="column">
        {/* <Link href={`/products/${CustomCategorySeoUrl}`}> */}
        <Link href={`#`}>
          <Span ellipsis fontWeight="600" fontSize={18}>
            {ProductDesc}{" "}
            <Span color="grey.600" fontSize={12}>
              {ColourDesc} {SizeDesc}
            </Span>
          </Span>
        </Link>

        <FlexBox gap={1} flexWrap="wrap" alignItems="center">
          <Span color="grey.600">
            {currency(Rate)} x {prdQty}
          </Span>

          <Span fontWeight={600} color="primary.main">
            {currency(Rate * parseFloat(prdQty))}
          </Span>
        </FlexBox>

        <FlexBox alignItems="center">
          <Button
            color="primary"
            sx={{
              p: "5px",
            }}
            variant="outlined"
            disabled={prdQty === 1}
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
        </FlexBox>
      </FlexBox>
    </Wrapper>
  );
};
export default ProductCard7;
