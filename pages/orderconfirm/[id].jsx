import Link from "next/link";
import { Button, Container, styled } from "@mui/material";
import SEO from "components/SEO";
import LazyImage from "components/LazyImage";
import BazaarCard from "components/BazaarCard";
import { H1, Paragraph } from "components/Typography";
import MainLayout from "components/layouts/MainLayout";
import { useEffect } from "react";
import { useAppContext } from "contexts/AppContext";

// custom styled components
const Wrapper = styled(BazaarCard)({
  margin: "auto",
  padding: "3rem",
  maxWidth: "630px",
  textAlign: "center",
});
const StyledButton = styled(Button)({
  marginTop: "2rem",
  padding: "11px 24px",
});
const OrderConfirmation = ({ loginid, orderno, email }) => {
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    dispatch({
      type: "CLEAR_CART",
    });

    let data = {
      custId: loginid,
      orderNo: orderno,
      userEmail: email,
    };

    fetch("/api/confirmorder", {
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
  }, []);

  return (
    <MainLayout>
      <SEO title="Order Confirmation" />

      <Container
        sx={{
          mt: 4,
          mb: 20,
        }}
      >
        <Wrapper>
          <LazyImage
            width={116}
            height={116}
            alt="complete"
            src="/assets/images/illustrations/party-popper.svg"
          />
          <H1 lineHeight={1.1} mt="1.5rem">
            Your order is completed!
          </H1>

          <Paragraph color="grey.800" mt="0.3rem">
            You will be receiving confirmation email with order details.
          </Paragraph>

          <Link href="/" passHref>
            <StyledButton
              color="primary"
              disableElevation
              variant="contained"
              className="button-link"
            >
              Order Again
            </StyledButton>
          </Link>
        </Wrapper>
      </Container>
    </MainLayout>
  );
};
export async function getServerSideProps(context) {
  return {
    props: {
      loginid: context.query.loginid,
      email: context.query.email,
      orderno: context.params.id,
    },
  };
}
export default OrderConfirmation;
