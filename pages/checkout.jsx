import { Grid, Box } from "@mui/material";
import SEO from "components/SEO";
import CheckoutForm2 from "pages-sections/checkout/CheckoutForm2";
import CheckoutNavLayout from "components/layouts/CheckoutNavLayout";
import CheckoutSummary2 from "pages-sections/checkout/CheckoutSummary2";
//import PayOpayoDirect from "pages-sections/checkout/PayOpayoDirect";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "utils/__api__/users";
import apihome from "utils/__api__/home";
import Cookies from "js-cookie";
import { FlexBox } from "components/flex-box";

const Checkout = ({ topcategory }) => {
  const { data: session } = useSession();
  const [cartList, setCart] = useState([]);
  const [userAddress, setuserAddress] = useState([]);
  const [shiptypes, setShipping] = useState([]);
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (!session?.user) {
      Cookies.set("_redurl", "/cart");
      router.push(redirect || "/login");
    } else {
      async function fetchData() {
        try {
          const cartId = session.user._id;
          const response = await api.getCheckout(cartId);
          if (response) {
            const useradd = response.getuserdetails;
            const dout = response.getcartcheckout.Table1;
            setuserAddress(useradd);
            setCart(dout);
            setShipping(response.getcartcheckout.Table3);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
      fetchData();
    }
  }, [router, session, redirect]);

  return (
    <CheckoutNavLayout topcategory={topcategory}>
      <SEO title="Checkout" />

      {cartList.length <= 0 ? (
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
            onClick={()=>{router.push('/')}}
          >
            Cart is empty. Start shopping
          </Box>
        </FlexBox>
      ) : (
        <Grid container spacing={3}>
          <Grid item lg={8} md={8} xs={12}>
            <CheckoutForm2 userAddress={userAddress} />
          </Grid>

          <Grid item lg={4} md={4} xs={12}>
            <CheckoutSummary2 cartList={cartList} shiptypes={shiptypes} />
            {/* <PayOpayo /> */}
          </Grid>
        </Grid>
      )}
    </CheckoutNavLayout>
  );
};

// export async function getServerSideProps(context) {
//   const userAddress = await api.getCheckout();

//   return {
//     props: {
//       userAddress: userAddress,
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
export default Checkout;
