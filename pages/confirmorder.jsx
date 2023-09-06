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
import axios from "axios";
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

  const handleConfirmOrder = () => {
    async function SyncData() {
      try {
        console.log("start");

        const response = await api.confirmOrder();
        if (response) {
          const dout = response.getcart.Table;
          console.log(response);
          alert(dout);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    SyncData();
  };

  const handleCartConfirm = () => {
    cartList.map((items, index) => {
      const xmlData = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
      <soap:Body>
          <PutOrderRequest xmlns="urn:fec:florecom:xml:data:draft:OrderStandardMessage:7" 
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
              <Header xmlns="urn:fec:florecom:xml:data:draft:OrderStandardMessage:7">
                  <MessageID>e6b67c12-8a2b-430a-aad8-a74f3e4afb5e</MessageID>
                  <MessageDateTime>2023-07-25T17:08:16+02:00</MessageDateTime>
                  <MessageSerial>1</MessageSerial>
              </Header>
              <Body xmlns="urn:fec:florecom:xml:data:draft:OrderStandardMessage:7">
                  <Order>
                      <OrderTradeLineItem>
                          <ID xmlns="urn:fec:florecom:xml:data:draft:ReusableAggregateBusinessInformationEntity:6" schemeName="ON">TESTRONALD001</ID>
                          <DocumentType xmlns="urn:fec:florecom:xml:data:draft:ReusableAggregateBusinessInformationEntity:6">220</DocumentType>
                          <LineDateTime xmlns="urn:fec:florecom:xml:data:draft:ReusableAggregateBusinessInformationEntity:6">2023-07-21T14:44:52.36+02:00</LineDateTime>
                          <TradingTerms xmlns="urn:fec:florecom:xml:data:draft:ReusableAggregateBusinessInformationEntity:6">
                              <MarketPlace>
                                  <ID schemeID="1" schemeAgencyName="FEC">8713782537153</ID>
                              </MarketPlace>
                              <MarketFormCode>005</MarketFormCode>
                              <TradePeriod>
                                  <StartDateTime>2023-07-21T14:44:37.5+02:00</StartDateTime>
                                  <EndDateTime>2024-05-16T23:59:59+02:00</EndDateTime>
                              </TradePeriod>
                          </TradingTerms>
                          <ReferencedDocument xmlns="urn:fec:florecom:xml:data:draft:ReusableAggregateBusinessInformationEntity:6">
                              <IssuerAssignedID xmlns="urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:3" schemeName="AAG" schemeDataURI="8713782537153" schemeURI="8713782537153">PL1445788960</IssuerAssignedID>
                          </ReferencedDocument>
                          <Product xmlns="urn:fec:florecom:xml:data:draft:ReusableAggregateBusinessInformationEntity:6">
                              <IndustryAssignedID schemeID="1" schemeAgencyName="VBN">{IndustryAssignedID}</IndustryAssignedID>
                              <SupplierAssignedID>{SupplierAssignedID}</SupplierAssignedID>
                              <DescriptionText languageCode="nl">{DescriptionText}</DescriptionText>
                              
                          </Product>
                          <Quantity xmlns="urn:fec:florecom:xml:data:draft:ReusableAggregateBusinessInformationEntity:6" unitCode="1">{Quantity}</Quantity>
                          <Price xmlns="urn:fec:florecom:xml:data:draft:ReusableAggregateBusinessInformationEntity:6">
                              <TypeCode>AE</TypeCode>
                              <NetPriceIndicator>false</NetPriceIndicator>
                          </Price>
                          <Delivery xmlns="urn:fec:florecom:xml:data:draft:ReusableAggregateBusinessInformationEntity:6">
                              <DeliveryTerms>
                                  <DeliveryTypeCode xmlns="urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:3">EXW</DeliveryTypeCode>
                                  <RelevantTradeLocation xmlns="urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:3">
                                      <ID>8714231208631</ID>
                                  </RelevantTradeLocation>
                              </DeliveryTerms>
                              <EarliestDeliveryDateTime>2023-07-29T02:00:00+02:00</EarliestDeliveryDateTime>
                              <LatestDeliveryDateTime>2023-07-29T00:00:00+02:00</LatestDeliveryDateTime>
                          </Delivery>
                      </OrderTradeLineItem>
                  </Order>
              </Body>
          </PutOrderRequest>
      </soap:Body>
  </soap:Envelope>`;

      const replacedXML = xmlData
        .replace("{IndustryAssignedID}", items.StockCode)
        .replace("{SupplierAssignedID}", items.ProductId)
        .replace("{DescriptionText}", items.ProductDesc)
        .replace("{Quantity}", items.Qty);

      try {
        const response = axios.post(
          "http://185.34.156.243:81/AxerrioServer/CrossCommunityVmp0p7",
          replacedXML,
          {
            headers: {
              SOAPAction:
                "http://webservices.florecom.org/commercial/customer/PutOrder_0p7",
              "content-type": "text/xml; charset=utf-8",
              "Access-Control-Allow-Origin": "*",
              Authorization:
                "Basic YXBpdGVzdHByaWNlbGlzdDpYOHJzOVhjcXltaHFOdkNX",
            },
          }
        );
        console.log(response);
      } catch (error) {
        console.error("Error:", error);
      }
    });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const cartId = getuserCookie();

        const response = await api.getCartDetail(cartId);
        if (response) {
          const dout = response.Table;
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
              <FlexBetween mb={2}>
                <Span color="grey.600">Order Total:</Span>

                <Span fontSize={14} fontWeight={500} lineHeight="1">
                  {currency(getTotalPrice())}
                </Span>
              </FlexBetween>

              <Divider
                sx={{
                  mb: 2,
                }}
              />

              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleConfirmOrder}
              >
                Checkout Now
              </Button>
            </Card>
          </Grid>
        )}
      </Grid>
    </CheckoutNavLayout>
  );
};

export async function getServerSideProps(context) {
  // const topcategory = await apihome.getTopCategories();

  return {
    props: {
      topcategory: [],
    },
  };
}
export default Cart;
