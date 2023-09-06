import Link from "next/link";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  useTheme,
} from "@mui/material";
import { Add, Clear, Close, Remove } from "@mui/icons-material";
import LazyImage from "components/LazyImage";
import { FlexBetween, FlexBox } from "components/flex-box";
import { H5, Paragraph, Tiny } from "components/Typography";
import CartBag from "components/icons/CartBag";
import { useAppContext } from "contexts/AppContext";
import { currency, getuserCookie } from "lib";
import { useEffect, useState } from "react";
import axios from "axios";
import getConfig from "next/config";
import { useSession } from "next-auth/react";

const { publicRuntimeConfig } = getConfig();
const apiurl = publicRuntimeConfig.factsApiUrl + "Page/getopensection";
// =========================================================

// =========================================================

const MiniCart = ({ toggleSidenav }) => {
  const { palette } = useTheme();

  const { state, dispatch } = useAppContext();
  //state.cart;
  //const [cartList, setCart] = useState([{}]);
  const [cartList, setCart] = useState([]);
  const { data: session } = useSession();
  useEffect(() => {
    async function fetchData() {
      try {
        let cartId = "";

        if (!session?.user) {
          cartId = getuserCookie();
        } else {
          cartId = session.user._id;
        }
        const parmobj = {
          containerId: ["cartsummary"],
          strUserId: cartId ?? "",
        };
        const response = await axios.post(apiurl, parmobj, {
          headers: {
            "content-type": "application/json",
          },
        });

        if (response.data) {
          const dout = response.data[0].data.cartsummary.Table1;
          setCart(dout);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchData();
  }, []);
  const handleCartAmountChange = (amount, product) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        ...product,
        Qty: amount,
      },
    });
  };

  // const getCart = () => async () => {
  //   const cartId = getuserCookie();
  //   console.log(cartId);
  //   const cartList = await api.getMiniCart(cartId);
  //   console.log(cartList);
  //   return cartList;
  // };
  // useEffect(() => {
  //   const cartdata = getCart();
  //   console.log(cartdata);
  //   setCart(cartdata);
  // }, []);

  const getTotalPrice = () => {
    return cartList.reduce((accum, item) => accum + item.Rate * item.Qty, 0);
  };
  return (
    <Box width="100%" maxWidth={380}>
      <Box
        overflow="auto"
        height={`calc(100vh - ${
          !!cartList.length ? "100px - 4.25rem" : "0px"
        })`}
      >
        <FlexBetween mx={3} height={74}>
          <FlexBox gap={1} alignItems="center" color="secondary.main">
            <CartBag color="inherit" />

            <Paragraph lineHeight={0} fontWeight={600}>
              {cartList.length} item
            </Paragraph>
          </FlexBox>

          <IconButton onClick={toggleSidenav}>
            <Clear />
          </IconButton>
        </FlexBetween>

        <Divider />

        {cartList.length <= 0 && (
          <FlexBox
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
            height="calc(100% - 74px)"
          >
            <LazyImage
              width={90}
              height={100}
              alt="banner"
              src="/assets/images/logos/shopping-bag.svg"
            />
            <Box
              component="p"
              mt={2}
              color="grey.600"
              textAlign="center"
              maxWidth="200px"
            >
              Your shopping bag is empty. Start shopping
            </Box>
          </FlexBox>
        )}

        {cartList.map((item) => (
          <FlexBox
            py={2}
            px={2.5}
            key={item.ProductId}
            alignItems="center"
            borderBottom={`1px solid ${palette.divider}`}
          >
            <FlexBox alignItems="center" flexDirection="column">
              {/* <Button
                color="primary"
                variant="outlined"
                onClick={handleCartAmountChange(item.Qty + 1, item)}
                sx={{
                  height: "32px",
                  width: "32px",
                  borderRadius: "300px",
                }}
              >
                <Add fontSize="small" />
              </Button> */}

              <Box fontWeight={600} fontSize="15px" my="3px">
                {item.Qty}
              </Box>

              {/* <Button
                color="primary"
                variant="outlined"
                disabled={item.Qty === 1}
                onClick={handleCartAmountChange(item.Qty - 1, item)}
                sx={{
                  height: "32px",
                  width: "32px",
                  borderRadius: "300px",
                }}
              >
                <Remove fontSize="small" />
              </Button> */}
            </FlexBox>

            {/* <Link href={`/products/${item.ProductId}`}>
              <a> */}
            <Avatar
              alt={item.ProductDesc}
              src={item.ImageUrl}
              sx={{
                mx: 2,
                width: 76,
                height: 76,
              }}
            />

            {/* </a>
            </Link> */}

            {/* <Box
                  key={index}
                  sx={{ maxWidth: 70, maxHeight: 70, cursor: "pointer" }}
                  onClick={() => setCurrentSlide(index)}
                >
                  <Link href={item.HREF}>
                      <Image
                        src={`https:${item.IMAGE_URL}`}
                        // width="50"
                        // height="50"
                        alt={item.PIM_DESC}
                        width={300}
                        height={300}
                        loading="eager"
                        objectFit="contain"
                        className={index === currentSlide && compStyling.glow}
                      />
                  </Link>
                </Box> */}

            <Box
              flex="1"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {/* <Link href={`/products/${item.ProductSeoUrl}`}>
                <a> */}
              <H5 ellipsis fontSize="14px" className="title">
                {item.ProductDesc}
              </H5>
              {/* </a>
              </Link> */}

              <Tiny color="grey.600">
                {currency(item.Rate)} x {item.Qty} ({item.SizeDesc})
              </Tiny>

              <Box
                fontWeight={600}
                fontSize="14px"
                color="primary.main"
                mt={0.5}
              >
                {currency(item.Qty * item.Rate)}
              </Box>
            </Box>

            {/* <IconButton
              size="small"
              onClick={handleCartAmountChange(0, item)}
              sx={{
                marginLeft: 2.5,
              }}
            >
              <Close fontSize="small" />
            </IconButton> */}
          </FlexBox>
        ))}
      </Box>

      {cartList.length > 0 && (
        <Box p={2.5}>
          <Link href="/cart" passHref>
            <Button
              fullWidth
              color="primary"
              variant="outlined"
              sx={{
                height: 40,
              }}
              onClick={toggleSidenav}
            >
              View Cart
            </Button>
          </Link>
          <Link href="/checkout" passHref>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              sx={{
                mt: "0.75rem",
                height: "40px",
              }}
              onClick={toggleSidenav}
            >
              Checkout Now ({currency(getTotalPrice())})
            </Button>
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default MiniCart;
