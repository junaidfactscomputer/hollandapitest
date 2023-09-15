import SEO from "components/SEO";
import Login from "pages-sections/sessions/Login";
import { FlexRowCenter } from "components/flex-box";
import { useTheme } from "@mui/material";
import MainLayout from "components/layouts/MainLayout";

const LoginPage = ({ topcategory }) => {
  const theme = useTheme();

  return (
    <MainLayout topbarBgColor={theme.palette.warning[200]}>
      <SEO title="Login" />
      <FlexRowCenter flexDirection="column">
        <Login />
      </FlexRowCenter>
    </MainLayout>
  );
};

export default LoginPage;
