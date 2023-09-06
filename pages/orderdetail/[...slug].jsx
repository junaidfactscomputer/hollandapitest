import { Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { Done, ShoppingBag } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import TableRow from "components/TableRow";
import Delivery from "components/icons/Delivery";
import PackageBox from "components/icons/PackageBox";
import TruckFilled from "components/icons/TruckFilled";
import { H5, H6, Paragraph } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import useWindowSize from "hooks/useWindowSize";
import OrderReview from "components/products/OrderReview";
import { currency } from "lib";
import Cookies from "js-cookie";
import { useSession } from "next-auth/react";
import api from "utils/__api__/users";

// styled components
const StyledFlexbox = styled(FlexBetween)(({ theme }) => ({
  flexWrap: "wrap",
  marginTop: "2rem",
  marginBottom: "2rem",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
  "& .line": {
    height: 4,
    minWidth: 50,
    flex: "1 1 0",
    [theme.breakpoints.down("sm")]: {
      flex: "unset",
      height: 50,
      minWidth: 4,
    },
  },
}));
// =============================================================

const OrderDetails = ({ order, orderitems, orderreceipt }) => {
  const router = useRouter();
  const width = useWindowSize();
  const orderStatus = "Packing Complete";
  const orderStatusList = [
    "Packing Complete",
    "Packing Started",
    "Invoice Printed",
    "Packing Complete",
  ];

  const shipaddress = order.shipto.replace(/<br \/>/gi, " ");
  const stepIconList = [PackageBox, TruckFilled, Delivery];
  const breakpoint = 350;
  const statusIndex = orderStatusList.indexOf(orderStatus);

  const { data: session } = useSession();
  const { redirect } = router.query;

  useEffect(() => {
    if (!session?.user) {
      Cookies.set("_redurl", "/");
      router.push(redirect || "/login");
    }
  }, [router, session, redirect]);

  // SECTION TITLE HEADER
  // const HEADER_BUTTON = (
  //   <Button
  //     color="primary"
  //     sx={{
  //       bgcolor: "primary.light",
  //       px: 4,
  //     }}
  //   >
  //     Order Again
  //   </Button>
  // );

  // Show a loading state when the fallback is rendered
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  return (
    <CustomerDashboardLayout>
      {/* TITLE HEADER AREA */}
      <UserDashboardHeader
        icon={ShoppingBag}
        title="Order Details"
        navigation={<CustomerDashboardNavigation />}
        // button={HEADER_BUTTON}
      />

      {/* ORDER PROGRESS AREA */}
      <Card
        sx={{
          p: "2rem 1.5rem",
          mb: "30px",
        }}
      >
        <StyledFlexbox>
          {stepIconList.map((Icon, ind) => (
            <Fragment key={ind}>
              <Box position="relative">
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    bgcolor: ind <= statusIndex ? "primary.main" : "grey.300",
                    color: ind <= statusIndex ? "grey.white" : "primary.main",
                  }}
                >
                  <Icon
                    color="inherit"
                    sx={{
                      fontSize: "32px",
                    }}
                  />
                </Avatar>

                {ind < statusIndex && (
                  <Box position="absolute" right="0" top="0">
                    <Avatar
                      sx={{
                        width: 22,
                        height: 22,
                        bgcolor: "grey.200",
                        color: "success.main",
                      }}
                    >
                      <Done
                        color="inherit"
                        sx={{
                          fontSize: "1rem",
                        }}
                      />
                    </Avatar>
                  </Box>
                )}
              </Box>

              {ind < stepIconList.length - 1 && (
                <Box
                  className="line"
                  bgcolor={ind < statusIndex ? "primary.main" : "grey.300"}
                />
              )}
            </Fragment>
          ))}
        </StyledFlexbox>

        {/* <FlexBox justifyContent={width < breakpoint ? "center" : "flex-end"}>
          <Typography
            p="0.5rem 1rem"
            textAlign="center"
            borderRadius="300px"
            color="primary.main"
            bgcolor="primary.light"
          >
            Estimated Delivery Date <b>4th October</b> 
          </Typography>
        </FlexBox> */}
      </Card>

      {/* ORDERED PRODUCT LIST */}
      <Card
        sx={{
          p: 0,
          mb: "30px",
        }}
      >
        <TableRow
          sx={{
            p: "12px",
            borderRadius: 0,
            boxShadow: "none",
            bgcolor: "grey.200",
          }}
        >
          <FlexBox className="pre" m={0.75} alignItems="center">
            <Typography fontSize={14} color="grey.600" mr={0.5}>
              Order ID:
            </Typography>

            <Typography fontSize={14}>{order.DocNo}</Typography>
          </FlexBox>

          <FlexBox className="pre" m={0.75} alignItems="center">
            <Typography fontSize={14} color="grey.600" mr={0.5}>
              Placed on:
            </Typography>

            <Typography fontSize={14}>
              {order.mo_docdate}
              {/* {format(new Date(order.mo_docdate), "dd MMM, yyyy")} */}
            </Typography>
          </FlexBox>

          {/* <FlexBox className="pre" m={0.75} alignItems="center">
            <Typography fontSize={14} color="grey.600" mr={0.5}>
              Delivered on:
            </Typography>

            <Typography fontSize={14}>
              {format(new Date(), "dd MMM, yyyy")}
            </Typography>
          </FlexBox> */}
        </TableRow>
        <Box py={1}>
          {orderitems.map((item, ind) => (
            <FlexBox
              px={2}
              py={1}
              flexWrap="wrap"
              alignItems="center"
              key={ind}
            >
              <FlexBox flex="2 2 260px" m={0.75} alignItems="center">
                {/* <Avatar
                  src={item.product_img}
                  sx={{
                    height: 64,
                    width: 64,
                  }}
                /> */}

                <Box ml={2.5}>
                  <H6 my="0px">{item.modet_stock_desc}</H6>

                  <Typography fontSize="14px" color="grey.600">
                    {currency(item.modet_rate)} x {item.modet_qty}
                  </Typography>
                </Box>
              </FlexBox>

              <FlexBox flex="1 1 260px" m={0.75} alignItems="center">
                <Typography fontSize="14px" color="grey.600">
                  Color & Size: {item.modet_color_desc} {item.modet_size_desc}
                </Typography>
              </FlexBox>

              {/* <FlexBox flex="160px" m={0.75} alignItems="center">
                <Button variant="text" color="primary">
                  <Typography fontSize="14px">Write a Review</Typography>
                </Button>
              </FlexBox> */}
            </FlexBox>
          ))}
        </Box>
      </Card>

      {/* SHIPPING AND ORDER SUMMERY */}
      <Grid container spacing={3}>
        <Grid item lg={6} md={6} xs={12}>
          <Card
            sx={{
              p: "20px 30px",
            }}
          >
            <H5 mt={0} mb={2}>
              Shipping Address
            </H5>

            <Paragraph fontSize={14} my={0}>
              {shipaddress}
            </Paragraph>
          </Card>
        </Grid>

        <Grid item lg={6} md={6} xs={12}>
          <Card
            sx={{
              p: "20px 30px",
            }}
          >
            <H5 mt={0} mb={2}>
              Total Summary
            </H5>

            <FlexBetween mb={1}>
              <Typography fontSize={14} color="grey.600">
                Subtotal:
              </Typography>

              <H6 my="0px">{currency(order.mo_gross_amount)}</H6>
            </FlexBetween>

            <FlexBetween mb={1}>
              <Typography fontSize={14} color="grey.600">
                Shipping fee:
              </Typography>

              <H6 my="0px">{currency(order.mo_delivery_charge)}</H6>
            </FlexBetween>

            {/* <FlexBetween mb={1}>
              <Typography fontSize={14} color="grey.600">
                Discount:
              </Typography>

              <H6 my="0px">{currency(order.discount)}</H6>
            </FlexBetween> */}

            <Divider
              sx={{
                mb: 1,
              }}
            />

            <FlexBetween mb={2}>
              <H6 my="0px">Total</H6>
              <H6 my="0px">{currency(order.mo_net_amount)}</H6>
            </FlexBetween>

            <Typography fontSize={14}>
              PAID BY {orderreceipt.Method} {orderreceipt.TransactionID}
            </Typography>
          </Card>
        </Grid>
      </Grid>
      <Divider
        sx={{
          mb: 1,
        }}
      />
      <Grid container spacing={3}>
        <Grid item lg={6} md={6} xs={12}>
          <Card
            sx={{
              p: "20px 30px",
            }}
          >
            <H5 mt={0} mb={2}>
              CANCEL/CHANGE ORDER
            </H5>

            <Paragraph fontSize={14} my={0}>
              Changed your mind? To cancel or change something in your order,
              call our customer care immediately. Please note that, we are not
              able to cancel/change orders that already
              packed/dispatched/completed, but you can return any unwanted
              items.
            </Paragraph>
          </Card>
        </Grid>

        <Grid item lg={6} md={6} xs={12}>
          <Card
            sx={{
              p: "20px 30px",
            }}
          >
            <H5 mt={0} mb={2}>
              CUSTOMER CARE
            </H5>
            <H6 my="0px">Phone: 0116 246 4111</H6>
            <H6 my="0px">Email: info@rupalionline.com</H6>
          </Card>
        </Grid>
      </Grid>
      {/* <OrderReview /> */}
    </CustomerDashboardLayout>
  );
};

export async function getServerSideProps(context) {
  const response = await api.getOrderDetails(context.params.slug);
  const order = response.Table[0];
  const orderreceipt = response.Table1[0];
  const orderitems = response.Table;
  return {
    props: {
      order,
      orderitems,
      orderreceipt,
    },
  };
}

// export const getStaticPaths = async () => {
//   const paths = await api.getIds();
//   return {
//     paths: paths,
//     //indicates that no page needs be created at build time
//     fallback: "blocking", //indicates the type of fallback
//   };
// };

// export const getStaticProps = async ({ params }) => {
//   const order = await api.getOrder(String(params.id));
//   return {
//     props: {
//       order,
//     },
//   };
// };
export default OrderDetails;
