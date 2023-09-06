import { Pagination, Box } from "@mui/material";
import { ShoppingBag } from "@mui/icons-material";
import TableRow from "components/TableRow";
import { H5 } from "components/Typography";
import { FlexBox } from "components/flex-box";
import OrderRow from "pages-sections/orders/OrderRow";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import api from "utils/__api__/users";
import Cookies from "js-cookie";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
// ====================================================

// ====================================================

const Orders = ({ orderList, userId }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { redirect } = router.query;

  useEffect(() => {
    if (!session?.user) {
      Cookies.set("_redurl", "/");
      router.push(redirect || "/login");
    }
  }, [router, session, redirect]);
  return (
    <CustomerDashboardLayout>
      {/* TITLE HEADER AREA */}
      <UserDashboardHeader
        title="My Orders"
        icon={ShoppingBag}
        navigation={<CustomerDashboardNavigation />}
      />

      {/* ORDER LIST AREA */}
      <TableRow
        elevation={0}
        sx={{
          padding: "0px 18px",
          background: "none",
          display: {
            xs: "none",
            md: "flex",
          },
        }}
      >
        <H5 color="grey.600" my={0} mx={0.75} textAlign="left">
          Order #
        </H5>

        <H5 color="grey.600" my={0} mx={0.75} textAlign="left">
          Status
        </H5>

        <H5 color="grey.600" my={0} mx={0.75} textAlign="left">
          Date purchased
        </H5>

        <H5 color="grey.600" my={0} mx={0.75} textAlign="left">
          Total
        </H5>

        <H5
          my={0}
          px={2.75}
          color="grey.600"
          flex="0 0 0 !important"
          display={{
            xs: "none",
            md: "block",
          }}
        />
      </TableRow>

      {orderList.length <= 0 && (
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
            Order List is empty. Start shopping
          </Box>
        </FlexBox>
      )}
      {orderList.map((order) => (
        <OrderRow order={order} key={order.MO_DOCNO} userId={userId} />
      ))}

      <FlexBox justifyContent="center" mt={5}>
        {/* <Pagination
          count={5}
          color="primary"
          variant="outlined"
          onChange={(data) => console.log(data)}
        /> */}
      </FlexBox>
    </CustomerDashboardLayout>
  );
};
export async function getServerSideProps(context) {
  const orderList = await api.getOrders(context.params.id);
  return {
    props: {
      orderList,
      userId: context.params.id,
    },
  };
}
// export const getStaticProps = async () => {
//   const orderList = await api.getOrders();
//   return {
//     props: {
//       orderList
//     }
//   };
// };
export default Orders;
