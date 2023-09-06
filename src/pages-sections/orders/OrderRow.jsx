import Link from "next/link";
import { format } from "date-fns";
import { East } from "@mui/icons-material";
import { Box, Chip, IconButton, Typography } from "@mui/material";
import TableRow from "components/TableRow";
import { H5 } from "components/Typography";
import { currency } from "lib";
// =================================================

const OrderRow = ({ order, userId }) => {
  const getColor = (status) => {
    switch (status) {
      case "Order Created":
        return "secondary";
      case "Invoice Printed":
        return "secondary";
      case "Packing Started":
        return "secondary";
      case "Packing Complete":
        return "secondary";
      case "Completed":
        return "success";
      case "Cancelled":
        return "error";
      default:
        return "secondary";
    }
  };
  return (
    <Link href={`/orderdetail/${userId}/${order.MO_DOCNO}`} passHref>
      <TableRow
        sx={{
          my: "1rem",
          padding: "6px 18px",
        }}
      >
        <H5 m={0.75} textAlign="left">
          {order.MO_DOCNO.split("-")[0]}
        </H5>

        <Box m={0.75}>
          <Chip
            size="small"
            label={order.ORDER_STATUS}
            sx={{
              p: "0.25rem 0.5rem",
              fontSize: 12,
              color: !!getColor(order.ORDER_STATUS)
                ? `${getColor(order.ORDER_STATUS)}.900`
                : "inherit",
              backgroundColor: !!getColor(order.ORDER_STATUS)
                ? `${getColor(order.ORDER_STATUS)}.100`
                : "none",
            }}
          />
        </Box>

        <Typography className="pre" m={0.75} textAlign="left">
          {order.MO_DOCDATE}
          {/* {format(new Date(order.MO_DOCDATE), "MMM dd, yyyy")} */}
        </Typography>

        <Typography m={0.75} textAlign="left">
          {currency(order.MO_NET_AMOUNT)}
        </Typography>

        <Typography
          color="grey.600"
          textAlign="center"
          sx={{
            flex: "0 0 0 !important",
            display: {
              xs: "none",
              md: "block",
            },
          }}
        >
          <IconButton>
            <East
              fontSize="small"
              color="inherit"
              sx={{
                transform: ({ direction }) =>
                  `rotate(${direction === "rtl" ? "180deg" : "0deg"})`,
              }}
            />
          </IconButton>
        </Typography>
      </TableRow>
    </Link>
  );
};
export default OrderRow;
