import { Box, Button, Divider, MenuItem, TextField } from "@mui/material";
import { FlexBetween, FlexBox } from "components/flex-box";
import { Paragraph, Span } from "components/Typography";
import { currency } from "lib";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
const CheckoutSummary2 = ({ cartList, shiptypes }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [shippingCharge, setshippingCharge] = useState(shiptypes[0].Rate);
  const [deliveryOption, setDeliveryOption] = useState(shiptypes[0].Code);
  const { enqueueSnackbar } = useSnackbar();
  const getTotalPrice = () =>
    cartList.reduce((accum, item) => accum + item.Amount * 1, 0);

  const handlePayButton = () => {
    if (deliveryOption) {
      if (session?.user) {
        router.push(
          `/paymentredirect/1?loginid=${session?.user._id}&deloption=${deliveryOption}`
        );
      }
    } else {
      enqueueSnackbar("Please select Shipping options", {
        variant: "error",
      });
    }
  };

  const handleShippingChange = (rate, option) => (e) => {
    //console.log(rate);
    setshippingCharge(rate);
    setDeliveryOption(option);
  };

  return (
    <Box>
      <FlexBox mb={2} gap={2}>
        <TextField
          select
          fullWidth
          size="small"
          label="Shipping Options"
          variant="outlined"
          placeholder="Select Shipping Option"
          defaultValue={shiptypes[0].Code}
          style={{ backgroundColor: "white", borderRadius: "4px" }}
        >
          {shiptypes.map((item) => (
            <MenuItem
              value={item.Code}
              key={item.Code}
              onClick={handleShippingChange(item.Rate, item.Code)}
            >
              {item.Description}
            </MenuItem>
          ))}
        </TextField>
      </FlexBox>

      <Paragraph color="secondary.900" fontWeight={700} mb={2}>
        Your order
      </Paragraph>

      {cartList.map((item, ind) => (
        <FlexBetween mb={1} key={ind}>
          <Paragraph>
            <Span fontWeight="700" fontSize="14px">
              {item.Qty}
            </Span>{" "}
            x {item.ProductDesc}
          </Paragraph>
          <Paragraph>{currency(item.Amount)}</Paragraph>
        </FlexBetween>
      ))}

      <Divider
        sx={{
          borderColor: "grey.300",
          my: 3,
        }}
      />

      <FlexBetween mb={0.5}>
        <Paragraph color="grey.600">Order Total:</Paragraph>
        <Paragraph fontWeight="700">{currency(getTotalPrice())}</Paragraph>
      </FlexBetween>

      <FlexBetween mb={0.5}>
        <Paragraph color="grey.600">Shipping and handling:</Paragraph>
        <Paragraph fontWeight="700">{currency(shippingCharge)}</Paragraph>
      </FlexBetween>

      {/* <FlexBetween mb={0.5}>
        <Paragraph color="grey.600">Tax:</Paragraph>
        <Paragraph fontWeight="700">{currency(40)}</Paragraph>
      </FlexBetween> */}

      {/* <FlexBetween mb={3}>
        <Paragraph color="grey.600">Discount:</Paragraph>
        <Paragraph fontWeight="700">-</Paragraph>
      </FlexBetween> */}

      <Divider
        sx={{
          borderColor: "grey.300",
          mb: 1,
        }}
      />

      <FlexBetween fontWeight="700" mb={1}>
        <Paragraph>Order total:</Paragraph>
        <Paragraph fontWeight="700">
          {" "}
          {currency(getTotalPrice() + shippingCharge)}
        </Paragraph>
      </FlexBetween>

      <Button
        fullWidth
        type="submit"
        onClick={handlePayButton}
        color="primary"
        variant="contained"
        sx={{
          mt: 3,
        }}
      >
        Pay Now
      </Button>
      <FlexBetween mt={1}>
        <Paragraph fontSize="10px">
          You will be redirected to secure payment gateway page to enter your
          card details. If you close the window before completing all the steps,
          your order will get cancelled. 3D secure is now compulsory for almost
          all cards.
        </Paragraph>
      </FlexBetween>
    </Box>
  );
};

export default CheckoutSummary2;
