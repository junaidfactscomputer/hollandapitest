import SEO from "components/SEO";
import { FlexRowCenter } from "components/flex-box";
import { useTheme, Container } from "@mui/material";
import Signup from "pages-sections/sessions/Signup";
import apihome from "utils/__api__/home";
import MainLayout from "components/layouts/MainLayout";
const SignUpPage = ({ topcategory }) => {
  const theme = useTheme();
  return (
    <MainLayout
      topbarBgColor={theme.palette.warning[200]}
      topcategory={topcategory}
    >
      <Container
        sx={{
          my: 4,
        }}
      >
        <FlexRowCenter flexDirection="column">
          <Signup />
        </FlexRowCenter>
      </Container>
    </MainLayout>
    // <FlexRowCenter flexDirection="column" minHeight="100vh">

    // </FlexRowCenter>
  );
};
export async function getServerSideProps(context) {
  const topcategory = await apihome.getTopCategories();

  return {
    props: {
      topcategory: topcategory,
    },
  };
}
export default SignUpPage;
