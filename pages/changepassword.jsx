import Link from "next/link";
import SEO from "components/SEO";
import { Box, Button, Card, TextField } from "@mui/material";
import { H1, H6 } from "components/Typography";
import { FlexBox, FlexRowCenter } from "components/flex-box";
import { changePassword } from "utils/__api__/users";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
const ChangePassword = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [rpwmessage, Setrpwmessage] = useState("");
  const [password, SetPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!session?.user) {
      router.push("/login");
    }
  }, [router, session]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.target);
      const currentpassword = formData.get("currentpassword");
      const newpassword = formData.get("newpassword");
      const retypepassword = formData.get("retypepassword");

      if (retypepassword !== newpassword) {
        Setrpwmessage("New password not matching with retyped password");
      } else {
        const res = await changePassword(
          session?.user._id,
          currentpassword,
          newpassword
        );

        if (res) {
          Setrpwmessage(res.Table1[0].MESSAGE);
          enqueueSnackbar(res.Table1[0].MESSAGE, {
            variant: "success",
          });
          let data = {
            userName: session?.user.name,
            to: session?.user.email,
            subject: "Change Password",
            text: "Change Password",
            html: "",
          };
          fetch("/api/changepassword", {
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
        }

        //
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
      <SEO title="Change Password" />

      <Card
        sx={{
          padding: 4,
          maxWidth: 600,
          marginTop: 4,
          boxShadow: 1,
        }}
      >
        <H1 fontSize={20} fontWeight={700} mb={4} textAlign="center">
          Change Password
        </H1>
        <H6 sx={{ p: 2 }}>
          Please enter your current password and new password.
        </H6>

        <FlexBox justifyContent="space-between" flexWrap="wrap" my={2}>
          <form
            onSubmit={handleSubmit}
            style={{
              width: "100%",
            }}
          >
            <TextField
              sx={{ p: 1 }}
              fullWidth
              name="currentpassword"
              type="password"
              label="Current Password"
              required
            />
            <TextField
              sx={{ p: 1 }}
              fullWidth
              name="newpassword"
              type="password"
              label="New Password"
              required
            />
            <TextField
              sx={{ p: 1 }}
              fullWidth
              name="retypepassword"
              type="password"
              label="Retype New Password"
              required
            />

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
              >
                Change
              </Button>
            </Box>
          </form>

          <FlexRowCenter mt="1.25rem" justifyContent="center" width="100%">
            <Box>Go to Home Page?</Box>
            <Link href="/" passHref legacyBehavior>
              <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
                Home
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
export default ChangePassword;
