import Link from "next/link";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  TextField,
  styled,
} from "@mui/material";
//import Autocomplete from "@mui/material/Autocomplete";
//import MenuItem from "@mui/material/MenuItem";
import SEO from "components/SEO";
import { Span } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
import ProductCard7 from "components/product-cards/ProductCard7";
import CheckoutNavLayout from "components/layouts/CheckoutNavLayout";
import { useAppContext } from "contexts/AppContext";
//import countryList from "data/countryList";
import { currency, getuserCookie } from "lib";
import api from "utils/__api__/products";
import apihome from "utils/__api__/home";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
const Cart = ({ topcategory }) => {
  const { state } = useAppContext();
  //const cartList = state.cart;

  const cartListContext = state.cart;

  // const [shippingCharge, setShipping] = useState(0);
  const [cartList, setCart] = useState([]);
  // const [shiptypes, setshiptypes] = useState([]);

  const getTotalPrice = () =>
    cartListContext.reduce((accum, item) => accum + item.Rate * item.Qty, 0);

  const [totalAmount, setTotalAmount] = useState(0);

  const updateTotalAmount = (newAmount) => {
    setTotalAmount(newAmount);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const cartId = getuserCookie();

        const response = await api.getCartDetail(cartId);
        if (response) {
          const dout = response.Table1;
          // const shiptypes = response.Table3;
          setCart(dout);
          // setshiptypes(shiptypes);
          // setShipping(response.Table3[0].Rate);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchData();
    Cookies.set("_redurl", "/");
  }, []);

  // const handleShippingChange = (rate) => (e) => {
  //   //console.log(rate);
  //   setShipping(rate);
  // };
  const StyledButton = styled(Button)({
    marginTop: "2rem",
    padding: "11px 24px",
  });
  return (
    <CheckoutNavLayout topcategory={topcategory}>
      <SEO title="Cart" />

      <Grid container spacing={3}>
        {cartList.length <= 0 && (
          <FlexBox
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
            height="calc(100% - 74px)"
          >
            <Box
              component="p"
              mt={2}
              color="grey.600"
              textAlign="center"
              maxWidth="200px"
            >
              Cart is empty.
            </Box>

            <Link href="/" passHref>
              <StyledButton
                color="primary"
                disableElevation
                variant="contained"
                className="button-link"
              >
                Start shopping
              </StyledButton>
            </Link>
          </FlexBox>
        )}
        {/* CART PRODUCT LIST */}
        <Grid item md={8} xs={12}>
          {cartList.map((item, ind) => (
            <ProductCard7 key={ind} {...item} />
          ))}
        </Grid>

        {cartList.length > 0 && (
          <Grid item md={4} xs={12}>
            <Card
              sx={{
                padding: 3,
              }}
            >
              {/* <TextField
               select
               fullWidth
               size="small"
               label="Shipping Options"
               variant="outlined"
               placeholder="Select Shipping Option"
               defaultValue="30"
             >
               {shiptypes.map((item) => (
                 <MenuItem
                   value={item.Code}
                   key={item.Code}
                   onClick={handleShippingChange(item.Rate)}
                 >
                   {item.Description}
                 </MenuItem>
               ))}
             </TextField>
             <Divider
               sx={{
                 mb: 2,
               }}
             /> */}
              <FlexBetween mb={2}>
                <Span color="grey.600">Order Total:</Span>

                <Span fontSize={14} fontWeight={500} lineHeight="1">
                  {currency(getTotalPrice())}
                </Span>
              </FlexBetween>
              {/* <FlexBetween mb={1}>
               <Span color="grey.600">Shipping and handling:</Span>
 
               <Span fontSize={14} fontWeight={500} lineHeight="1">
                 {currency(shippingCharge)}
               </Span>
             </FlexBetween> */}

              {/* <FlexBetween mb={1}>
               <Span color="grey.600">Total:</Span>
 
               <Span fontSize={18} fontWeight={600} lineHeight="1">
                 {currency(getTotalPrice())}
               </Span>
             </FlexBetween> */}

              <Divider
                sx={{
                  mb: 2,
                }}
              />

              {/* <FlexBox alignItems="center" columnGap={1} mb={2}>
               <Span fontWeight="600">Additional Comments</Span>
 
               <Span p="6px 10px" fontSize={12} lineHeight="1" borderRadius="3px" color="primary.main" bgcolor="primary.light">
                 Note
               </Span>
             </FlexBox>
 
             <TextField variant="outlined" rows={6} fullWidth multiline sx={{
             mb: 2
           }} />
 
             <Divider sx={{
             mb: 2
           }} />
 
             <TextField fullWidth size="small" label="Voucher" variant="outlined" placeholder="Voucher" />
 
             <Button variant="outlined" color="primary" fullWidth sx={{
             mt: 2,
             mb: 4
           }}>
               Apply Voucher
             </Button>
 
             <Divider sx={{
             mb: 2
           }} />
 
             <Span fontWeight={600} mb={2} display="block">
               Shipping Estimates
             </Span>
 
             <Autocomplete fullWidth sx={{
             mb: 2
           }} options={countryList}
           // getOptionLabel={(option) => option.label}
           renderInput={params => <TextField {...params} size="small" label="Country" variant="outlined" placeholder="Select Country" />} />
 
             <TextField select fullWidth size="small" label="State" variant="outlined" placeholder="Select State" defaultValue="new-york">
               {stateList.map(item => <MenuItem value={item.value} key={item.label}>
                   {item.label}
                 </MenuItem>)}
             </TextField>
 
             <TextField fullWidth size="small" label="Zip Code" placeholder="3100" variant="outlined" sx={{
             mt: 2
           }} />
 
             <Button variant="outlined" color="primary" fullWidth sx={{
             my: 2
           }}>
               Calculate Shipping
             </Button> */}

              <Link href="/checkout" passHref legacyBehavior>
                <Button variant="contained" color="primary" fullWidth>
                  Checkout Now
                </Button>
              </Link>
            </Card>
          </Grid>
        )}
      </Grid>
    </CheckoutNavLayout>
  );
};
// const stateList = [
//   {
//     value: "new-york",
//     label: "New York",
//   },
//   {
//     value: "chicago",
//     label: "Chicago",
//   },
// ];
// export async function getServerSideProps(context) {
//   const cartId =  getuserCookie();
//   const getData = await api.getCartDetail(cartId);
//   return {
//     props: {
//       cartList: getData.Table1,
//       shiptypes: getData.Table3,
//     },
//   };
// }
export async function getServerSideProps(context) {
  const topcategory = await apihome.getTopCategories();

  return {
    props: {
      topcategory: topcategory,
    },
  };
}
export default Cart;
