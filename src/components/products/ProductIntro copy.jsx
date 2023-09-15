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
import { H1, H2, H3, H4, H6, Paragraph } from "components/Typography";
import { useAppContext } from "contexts/AppContext";
import { FlexBox, FlexRowCenter } from "../flex-box";
import { currency } from "lib";
import axios from "axios";
import { getuserCookie } from "lib";
import { format } from "date-fns";
import { useRouter } from "next/router";
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

const { publicRuntimeConfig } = getConfig();
const apiurl = publicRuntimeConfig.factsApiUrl + "Page/getopensection";

// ================================================================

// ================================================================

const ProductIntroold = ({
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
  const industryCode = product.ProductID;
  const supplierCode = product.Product_SupplierAssignedID;
  const AgentParty_PrimaryID = product.AgentParty_PrimaryID;
  const PrimaryID = product.ID;
  const ParcelId = product.ParcelId;
  const ID_schemeURI = product.ID_schemeURI;
  const ReferencedDocument_IssuerAssignedID =
    product.ReferencedDocument_IssuerAssignedID;
  const ManufacturerCode = product.ManufacturerCode;
  const LatestOrderDateTime = product.LatestOrderDateTime;
  const LatestDeliveryDateTime = product.LatestDeliveryDateTime;
  const ProductXml = product.ProductXml;
  // const prddetails = product.PRM_DETAILS;
  // console.log(product)
  const router = useRouter();
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
  const handleCartAmountChange = (quantity) => async () => {
    if (selectVariants["size"] === "") {
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
        SizeCode: selectVariants["size"], //params.size,
        Qty: quantity, //params.qty,
        Rate: price, // params.price,
        ColorCode: selectVariants["color"],
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
              ImageUrl: thumbnail,
              ProductId: id,
              ProductSeoUrl: slug,
              ColourCode: selectVariants["color"],
              SizeCode: selectVariants["size"],
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
        console.error("Error:", error);
      }
      setIsbtnLoaded(false);
    }
  };
  const handleCartConfirmLIVE = () => {
    async function SyncData() {
      setIsbtnLoaded(true);

      const currentDateTime = new Date();

      // Get the date and time components
      const year = currentDateTime.getFullYear();
      const month = String(currentDateTime.getMonth() + 1).padStart(2, "0");
      const day = String(currentDateTime.getDate()).padStart(2, "0");
      const hours = String(currentDateTime.getHours()).padStart(2, "0");
      const minutes = String(currentDateTime.getMinutes()).padStart(2, "0");
      const seconds = String(currentDateTime.getSeconds()).padStart(2, "0");

      // Get the time zone offset in hours and minutes
      const timeZoneOffsetHours = Math.floor(
        currentDateTime.getTimezoneOffset() / 60
      );
      const timeZoneOffsetMinutes = Math.abs(
        currentDateTime.getTimezoneOffset() % 60
      );

      // Determine the time zone offset string (e.g., +02:00 or -03:30)
      const timeZoneOffsetString =
        (timeZoneOffsetHours >= 0 ? "+" : "-") +
        String(Math.abs(timeZoneOffsetHours)).padStart(2, "0") +
        ":" +
        String(timeZoneOffsetMinutes).padStart(2, "0");

      // Format the date and time string
      const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timeZoneOffsetString}`;

      const xmlData = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
      <soap:Body>
          <PutOrderRequest xmlns="urn:fec:florecom:xml:data:draft:OrderStandardMessage:7" 
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
              <Header xmlns="urn:fec:florecom:xml:data:draft:OrderStandardMessage:7">
                  <UserName>Domus</UserName>
		              <Password>6n8cQH4r7JpFGaAS</Password>
                  <MessageID>e6b67c12-8a2b-430a-aad8-a74f3e4afb5e</MessageID>
                  <MessageDateTime>${formattedDateTime}</MessageDateTime>
                  <MessageSerial>1</MessageSerial>
              </Header>
              <Body xmlns="urn:fec:florecom:xml:data:draft:OrderStandardMessage:7">
                  <Order>
           <AgentParty>
              <PrimaryID xmlns="urn:fec:florecom:xml:data:draft:ReusableAggregateBusinessInformationEntity:6" schemeID="1" schemeAgencyName="FEC">8714231190370</PrimaryID>
           </AgentParty>
           <OrderTradeLineItem>
              <ID xmlns="urn:fec:florecom:xml:data:draft:ReusableAggregateBusinessInformationEntity:6" schemeName="AAG" schemeDataURI="${AgentParty_PrimaryID}" schemeURI="${AgentParty_PrimaryID}">${PrimaryID}</ID>
              <DocumentType xmlns="urn:fec:florecom:xml:data:draft:ReusableAggregateBusinessInformationEntity:6">9</DocumentType>
              <LineDateTime xmlns="urn:fec:florecom:xml:data:draft:ReusableAggregateBusinessInformationEntity:6">2023-09-01T10:54:44.697+02:00</LineDateTime>
              <TradingTerms xmlns="urn:fec:florecom:xml:data:draft:ReusableAggregateBusinessInformationEntity:6">
                 <MarketPlace>
                    <ID schemeID="1" schemeAgencyName="FEC">${AgentParty_PrimaryID}</ID>
                    <NameText>Florecom TestCentre</NameText>
                 </MarketPlace>
                 <MarketFormCode>002</MarketFormCode>
              </TradingTerms>
              <ReferencedDocument xmlns="urn:fec:florecom:xml:data:draft:ReusableAggregateBusinessInformationEntity:6">
              <IssuerAssignedID schemeName="IRN" schemeDataURI="8713782537153" schemeURI="8713782537153" xmlns="urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:3">${ReferencedDocument_IssuerAssignedID}</IssuerAssignedID>
              </ReferencedDocument>
              <BuyerParty xmlns="urn:fec:florecom:xml:data:draft:ReusableAggregateBusinessInformationEntity:6">
                 <PrimaryID xmlns="urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:3" schemeID="1" schemeAgencyName="FEC" />
                 <DefinedTradeContact xmlns="urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:3">
                    <ID>TEST</ID>
                 </DefinedTradeContact>
              </BuyerParty>
              <SupplierParty xmlns="urn:fec:florecom:xml:data:draft:ReusableAggregateBusinessInformationEntity:6">
                 <PrimaryID schemeID="1" schemeAgencyName="FEC" xmlns="urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:3" >${AgentParty_PrimaryID}</PrimaryID>
              </SupplierParty>
              <EndUserParty xmlns="urn:fec:florecom:xml:data:draft:ReusableAggregateBusinessInformationEntity:6">
                 <PrimaryID xmlns="urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:3" schemeID="1" schemeAgencyName="FEC">TEST</PrimaryID>
              </EndUserParty>
              <Product xmlns="urn:fec:florecom:xml:data:draft:ReusableAggregateBusinessInformationEntity:6">
                 <IndustryAssignedID schemeID="1" schemeAgencyName="VBN">{IndustryAssignedID}</IndustryAssignedID>
                 <SupplierAssignedID>{SupplierAssignedID}</SupplierAssignedID>
                 <DescriptionText languageCode="nl">{DescriptionText}</DescriptionText>
                 <ManufacturerParty>
                  <PrimaryID xmlns="urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:3" schemeID="1" schemeAgencyName="FEC">${ManufacturerCode}</PrimaryID>
               </ManufacturerParty>
              </Product>
              <Quantity xmlns="urn:fec:florecom:xml:data:draft:ReusableAggregateBusinessInformationEntity:6" unitCode="1">{Quantity}</Quantity>
              <Price xmlns="urn:fec:florecom:xml:data:draft:ReusableAggregateBusinessInformationEntity:6">
                 <TypeCode>AE</TypeCode>
                 <NetPriceIndicator>false</NetPriceIndicator>
                
              </Price>
             
              <Delivery xmlns="urn:fec:florecom:xml:data:draft:ReusableAggregateBusinessInformationEntity:6">
                 <DeliveryTerms>
                    <DeliveryTypeCode xmlns="urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:3">DDP</DeliveryTypeCode>
                    <RelevantTradeLocation xmlns="urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:3">
                       <ID schemeID="1" schemeAgencyName="FEC">8714231208747</ID>
                    </RelevantTradeLocation>
                 </DeliveryTerms>
                 <LatestOrderDateTime>${LatestOrderDateTime}</LatestOrderDateTime>
                 <LatestDeliveryDateTime>${LatestDeliveryDateTime}</LatestDeliveryDateTime>
              </Delivery>
           </OrderTradeLineItem>
        </Order>
              </Body>
          </PutOrderRequest>
      </soap:Body>
  </soap:Envelope>`;

      const replacedXML = xmlData
        .replace("{IndustryAssignedID}", industryCode)
        .replace("{SupplierAssignedID}", supplierCode)
        .replace("{DescriptionText}", title)
        .replace("{Quantity}", minqty);

      try {
        const response = await axios.post(
          publicRuntimeConfig.factsApiUrl + "Page/holexputorder",
          {
            containerXml: replacedXML,
          },
          {
            headers: {
              "content-type": "application/json",
            },
          }
        );
        // return await response.data[0].data.products.Table;
        setIsbtnLoaded(false);

        // Split the string by '-'
        const parts = response.data.split("-");

        // Extract the last part after '='
        const lastPart = parts[parts.length - 1];

        // Remove any leading or trailing spaces (if any)
        const trnValue = lastPart.trim().replace("id=", "");
        Cookies.set("trnproductId", trnValue);

        alert(response.data);
      } catch (error) {
        setIsbtnLoaded(false);
        console.error("Error:", error);
      }
    }
    SyncData();
    // });
  };
  const handleCartConfirm = () => {
    async function SyncData() {
      setIsbtnLoaded(true);

      const currentDateTime = new Date();

      // Get the date and time components
      const year = currentDateTime.getFullYear();
      const month = String(currentDateTime.getMonth() + 1).padStart(2, "0");
      const day = String(currentDateTime.getDate()).padStart(2, "0");
      const hours = String(currentDateTime.getHours()).padStart(2, "0");
      const minutes = String(currentDateTime.getMinutes()).padStart(2, "0");
      const seconds = String(currentDateTime.getSeconds()).padStart(2, "0");

      // Get the time zone offset in hours and minutes
      const timeZoneOffsetHours = Math.floor(
        currentDateTime.getTimezoneOffset() / 60
      );
      const timeZoneOffsetMinutes = Math.abs(
        currentDateTime.getTimezoneOffset() % 60
      );

      // Determine the time zone offset string (e.g., +02:00 or -03:30)
      const timeZoneOffsetString =
        (timeZoneOffsetHours >= 0 ? "+" : "-") +
        String(Math.abs(timeZoneOffsetHours)).padStart(2, "0") +
        ":" +
        String(timeZoneOffsetMinutes).padStart(2, "0");

      // Format the date and time string
      const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timeZoneOffsetString}`;

      const xmlData = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
      <soap:Body>
          <PutOrderRequest xmlns="urn:fec:florecom:xml:data:draft:OrderStandardMessage:7" 
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
              <Header xmlns="urn:fec:florecom:xml:data:draft:OrderStandardMessage:7">
                  <MessageID>e6b67c12-8a2b-430a-aad8-a74f3e4afb5e</MessageID>
                  <MessageDateTime>${formattedDateTime}</MessageDateTime>
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
                                  <ID schemeID="1" schemeAgencyName="FEC">${AgentParty_PrimaryID}</ID>
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
        .replace("{IndustryAssignedID}", industryCode)
        .replace("{SupplierAssignedID}", supplierCode)
        .replace("{DescriptionText}", title)
        .replace("{Quantity}", minqty);

      try {
        const response = await axios.post(
          publicRuntimeConfig.factsApiUrl + "Page/holexputorder",
          {
            containerXml: replacedXML,
          },
          {
            headers: {
              "content-type": "application/json",
            },
          }
        );
        // return await response.data[0].data.products.Table;
        setIsbtnLoaded(false);

        // Split the string by '-'
        const parts = response.data.split("-");

        // Extract the last part after '='
        const lastPart = parts[parts.length - 1];

        // Remove any leading or trailing spaces (if any)
        const trnValue = lastPart.trim().replace("id=", "");
        Cookies.set("trnproductId", trnValue);

        alert(response.data);
      } catch (error) {
        setIsbtnLoaded(false);
        console.error("Error:", error);
      }
    }
    SyncData();
    // });
  };

  const handleCartCancel = () => {
    async function SyncData() {
      setIsbtnLoaded(true);

      const currentDateTime = new Date();

      // Get the date and time components
      const year = currentDateTime.getFullYear();
      const month = String(currentDateTime.getMonth() + 1).padStart(2, "0");
      const day = String(currentDateTime.getDate()).padStart(2, "0");
      const hours = String(currentDateTime.getHours()).padStart(2, "0");
      const minutes = String(currentDateTime.getMinutes()).padStart(2, "0");
      const seconds = String(currentDateTime.getSeconds()).padStart(2, "0");

      // Get the time zone offset in hours and minutes
      const timeZoneOffsetHours = Math.floor(
        currentDateTime.getTimezoneOffset() / 60
      );
      const timeZoneOffsetMinutes = Math.abs(
        currentDateTime.getTimezoneOffset() % 60
      );

      // Determine the time zone offset string (e.g., +02:00 or -03:30)
      const timeZoneOffsetString =
        (timeZoneOffsetHours >= 0 ? "+" : "-") +
        String(Math.abs(timeZoneOffsetHours)).padStart(2, "0") +
        ":" +
        String(timeZoneOffsetMinutes).padStart(2, "0");

      // Format the date and time string
      const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timeZoneOffsetString}`;
      let trnproductId = Cookies.get("trnproductId");
      // cartList.map((items, index) => {
      const xmlData = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
      <soap:Body>
          <PutOrderRequest xmlns="urn:fec:florecom:xml:data:draft:OrderStandardMessage:7" 
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
              <Header xmlns="urn:fec:florecom:xml:data:draft:OrderStandardMessage:7">
                  <MessageID>e6b67c12-8a2b-430a-aad8-a74f3e4afb5e</MessageID>
                  <MessageDateTime>${formattedDateTime}</MessageDateTime>
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
                                  <ID schemeID="1" schemeAgencyName="FEC">${AgentParty_PrimaryID}</ID>
                              </MarketPlace>
                              <MarketFormCode>005</MarketFormCode>
                              <TradePeriod>
                                  <StartDateTime>2023-07-21T14:44:37.5+02:00</StartDateTime>
                                  <EndDateTime>2024-05-16T23:59:59+02:00</EndDateTime>
                              </TradePeriod>
                          </TradingTerms>
                          <ReferencedDocument xmlns="urn:fec:florecom:xml:data:draft:ReusableAggregateBusinessInformationEntity:6">
                              <IssuerAssignedID xmlns="urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:3" schemeName="AAG" schemeDataURI="${ID_schemeURI}" schemeURI="${ID_schemeURI}">${ParcelId}</IssuerAssignedID>
                          </ReferencedDocument>
                          <ReferencedDocument xmlns="urn:fec:florecom:xml:data:draft:ReusableAggregateBusinessInformationEntity:6"><IssuerAssignedID schemeName="VN" schemeDataURI="8714231190370" schemeURI="8714231190370" xmlns="urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:3">
                          {transactionId}</IssuerAssignedID></ReferencedDocument>
                          <Product xmlns="urn:fec:florecom:xml:data:draft:ReusableAggregateBusinessInformationEntity:6">
                              <IndustryAssignedID schemeID="1" schemeAgencyName="VBN">{IndustryAssignedID}</IndustryAssignedID>
                              <SupplierAssignedID>{SupplierAssignedID}</SupplierAssignedID>
                              <DescriptionText languageCode="nl">{DescriptionText}</DescriptionText>
                              
                          </Product>
                          <Quantity xmlns="urn:fec:florecom:xml:data:draft:ReusableAggregateBusinessInformationEntity:6" unitCode="3">{Quantity}</Quantity>
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
                          <Status xmlns="urn:fec:florecom:xml:data:draft:ReusableAggregateBusinessInformationEntity:6"><ConditionCode>64</ConditionCode></Status>
                      </OrderTradeLineItem>
                  </Order>
              </Body>
          </PutOrderRequest>
      </soap:Body>
  </soap:Envelope>`;

      const replacedXML = xmlData
        .replace("{IndustryAssignedID}", industryCode)
        .replace("{SupplierAssignedID}", supplierCode)
        .replace("{DescriptionText}", title)
        .replace("{Quantity}", "0")
        .replace("{transactionId}", trnproductId);

      try {
        const response = await axios.post(
          publicRuntimeConfig.factsApiUrl + "Page/holexputordercancel",
          {
            containerXml: replacedXML,
          },
          {
            headers: {
              "content-type": "application/json",
            },
          }
        );
        // return await response.data[0].data.products.Table;
        setIsbtnLoaded(false);
        alert(response.data);
      } catch (error) {
        setIsbtnLoaded(false);
        console.error("Error:", error);
      }
    }
    SyncData();
    // });
  };

  const handleConfirmOrder = () => {
    async function SyncData() {
      try {
        console.log("start");

        const response = await axios.post(
          apiurl,
          {
            containerId: ["confirmcart"],
            strStockCode: id,
          },
          {
            headers: {
              "content-type": "application/json",
            },
          }
        );
        alert(JSON.stringify(response.data[0].data.getcart.Table[0]));
        console.log(response.data[0].data.getcart.Table[0]);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    SyncData();
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
            {/* <CarouselProvider
              visibleSlides={1}
              totalSlides={1}
              currentSlide={currentSlide}
              step={2}
              naturalSlideWidth={200}
              naturalSlideHeight={300}
              hasMasterSpinner
              infinite
            >
              <div className={compStyling.container}>
                <Slider className={compStyling.slider}>
                  <Slide>
                    <ImageWithZoom key={1} src={thumbnail} />
                  </Slide>
                </Slider>
              </div>
            </CarouselProvider> */}
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

          {/* <FlexBox alignItems="center" mb={2}>
            <Box lineHeight="1">Rated:</Box>
            <Box mx={1} lineHeight="1">
              <BazaarRating
                color="warn"
                fontSize="1.25rem"
                value={4}
                readOnly
              />
            </Box>
      
          </FlexBox> */}

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
          <LoadingButton
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
          </LoadingButton>

          {/*  Call Put Order API for 10 Stems <LoadingButton
            color="primary"
            variant="contained"
            onClick={handleConfirmOrder}
            sx={{
              px: "1.75rem",
              height: 40,
            }}
            loading={isbtnLoading}
          >
            Get Order Status
          </LoadingButton> */}
        </Grid>
      </Grid>
    </Box>
  );
};
export default ProductIntroold;
