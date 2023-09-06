import Link from "next/link";
import { useEffect, useState } from "react";
import { Add, Remove, Info, DragIndicator } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Chip,
  Grid,
  Button,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
//import LazyImage from "components/LazyImage";
import BazaarRating from "components/BazaarRating";
import { H1, H2, H3, H6, Paragraph } from "components/Typography";
import { useAppContext } from "contexts/AppContext";
import { FlexBox, FlexRowCenter } from "../flex-box";
import { currency } from "lib";
import axios from "axios";
import { getuserCookie } from "lib";
import { format } from "date-fns";
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";


// ================================================================

// ================================================================

const SizeChart = ({
  id,
  open,
  anchorEl,
  handleClose,
  sizeChart,
  sizeChartRow,
  sizeChartHeaders,
}) => {
    return(
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <Typography sx={{ p: 2 }}>
                <H3>Size Chart of {id}</H3>
              </Typography>
              {sizeChart.length > 0 ? (
                <>
                  <Paragraph sx={{ p: 2 }}>
                    All the measuremens are in inches, unless otherwise stated.
                    In case you are unsure about a specific piece or in general,
                    please do not hesitate to contact us.<br></br> We are eager
                    to help you!
                  </Paragraph>
                  <Table size="small" style={{ border: "1px solid #ddd" }}>
                    <TableHead>
                      <TableRow>{sizeChartHeaders}</TableRow>
                    </TableHead>
                    <TableBody>{sizeChartRow}</TableBody>
                  </Table>
                </>
              ) : (
                <Paragraph sx={{ p: 2 }}>
                  Sorry, Size chart not available for this product, In case you
                  have questions about this specific product or in general,
                  <br></br> Please do not hesitate to contact us. We are eager
                  to help you!
                </Paragraph>
              )}
            </Popover>
  );
};
export default SizeChart;
