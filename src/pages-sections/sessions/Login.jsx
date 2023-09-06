import { useCallback, useEffect, useState } from "react";
import { signIn, useSession, getProviders } from "next-auth/react";
//import { getToken } from "next-auth/jwt";
import { Button, Card, Box, styled } from "@mui/material";
import Link from "next/link";
import * as yup from "yup";
import { useFormik } from "formik";
import { H1, H6 } from "components/Typography";
//import BazaarImage from "components/BazaarImage";
import BazaarTextField from "components/BazaarTextField";
import SocialButtons from "./SocialButtons";
import EyeToggleButton from "./EyeToggleButton";
import { FlexBox, FlexRowCenter } from "components/flex-box";
import { useRouter } from "next/router";
import { getuserCookie } from "lib";
import { useSnackbar } from "notistack";
import { red } from "@mui/material/colors";
import Cookies from "js-cookie";
import { useAppContext } from "contexts/AppContext";
import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const apiurl = publicRuntimeConfig.factsApiUrl + "Page/getopensection";
const fbStyle = {
  background: "#3B5998",
  color: "white",
};
const googleStyle = {
  background: "#4285F4",
  color: "white",
};
export const Wrapper = styled(({ children, passwordVisibility, ...rest }) => (
  <Card {...rest}>{children}</Card>
))(({ theme, passwordVisibility }) => ({
  width: 500,
  padding: "2rem 3rem",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
  ".passwordEye": {
    color: passwordVisibility
      ? theme.palette.grey[600]
      : theme.palette.grey[400],
  },
  ".facebookButton": {
    marginBottom: 10,
    ...fbStyle,
    "&:hover": fbStyle,
  },
  ".googleButton": {
    ...googleStyle,
    "&:hover": googleStyle,
  },
  ".agreement": {
    marginTop: 12,
    marginBottom: 24,
  },
}));

const Login = () => {
  const { data: session } = useSession();
  const { state, dispatch } = useAppContext();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [loginerror, SetLoginerror] = useState("");
  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);
  const { enqueueSnackbar } = useSnackbar();
  // const handleFormSubmit = async (values) => {
  //   console.log(values);
  // };

  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();
  //   await signIn("credentials", {
  //     redirect: true,
  //     email: values.email,
  //     password: values.password,
  //   });
  // };
  const cartId = getuserCookie();
  const handleFormSubmit = async ({ email, password }) => {
    try {
      const cart = state.cart;
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
        cartId: cartId,
      });

      if (result.error) {
        SetLoginerror(result.error);
        enqueueSnackbar(result.error, {
          variant: "error",
        });
      }
    } catch (err) {
      enqueueSnackbar("unknown error occured", {
        variant: "error",
      });
    }
  };

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      // dispatch({
      //   type: "LOGIN",
      // });
      fetchCartData();
      Cookies.set("MMUserId", session.user._id);
      const redurl = Cookies.get("_redurl");
      router.replace(redurl || "/");
    }
  }, []);

  const fetchCartData = async () => {
    try {
      const response = await axios.post(
        apiurl,
        {
          containerId: ["getcart"],
          strUserId: session?.user._id ?? "",
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const cartData = response.data[0].data.getcart.Table1;

      dispatch({ type: "CLEAR_CART" }); // Clear the cart before updating it

      if (cartData.length > 0) {
        cartData.forEach((item) => {
          dispatch({ type: "CHANGE_CART_AMOUNT", payload: item });
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (session?.user) {
      //  console.log(session.user._id);
      fetchCartData();
      Cookies.set("MMUserId", session.user._id);
      const redurl = Cookies.get("_redurl");
      router.replace(redurl || "/");
    }
  }, [router, session, redirect]);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: handleFormSubmit,
      validationSchema: formSchema,
    });
  const [SocialButtonsVisible, setSocialButtonsVisibility] = useState(false);
  return (
    <Wrapper mt={1} elevation={3} passwordVisibility={passwordVisibility}>
      <form onSubmit={handleSubmit}>
        {/* <BazaarImage
          src="/assets/images/logostr.png"
          sx={{
            m: "auto",
          }}
        /> */}

        <H1 textAlign="center" mt={1} mb={4} fontSize={16}>
          Login To Rupali Online
        </H1>

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
          label="Email or Phone Number"
          placeholder="Enter your email or phone number"
          error={!!touched.email && !!errors.email}
          helperText={touched.email && errors.email}
        />

        <BazaarTextField
          mb={2}
          fullWidth
          size="small"
          name="password"
          label="Password"
          autoComplete="on"
          variant="outlined"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
          placeholder="Enter your password"
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

        <FlexRowCenter my="1.25rem">
          <label color={red}>{loginerror}</label>
        </FlexRowCenter>

        <Button
          fullWidth
          type="submit"
          color="primary"
          variant="contained"
          sx={{
            height: 44,
          }}
        >
          Login
        </Button>
      </form>

      {() => {
        if (SocialButtonsVisible) {
          <SocialButtons />;
        }
      }}

      <FlexRowCenter mt="1.25rem">
        <Box>Don&apos;t have account?</Box>
        <Link href="/signup" passHref legacyBehavior>
          <H6
            ml={1}
            borderBottom="1px solid"
            borderColor="grey.900"
            style={{ cursor: "pointer" }}
          >
            Sign Up
          </H6>
        </Link>
      </FlexRowCenter>

      <FlexBox
        justifyContent="center"
        bgcolor="grey.200"
        borderRadius="4px"
        py={2.5}
        mt="1.25rem"
      >
        Forgot your password?
        <Link href="/reset-password" passHref legacyBehavior>
          <H6
            ml={1}
            borderBottom="1px solid"
            borderColor="grey.900"
            style={{ cursor: "pointer" }}
          >
            Reset It
          </H6>
        </Link>
      </FlexBox>
    </Wrapper>
  );
};
const initialValues = {
  email: "",
  password: "",
};
const formSchema = yup.object().shape({
  password: yup.string().required("Password is required"),
  email: yup.string().email("invalid email").required("Email is required"),
});

// export async function getServerSideProps(context) {
//   const { query, req, res } = context;
//   var error = "";
//   if (Boolean(query.error)) {
//     error = query.error;
//   }

//   try {
//     const secret = process.env.NEXTAUTH_SECRET;
//     const token = await getToken({ req, secret });

//     return { props: { providers: await getProviders(), loginError: error } };
//   } catch (e) {
//     return { props: { providers: await getProviders(), loginError: error } };
//   }
// }

export default Login;
