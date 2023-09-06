import { Box } from "@mui/material";
import { H3 } from "components/Typography";

// ======================================================

// ======================================================

const ProductDescription = (desc) => {
  return (
    <Box>
      <H3 mb={2}>Product Description:</H3>
      <Box>
        100% Secure site <br />
        Fast Delivery, Next Working Day Despatch
        <br />
        Easy Return
        <br />
        UK's Biggest Asian Fashion Portal
        <br />
      </Box>
    </Box>
  );
};
export default ProductDescription;
