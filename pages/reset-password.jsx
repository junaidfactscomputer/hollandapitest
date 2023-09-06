import Link from "next/link";
import SEO from "components/SEO";
import { Box, Button, Card, TextField } from "@mui/material";
import { H1, H6 } from "components/Typography";
import { FlexBox, FlexRowCenter } from "components/flex-box";
import { forgotPassword } from "utils/__api__/users";
//import { useSnackbar } from "notistack";
import { useState } from "react";
const ResetPassword = () => {
  const [rpwmessage, Setrpwmessage] = useState("");
  const [password, SetPassword] = useState("");
  // const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.target);
      const emailValue = formData.get("email");

      const currentDate = new Date();
      const newYear = currentDate.getFullYear();
      const newSecond = currentDate.getSeconds();
      const newPassword = `${newYear}${newSecond}`;

      const res = await forgotPassword(emailValue, newPassword);

      if (res) {
        Setrpwmessage(res.Table1[0].MESSAGE);

        let data = {
          to: emailValue,
          subject: "Reset Password",
          text: "Reset Password",
          password: newPassword,
          html: "",
        };
        fetch("/api/forgetpassword", {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then((res) => {
          if (res.status === 200) {
            // enqueueSnackbar("Email sent successfully", {
            //   variant: "success",
            // });
          }
        });

        // router.push("/login");
      }
      if (res.error) {
        // enqueueSnackbar(res.error, {
        //   variant: "error",
        // });
      }
    } catch (err) {
      // enqueueSnackbar("unknown error occured", {
      //   variant: "error",
      // });
    }
  };

  return (
    <FlexRowCenter flexDirection="column" minHeight="100vh">
      <SEO title="Reset Password" />

      <Card
        sx={{
          padding: 4,
          maxWidth: 600,
          marginTop: 4,
          boxShadow: 1,
        }}
      >
        <H1 fontSize={20} fontWeight={700} mb={4} textAlign="center">
          Reset your password
        </H1>
        <H6 sx={{ p: 2 }}>
          Forgot password? Don't worry, enter your email id registered with
          RupaliOnline below and click RESET button, we will send a new password
          to your email.
        </H6>

        <FlexBox justifyContent="space-between" flexWrap="wrap" my={2}>
          <form
            onSubmit={handleSubmit}
            style={{
              width: "100%",
            }}
          >
            <TextField fullWidth name="email" type="email" label="Email" />

            <Box
              sx={{
                mt: 2,
              }}
            >
              <Button
                fullWidth
                type="submit"
                color="primary"
                variant="contained"
                name="email"
                label="Email"
              >
                Reset
              </Button>
            </Box>
          </form>

          <FlexRowCenter mt="1.25rem" justifyContent="center" width="100%">
            <Box>Don&apos;t have account?</Box>
            <Link href="/signup" passHref>
              <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
                Sign Up
              </H6>
            </Link>
          </FlexRowCenter>
          <FlexRowCenter mt="1.25rem" justifyContent="center" width="100%">
            <Box>Already Know Password?</Box>
            <Link href="/login" passHref legacyBehavior>
              <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
                Login
              </H6>
            </Link>
          </FlexRowCenter>
          <FlexRowCenter sx={{ p: 2 }}>
            <H6 color="red">{rpwmessage}</H6>
          </FlexRowCenter>
        </FlexBox>
      </Card>
    </FlexRowCenter>
  );
};
export default ResetPassword;
