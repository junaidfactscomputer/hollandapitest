/* eslint-disable react-hooks/exhaustive-deps */
import { DeleteOutline, ModeEditOutline } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Grid,
  MenuItem,
  Typography,
} from "@mui/material";
//import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
//import TextField from "@mui/material/TextField";
import Card1 from "components/Card1";
import { FlexBetween, FlexBox } from "components/flex-box";
//import LazyImage from "components/LazyImage";
import { H6, Paragraph } from "components/Typography";
//import { months, years } from "data/months-years";
//import { format } from "date-fns";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as yup from "yup";
import EditAddressForm from "./EditAddressForm";
//import NewAddressForm from "./NewAddressForm";
//import PayOpayoDirect from "pages-sections/checkout/PayOpayoDirect";

// ====================================================================
// date types

// ====================================================================

const Heading = ({ number, title }) => {
  return (
    <FlexBox gap={1.5} alignItems="center" mb={3.5}>
      <Avatar
        sx={{
          width: 32,
          height: 32,
          color: "primary.text",
          backgroundColor: "primary.main",
        }}
      >
        {number}
      </Avatar>
      <Typography fontSize="20px">{title}</Typography>
    </FlexBox>
  );
};
const CheckoutForm2 = ({ userAddress }) => {
  const router = useRouter();
  const [hasVoucher, setHasVoucher] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [dateList, setDateList] = useState([]);

  const [addressData, setAddressData] = useState(userAddress);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [selected, setSelected] = useState(false);

  const handleFormSubmit = async (values) => {
    router.push("/payment");
  };
  const handleFieldValueChange = (value, fieldName, setFieldValue) => () => {
    setFieldValue(fieldName, value);
  };

  const toggleHasVoucher = () => setHasVoucher((has) => !has);
  useEffect(() => {
    // let list = [];
    // let today = new Date();
    // let dateCount = today.getDate();
    // list.push({
    //   label: format(today, "dd MMMM"),
    //   value: today.toISOString(),
    // });
    // for (let i = 1; i < 10; i++) {
    //   today.setDate(dateCount + i);
    //   list.push({
    //     label: format(today, "dd MMMM"),
    //     value: today.toISOString(),
    //   });
    // }
    // setDateList(list);
    // setAddressData(userAddress);
  }, []);

  useEffect(() => {
    if (newAddress !== "") setAddressData([newAddress, ...addressData]);
    else setAddressData(userAddress);
  }, [newAddress]);

  const deleteAddress = (name) => {
    const newArr = addressData.filter((item) => item.OCM_DOCNO !== name);
    setAddressData(newArr);
  };
  const editHandlerOld = (value) => {
    const data = addressData.find((item) => item.OCM_DOCNO === value);
    //console.log(data);
    setSelected(true);
    openEditForm ? setOpenEditForm(false) : setOpenEditForm(true);
  };

  const editHandler = (value) => {
    router.push("/profile/" + userAddress[0].OCM_DOCNO);
  };

  const initialValues = {
    // card: "",
    // date: "",
    // time: "",
    address: "",
    voucher: "",
    // cardHolderName: "",
    // cardNumber: "",
    // cardMonth: "",
    // cardYear: "",
    // cardCVC: "",
  };
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={checkoutSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          {/* <Card1 sx={{
        mb: 3
      }}>
            <Heading number={1} title="Delivery Date and Time" />

            <Box mb={3.5}>
              <Grid container spacing={3}>
                <Grid item sm={6} xs={12}>
                  <TextField select fullWidth type="text" name="date" label="Delivery Date" onChange={handleChange} value={values.date} error={!!touched.date && !!errors.date} helperText={touched.date && errors.date}>
                    {dateList.map(item => <MenuItem value={item.value} key={item.label}>
                        {item.label}
                      </MenuItem>)}
                  </TextField>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField select fullWidth type="text" name="time" label="Delivery Time" onChange={handleChange} value={values.time} error={!!touched.time && !!errors.time} helperText={touched.time && errors.time}>
                    {timeList.map(item => <MenuItem value={item.value} key={item.value}>
                        {item.value}
                      </MenuItem>)}
                  </TextField>
                </Grid>
              </Grid>
            </Box>
          </Card1> */}

          <Card1
            sx={{
              mb: 3,
            }}
          >
            <FlexBetween>
              <Heading number={1} title="Delivery Address" />
              
              {/* <NewAddressForm setNewAddress={setNewAddress} /> */}
            </FlexBetween>

            {/* <Typography mb={1.5}>Delivery Address</Typography> */}
            <Grid container spacing={3}>
              {userAddress.map((item, ind) => (
                <Grid item md={6} sm={6} xs={12} key={ind}>
                  <Card
                    sx={{
                      padding: 2,
                      boxShadow: "none",
                      cursor: "pointer",
                      border: "1px solid",
                      position: "relative",
                      backgroundColor: "grey.100",
                      borderColor:
                        item.OCM_BTO_ADDRESS1 === values.address
                          ? "primary.main"
                          : "transparent",
                    }}
                    onClick={handleFieldValueChange(
                      item.street1,
                      "address",
                      setFieldValue
                    )}
                  >
                    <FlexBox
                      justifyContent="flex-end"
                      sx={{
                        position: "absolute",
                        top: 5,
                        right: 5,
                      }}
                    >
                      {selected && (
                        <EditAddressForm
                          selected={selected}
                          addressData={userAddress}
                          openEditForm={openEditForm}
                          setOpenEditForm={setOpenEditForm}
                          setAddressData={setAddressData}
                        />
                      )}

                      <IconButton
                        size="small"
                        sx={{
                          mr: 1,
                        }}
                        onClick={() => editHandler(item.OCM_DOCNO)}
                      >
                        <ModeEditOutline
                          sx={{
                            fontSize: 20,
                          }}
                        />
                      </IconButton>
                      {/* <IconButton
                        size="small"
                        color="error"
                        onClick={() => deleteAddress(item.OCM_BTO_FIRST_NAME)}
                      >
                        <DeleteOutline
                          sx={{
                            fontSize: 20,
                          }}
                        />
                      </IconButton> */}
                    </FlexBox>

                    <H6 mb={0.5}>
                      {item.OCM_BTO_FIRST_NAME} {item.OCM_BTO_LAST_NAME}
                    </H6>

                    {item.OCM_BTO_CITY && (
                      <Paragraph color="grey.700">
                        {item.OCM_BTO_ADDRESS1} {item.OCM_BTO_ADDRESS2}{" "}
                        {item.OCM_BTO_CITY}
                      </Paragraph>
                    )}
                    <Paragraph color="grey.700">
                      {item.OCM_MAIN_PHONE} ,Postal code:
                      {item.OCM_BTO_POST_CODE} ,{item.CM_DESC}
                    </Paragraph>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Card1>

          {/* <Card1
            sx={{
              mb: 2,
            }}
          > */}
            {/* <Heading number={3} title="Payment Details" /> */}

            {/* <Box mb={3.5}>
              <Typography mb={1.5}>Enter Card Information</Typography>
              <Grid container spacing={3}>
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    type="text"
                    name="cardHolderName"
                    onChange={handleChange}
                    label="Enter Your Name"
                    value={values.cardHolderName}
                    error={!!touched.cardHolderName && !!errors.cardHolderName}
                    helperText={touched.cardHolderName && errors.cardHolderName}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    type="number"
                    name="cardNumber"
                    onChange={handleChange}
                    label="Enter Your Card Number"
                    value={values.cardNumber}
                    error={!!touched.cardNumber && !!errors.cardNumber}
                    helperText={touched.cardNumber && errors.cardNumber}
                  />
                </Grid>
                <Grid item sm={12} xs={12}>
                  <Box display="flex" justifyContent="space-between">
                    <TextField
                      select
                      fullWidth
                      type="number"
                      name="cardMonth"
                      onChange={handleChange}
                      label="Expire Card Month"
                      value={values.cardMonth}
                      error={!!touched.cardMonth && !!errors.cardMonth}
                      helperText={touched.cardMonth && errors.cardMonth}
                    >
                      {months.map((item) => (
                        <MenuItem value={item} key={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      select
                      fullWidth
                      type="number"
                      name="cardYear"
                      onChange={handleChange}
                      label="Expire Card Year"
                      value={values.cardYear}
                      error={!!touched.cardYear && !!errors.cardYear}
                      helperText={touched.cardYear && errors.cardYear}
                      sx={{
                        mx: 3,
                      }}
                    >
                      {years.map((item) => (
                        <MenuItem value={item} key={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      fullWidth
                      type="number"
                      name="cardCVC"
                      label="CVC/CVV"
                      onChange={handleChange}
                      value={values.cardCVC}
                      error={!!touched.cardCVC && !!errors.cardCVC}
                      helperText={touched.cardCVC && errors.cardCVC}
                    />
                  </Box>
                </Grid>
              </Grid>
              <FormControlLabel
                sx={{
                  mt: 1,
                }}
                control={<Checkbox />}
                label="Save this card"
              />
            </Box>

            <Box>
              <Typography mb={1.5}>Saved Cards</Typography>

              <Grid container spacing={3}>
                {paymentMethodList.map((item) => (
                  <Grid item md={4} sm={6} xs={12} key={item.last4Digits}>
                    <Card
                      sx={{
                        padding: 2,
                        boxShadow: "none",
                        cursor: "pointer",
                        border: "1px solid",
                        backgroundColor: "grey.100",
                        borderColor:
                          item.last4Digits === values.card
                            ? "primary.main"
                            : "transparent",
                      }}
                      onClick={handleFieldValueChange(
                        item.last4Digits,
                        "card",
                        setFieldValue
                      )}
                    >
                      <Box height={24} width={36} position="relative" mb={1}>
                        <LazyImage
                          layout="fill"
                          alt={item.name}
                          objectFit="contain"
                          src={`/assets/images/payment-methods/${item.cardType}.svg`}
                        />
                      </Box>

                      <Paragraph color="grey.700">
                        **** **** **** {item.last4Digits}
                      </Paragraph>
                      <Paragraph color="grey.700">{item.name}</Paragraph>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box> */}

            {/* <Button
              sx={{
                color: "primary.main",
                mt: 3,
                lineHeight: 1,
              }}
              onClick={toggleHasVoucher}
            >
              I have a voucher
            </Button>

            {hasVoucher && (
              <FlexBox mt={3} gap={2} maxWidth="400px">
                <TextField
                  fullWidth
                  name="voucher"
                  value={values.voucher}
                  onChange={handleChange}
                  placeholder="Enter voucher code here"
                />
                <Button variant="contained" color="primary" type="button">
                  Apply
                </Button>
              </FlexBox>
            )} */}

            {/* <PayOpayoDirect /> */}
          {/* </Card1> */}
        </form>
      )}
    </Formik>
  );
};
// const addressList2 = [
//   {
//     name: "Home",
//     phone: "+17804084466",
//     street2: "435 Bristol, MA 2351",
//     street1: "375 Subidbazaar, MA 2351",
//   },
//   {
//     name: "Office",
//     phone: "+18334271710",
//     street2: "968 Brockton, MA 2351",
//     street1: "645 Bondorbazaar, MA 2351",
//   },
//   {
//     name: "Office 2",
//     phone: "+17754739407",
//     street2: "777 Kazi, MA 2351",
//     street1: "324 Ambarkhana, MA 2351",
//   },
// ];
// const paymentMethodList = [
//   {
//     cardType: "Amex",
//     last4Digits: "4765",
//     name: "Jaslynn Land",
//   },
//   {
//     cardType: "Mastercard",
//     last4Digits: "5432",
//     name: "Jaslynn Land",
//   },
// ];
// const timeList = [
//   {
//     label: "9AM - 11AM",
//     value: "9AM - 11AM",
//   },
//   {
//     label: "11AM - 1PM",
//     value: "11AM - 1PM",
//   },
// ];
const checkoutSchema = yup.object().shape({
  // card: yup.string().required("required"),
  // date: yup.string().required("required"),
  // time: yup.string().required("required"),
  address: yup.string().required("required"),
  //  cardHolderName: yup.string().required("required"),
  // cardNumber: yup.number().required("required"),
  // cardMonth: yup.string().required("required"),
  // cardYear: yup.number().required("required"),
  // cardCVC: yup.number().required("required"),
  voucher: yup.string(),
});

export default CheckoutForm2;
