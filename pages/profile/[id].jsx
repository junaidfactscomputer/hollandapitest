//import Link from "next/link";
import { useRouter } from "next/router";
import { Formik } from "formik";
import * as yup from "yup";
import {
  CameraEnhance,
  Label,
  LabelOffOutlined,
  Person,
} from "@mui/icons-material";
import { Avatar, Box, Button, Grid, TextField, MenuItem } from "@mui/material";
// import { DatePicker } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Card1 from "components/Card1";
import { FlexBox } from "components/flex-box";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import api from "utils/__api__/users";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useSession } from "next-auth/react";
import { H5, Small } from "components/Typography";
import countryList from "data/countryList";
import { updateCustomer, getPostalcode } from "utils/__api__/users";
import { useSnackbar } from "notistack";
//import { getSession } from "next-auth/client";
// ===========================================================

const ProfileEditor = ({ user }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const { redirect } = router.query;
  const { enqueueSnackbar } = useSnackbar();
  const INITIAL_VALUES = {
    userid: user.OCM_DOCNO || "",
    email: user.OCM_EMAIL || "",
    contact: user.OCM_MAIN_PHONE || "",
    contact2: user.OCM_ALTERNATIVE_PHONE || "",
    address: user.OCM_BTO_ADDRESS1 || "",
    address2: user.OCM_BTO_ADDRESS2 || "",
    address3: user.OCM_BTO_ADDRESS3 || "",
    first_name: user.OCM_BTO_FIRST_NAME || "",
    last_name: user.OCM_BTO_LAST_NAME || "",
    post_code: user.OCM_BTO_POST_CODE || "",
    city: user.OCM_BTO_CITY || "",
    county: user.OCM_BTO_PROVINCE_STATE || "",
    country: user.OCM_BTO_COUNTRY || "",
    // birth_date: user.dateOfBirth || new Date(),
  };
  const checkoutSchema = yup.object().shape({
    first_name: yup.string().required("required"),
    address: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    contact: yup.string().required("required"),
    country: yup.string().required("required"),
    address: yup.string().required("Building No./Name is required"),
    post_code: yup.string().required("Postal code is required"),
    contact: yup.string(),
    contact2: yup.string(),
    city: yup.string(),
    county: yup.string().required("required"),
    //birth_date: yup.date().required("invalid date"),
  });

  useEffect(() => {
    if (!session?.user) {
      Cookies.set("_redurl", "/");
      router.push(redirect || "/login");
    }
    // else {
    //   async function fetchData() {
    //     try {
    //       const cartId = session.user._id;
    //       const response = await api.getUser(cartId);
    //       if (response) {
    //         const useradd = response.getuserdetails;

    //         setuserAddress(useradd[0]);
    //       }
    //     } catch (error) {
    //       console.error("Error:", error);
    //     }
    //   }
    //   fetchData();
    // }
  }, [router, session, redirect]);

  const handleFormSubmit = async (values) => {
    try {
      const res = updateCustomer(values);
      if (res) {
        enqueueSnackbar("Address Details updated", {
          variant: "success",
        });
        //router.push("/login");
      }
      if (res.error) {
        // SetLoginerror(res.error);
        enqueueSnackbar(res.error, {
          variant: "error",
        });
      }
    } catch (err) {
      enqueueSnackbar("unknown error occured", {
        variant: "error",
      });
    }
  };

  // SECTION TITLE HEADER LINK
  // const HEADER_LINK = (
  //   <Link href="/profile" passHref>
  //     <Button
  //       color="primary"
  //       sx={{
  //         px: 4,
  //         bgcolor: "primary.light",
  //       }}
  //     >
  //       Back to Profile
  //     </Button>
  //   </Link>
  // );

  // Show a loading state when the fallback is rendered
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  return (
    <CustomerDashboardLayout>
      {/* TITLE HEADER AREA */}
      <UserDashboardHeader
        icon={Person}
        title="Edit Profile"
        // button={HEADER_LINK}
        navigation={<CustomerDashboardNavigation />}
      />

      {/* PROFILE EDITOR FORM */}
      <Card1>
        <FlexBox alignItems="flex-end" mb={3}>
          {/* <Avatar
            src="/assets/images/avatars/001-man.svg"
            sx={{
              height: 64,
              width: 64,
            }}
          /> */}

          {/* <Box ml={-2.5}>
            <label htmlFor="profile-image">
              <Button
                component="span"
                color="secondary"
                sx={{
                  p: "8px",
                  height: "auto",
                  bgcolor: "grey.300",
                  borderRadius: "50%",
                }}
              >
                <CameraEnhance fontSize="small" />
              </Button>
            </label>
          </Box> */}

          <Box display="none">
            <input
              onChange={(e) => console.log(e.target.files)}
              id="profile-image"
              accept="image/*"
              type="file"
            />
          </Box>
        </FlexBox>

        <Formik
          onSubmit={handleFormSubmit}
          initialValues={INITIAL_VALUES}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box mb={4}>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <H5 color="info.main" mb={0.5}>
                      Email : {values.email}
                    </H5>
                    {/* <TextField
                      fullWidth
                      disabled
                      name="email"
                      type="email"
                      label="Email"
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                    />*/}
                  </Grid>
                  <Grid item md={6} xs={12}></Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      name="first_name"
                      label="First Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.first_name}
                      error={!!touched.first_name && !!errors.first_name}
                      helperText={touched.first_name && errors.first_name}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      name="last_name"
                      label="Last Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.last_name}
                      error={!!touched.last_name && !!errors.last_name}
                      helperText={touched.last_name && errors.last_name}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      name="address"
                      label="Building No./Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.address}
                      error={!!touched.address && !!errors.address}
                      helperText={touched.address && errors.address}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Main Phone No."
                      name="contact"
                      onBlur={handleBlur}
                      value={values.contact}
                      onChange={handleChange}
                      error={!!touched.contact && !!errors.contact}
                      helperText={touched.contact && errors.contact}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Alternate Phone No."
                      name="contact2"
                      onBlur={handleBlur}
                      value={values.contact2}
                      onChange={handleChange}
                      error={!!touched.contact2 && !!errors.contact2}
                      helperText={touched.contact2 && errors.contact2}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      name="address2"
                      label="Address Line 1"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.address2}
                      error={!!touched.address2 && !!errors.address2}
                      helperText={touched.address2 && errors.address2}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      name="address3"
                      label="Address Line 2"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.address3}
                      error={!!touched.address3 && !!errors.address3}
                      helperText={touched.address3 && errors.address3}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      name="city"
                      label="Address Line 3"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.city}
                      error={!!touched.city && !!errors.city}
                      helperText={touched.city && errors.city}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      name="county"
                      label="County"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.county}
                      error={!!touched.county && !!errors.county}
                      helperText={touched.county && errors.county}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      name="post_code"
                      label="Post Code"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.post_code}
                      error={!!touched.post_code && !!errors.post_code}
                      helperText={touched.post_code && errors.post_code}
                    />
                  </Grid>
                  {/* <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      name="country"
                      label="Country"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.country}
                      error={!!touched.country && !!errors.country}
                      helperText={touched.country && errors.country}
                    />
                  </Grid> */}
                  <Grid item md={6} xs={12}>
                    <Small
                      display="block"
                      mb={1}
                      textAlign="left"
                      fontWeight="600"
                      color="grey.700"
                    >
                      Select Country
                    </Small>
                    <TextField
                      mb={1.5}
                      select
                      fullWidth
                      size="small"
                      autoComplete="on"
                      name="country"
                      placeholder="Please select your country"
                      value={values.country}
                      onBlur={handleBlur}
                      onChange={(e) => {
                        // setcountryCode(e.target.value);
                        handleChange(e);
                      }}
                      SelectProps={{
                        multiple: false,
                        style: {
                          height: 44,
                        },
                      }}
                      error={!!touched.country && !!errors.country}
                      helperText={touched.country && errors.country}
                    >
                      {countryList.map((country, index) => {
                        return (
                          <MenuItem key={index} value={country.value}>
                            {country.label}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                  </Grid>

                  {/* <Grid item md={6} xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Birth Date"
                        maxDate={new Date()}
                        value={values.birth_date}
                        inputFormat="dd MMMM, yyyy"
                        renderInput={(props) => (
                          <TextField
                            fullWidth
                            size="small"
                            helperText={touched.birth_date && errors.birth_date}
                            error={
                              (!!touched.birth_date && !!errors.birth_date) ||
                              props.error
                            }
                            {...props}
                          />
                        )}
                        onChange={(newValue) =>
                          setFieldValue("birth_date", newValue)
                        }
                      />
                    </LocalizationProvider>
                  </Grid> */}
                </Grid>
              </Box>

              <Button type="submit" variant="contained" color="primary">
                Save Changes
              </Button>
            </form>
          )}
        </Formik>
      </Card1>
    </CustomerDashboardLayout>
  );
};
export async function getServerSideProps(context) {
  const response = await api.getUser(context.params.id);
  const useradd = response.getuserdetails[0];

  return {
    props: {
      user: useradd,
    },
  };
}

export default ProfileEditor;
