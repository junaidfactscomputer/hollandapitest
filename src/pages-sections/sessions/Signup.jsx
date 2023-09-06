import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Button,
  Checkbox,
  Box,
  FormControlLabel,
  MenuItem,
  TextField,
  Grid,
} from "@mui/material";
import Link from "next/link";
import * as yup from "yup";
import { useFormik } from "formik";
import { FlexBox, FlexRowCenter } from "components/flex-box";
import { H1, H6 } from "components/Typography";
import BazaarImage from "components/BazaarImage";
import BazaarTextField from "components/BazaarTextField";
import { Wrapper } from "./Login";
import SocialButtons from "./SocialButtons";
import EyeToggleButton from "./EyeToggleButton";
import countryList from "data/countryList";
import { registerCustomer, getPostalcode } from "utils/__api__/users";
import { Small } from "components/Typography";
import { useSnackbar } from "notistack";
import Card1 from "components/Card1";

const Signup = () => {
  const [SocialButtonsVisible, setSocialButtonsVisibility] = useState(false);
  const [loginerror, SetLoginerror] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [countryCode, setcountryCode] = useState("UK");
  const [toggleFormFlag, settoggleFormFlag] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (countryCode == "") {
      settoggleFormFlag("0");
    } else if (countryCode == "UK") {
      settoggleFormFlag("1");
    } else {
      settoggleFormFlag("2");
    }
  }, [countryCode]);

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);

  const handleBlurPostCode = async (e) => {
    try {
      const res = await getPostalcode(e.target.value);
      console.log(res);
      if (res) {
        enqueueSnackbar(res, {
          variant: "success",
        });
      }
      if (res.error) {
        // e.target.value = "";
      }
    } catch (err) {
      if (countryCode === "UK") {
        enqueueSnackbar("Invalid postal code", {
          variant: "error",
        });
        // e.target.value = "";
      }

      // e.target.value = "";
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      const res = await registerCustomer(values);
      if (res) {
        console.log(res);
        enqueueSnackbar("Account Created successfully", {
          variant: "success",
        });
        let data = {
          useremail: res[0].Email,
        };
        fetch("/api/signupconfirm", {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then((res) => {
          if (res.status === 200) {
            router.push("/login");
          }
        });

        router.push("/login");
      }
      // if (res.error) {
      //   SetLoginerror(res.error);
      //   enqueueSnackbar(res.error, {
      //     variant: "error",
      //   });
      // }
    } catch (err) {
      enqueueSnackbar("User Already Exist / Please enter valid inputs", {
        variant: "error",
      });
      router.push("/signup");
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: handleFormSubmit,
      validationSchema: formSchema,
    });
  return (
    <Grid container flexWrap="wrap-reverse" spacing={3}>
      <Grid item lg={12} md={12} xs={12}>
        <form onSubmit={handleSubmit}>
          <Card1
            sx={{
              mb: 4,
            }}
          >
            <BazaarImage
              src="/assets/images/logostr.png"
              sx={{
                m: "auto",
              }}
            />

            <H1 textAlign="center" mt={1} mb={4} fontSize={16}>
              Create Your Account
            </H1>

            <Grid container spacing={1}>
              <Grid item sm={6} xs={12}>
                <BazaarTextField
                  mb={1.5}
                  fullWidth
                  name="first_name"
                  size="small"
                  label="First Name"
                  variant="outlined"
                  onBlur={handleBlur}
                  value={values.first_name}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  error={!!touched.first_name && !!errors.first_name}
                  helperText={touched.first_name && errors.first_name}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <BazaarTextField
                  mb={1.5}
                  fullWidth
                  name="last_name"
                  size="small"
                  label="Last Name"
                  variant="outlined"
                  onBlur={handleBlur}
                  value={values.last_name}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  error={!!touched.last_name && !!errors.last_name}
                  helperText={touched.last_name && errors.last_name}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <BazaarTextField
                  mb={1.5}
                  fullWidth
                  name="email"
                  size="small"
                  type="email"
                  variant="outlined"
                  onBlur={handleBlur}
                  value={values.email}
                  onChange={handleChange}
                  label="Email"
                  placeholder="Enter your email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
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
                    setcountryCode(e.target.value);
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
              <Grid item sm={6} xs={12}>
                <BazaarTextField
                  mb={1.5}
                  fullWidth
                  size="small"
                  name="password"
                  label="Password"
                  variant="outlined"
                  autoComplete="on"
                  placeholder="Enter your password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  type={passwordVisibility ? "text" : "password"}
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  InputProps={{
                    endAdornment: (
                      <EyeToggleButton
                        show={passwordVisibility}
                        click={togglePasswordVisibility}
                      />
                    ),
                  }}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <BazaarTextField
                  mb={1.5}
                  fullWidth
                  size="small"
                  autoComplete="on"
                  name="re_password"
                  variant="outlined"
                  label="Retype Password"
                  placeholder="Retype your password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.re_password}
                  type={passwordVisibility ? "text" : "password"}
                  error={!!touched.re_password && !!errors.re_password}
                  helperText={touched.re_password && errors.re_password}
                  InputProps={{
                    endAdornment: (
                      <EyeToggleButton
                        show={passwordVisibility}
                        click={togglePasswordVisibility}
                      />
                    ),
                  }}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                {" "}
                <BazaarTextField
                  mb={1.5}
                  fullWidth
                  name="house_no"
                  size="small"
                  label="Building No./Name"
                  variant="outlined"
                  onBlur={handleBlur}
                  value={values.house_no}
                  onChange={handleChange}
                  placeholder="Enter your Building No./Name"
                  error={!!touched.house_no && !!errors.house_no}
                  helperText={touched.house_no && errors.house_no}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                {" "}
                <BazaarTextField
                  mb={1.5}
                  fullWidth
                  name="address1"
                  size="small"
                  label="Address Line 2"
                  variant="outlined"
                  onBlur={handleBlur}
                  value={values.address1}
                  onChange={handleChange}
                  placeholder="Enter your Address Line 2"
                  error={!!touched.address1 && !!errors.address1}
                  helperText={touched.address1 && errors.address1}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                {" "}
                <BazaarTextField
                  mb={1.5}
                  fullWidth
                  name="address2"
                  size="small"
                  label="Address Line 3"
                  variant="outlined"
                  onBlur={handleBlur}
                  value={values.address2}
                  onChange={handleChange}
                  placeholder="Enter your Address Line 3"
                  error={!!touched.address2 && !!errors.address2}
                  helperText={touched.address2 && errors.address2}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <BazaarTextField
                  mb={1.5}
                  fullWidth
                  name="main_phone"
                  type="tel"
                  size="small"
                  label="Main Phone Number"
                  variant="outlined"
                  onBlur={handleBlur}
                  value={values.main_phone}
                  onChange={handleChange}
                  placeholder="Enter your main phone number"
                  error={!!touched.main_phone && !!errors.main_phone}
                  helperText={touched.main_phone && errors.main_phone}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <BazaarTextField
                  mb={1.5}
                  fullWidth
                  name="alternate_phone"
                  type="tel"
                  size="small"
                  label="Alternate Phone Number"
                  variant="outlined"
                  onBlur={handleBlur}
                  value={values.alternate_phone}
                  onChange={handleChange}
                  placeholder="Enter your alternate phone number"
                  error={!!touched.alternate_phone && !!errors.alternate_phone}
                  helperText={touched.alternate_phone && errors.alternate_phone}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <BazaarTextField
                  mb={1.5}
                  fullWidth
                  name="town"
                  size="small"
                  label="Town"
                  variant="outlined"
                  onBlur={handleBlur}
                  value={values.town}
                  onChange={handleChange}
                  placeholder="Enter your town"
                  error={!!touched.town && !!errors.town}
                  helperText={touched.town && errors.town}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <BazaarTextField
                  mb={1.5}
                  fullWidth
                  name="county"
                  size="small"
                  label="County"
                  variant="outlined"
                  onBlur={handleBlur}
                  value={values.county}
                  onChange={handleChange}
                  placeholder="Enter your County"
                  error={!!touched.county && !!errors.county}
                  helperText={touched.county && errors.county}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <BazaarTextField
                  mb={1.5}
                  fullWidth
                  name="post_code"
                  size="small"
                  label="Post Code"
                  variant="outlined"
                  onBlur={handleBlurPostCode}
                  value={values.post_code}
                  onChange={handleChange}
                  placeholder="Enter your post code"
                  error={!!touched.post_code && !!errors.post_code}
                  helperText={touched.post_code && errors.post_code}
                />
              </Grid>

              {/* {toggleFormFlag == 1 ? (
                <>
                  
                  <Grid item sm={6} xs={12}>
                    {" "}
                    <BazaarTextField
                      mb={1.5}
                      fullWidth
                      name="post_code"
                      size="small"
                      label="Post Code"
                      variant="outlined"
                      onBlur={handleBlurPostCode}
                      value={values.post_code}
                      onChange={handleChange}
                      placeholder="Enter your post code"
                      error={!!touched.post_code && !!errors.post_code}
                      helperText={touched.post_code && errors.post_code}
                    />
                  </Grid>
                 
                </>
              ) : (
                <></>
              )}
              {toggleFormFlag == 2 ? (
                <>
                  
                  <Grid item sm={6} xs={12}>
                    {" "}
                    <BazaarTextField
                      mb={1.5}
                      fullWidth
                      name="address"
                      size="small"
                      label="Complete Address"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.address}
                      onChange={handleChange}
                      placeholder="Enter your complete address"
                      error={!!touched.address && !!errors.address}
                      helperText={touched.address && errors.address}
                    />
                  </Grid>
                 
                 
                </>
              ) : (
                <></>
              )} */}
            </Grid>

            <FormControlLabel
              name="agreement"
              className="agreement"
              onChange={handleChange}
              control={
                <Checkbox
                  size="small"
                  color="secondary"
                  checked={values.agreement || false}
                />
              }
              label={
                <FlexBox
                  flexWrap="wrap"
                  alignItems="center"
                  justifyContent="flex-start"
                >
                  By signing up, you agree to
                  <a
                    href="http://rupalionline.info/TermsandConditions.aspx"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
                      Terms & Condition
                    </H6>
                  </a>
                </FlexBox>
              }
            />

            <Button
              fullWidth
              type="submit"
              color="primary"
              variant="contained"
              sx={{
                height: 44,
              }}
            >
              Create Account
            </Button>
          </Card1>
        </form>

        {() => {
          if (SocialButtonsVisible) {
            <SocialButtons />;
          }
        }}

        <FlexRowCenter mt="1.25rem">
          <Box>Already have an account?</Box>
          <Link href="/login" passHref legacyBehavior>
            <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
              Login
            </H6>
          </Link>
        </FlexRowCenter>

        {/* <BazaarTextField mb={1.5} select fullWidth size="small" autoComplete="on" name="country" variant="outlined" label="Select Country" 
        placeholder="Please select your country" onBlur={handleBlur} onChange={(e)=>{
        setcountryCode(e.target.value)
        handleChange(e);
        }
         
        } 
        value={values.country}
        SelectProps={{
          multiple: false
        }} error={!!touched.country && !!errors.country} helperText={touched.country && errors.country}>
          {
              countryList.map((country)=>{
                return <MenuItem value={country.value}>{country.label}</MenuItem>
              }
              )
          }
        </BazaarTextField> */}
      </Grid>
    </Grid>

    // <Wrapper elevation={3} passwordVisibility={passwordVisibility}>

    // </Wrapper>
  );
};
const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  re_password: "",
  country: "UK",
  house_no: "",
  post_code: "",
  main_phone: "",
  alternate_phone: "",
  address1: "",
  address2: "",
  town: "",
  county: "",
  agreement: false,
};
const formSchema = yup.object().shape({
  first_name: yup.string().required("Name is required"),
  last_name: yup.string().required("Last Name is required"),
  email: yup.string().email("invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  re_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please re-type password"),
  country: yup.string().required("Country is required"),
  house_no: yup.string().required("Required Field"),
  post_code: yup.string().required("Postal code is required"),
  main_phone: yup.string().required("Main Phone is required"),
  alternate_phone: yup.string(),
  address1: yup.string().required("Address is required"),
  town: yup.string(),
  county: yup.string(),
  agreement: yup
    .bool()
    .test(
      "agreement",
      "You have to agree with our Terms and Conditions!",
      (value) => value === true
    )
    .required("You have to agree with our Terms and Conditions!"),
});

export default Signup;
