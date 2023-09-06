import { Box, Grid } from "@mui/material";
import { FlexBetween } from "components/flex-box";
import Quote from "components/icons/Quote";
import PackageBox from "components/icons/PackageBox";
import UpDown from "components/icons/UpDown";
import Delivery from "components/icons/Delivery";
import { H3 } from "components/Typography";
import { RefundinfoCard } from "pages-sections/admin";
import { Paragraph } from "components/Typography";

import { FlexRowCenter } from "components/flex-box";
import { useTheme } from "@mui/material";
import apihome from "utils/__api__/home";
import MainLayout from "components/layouts/MainLayout";

const packageList = [
  {
    id: 1,
    packageName: "TICK RECEIPT",
    Icon: Quote,
    features: [
      "Tick the items you wish to return on the receipt we sent with your order. In case of exchange please write a note including the design number, colour, size etc. If receipt not available, write details on a piece of paper.",
      "Please return goods within 10 days of receipt",
      "Items should be unworn and in good condition with tags",
    ],
  },
  {
    id: 2,
    packageName: "PACK",
    Icon: PackageBox,
    features: [
      "Pack each items into their original packet, include a copy of Receipt or a letter mentioning the Receipt No. and the reason for returning the items. Seal the box properly. Using plastic bag instead of paper carton box will reduce postal charge.",
    ],
  },
  {
    id: 3,
    packageName: "POST",
    Icon: Delivery,
    features: [
      "Send the parcel through your convenient parcel service. We recommend Royal Mail, Second Class Recorded Post from your nearby post office.",
      "Please send all the return items to:VEEMA UK LTD.,UNIT 17, EAST PARK ROAD,LEICESTER, LE5 4QA",
      "We do not offer a free return service, however we would be happy to exchange the goods for something else of your choice or a different size, but postage charges are applicable. We do not guarantee the availability of all sizes and colors on exchanges.",
    ],
  },
  {
    id: 4,
    packageName: "REFUND",
    Icon: UpDown,
    features: [
      "Send the parcel through your convenient parcel service. We recommend Royal Mail, Second Class Recorded Post from your nearby post office.",
      "Please send all the return items to:VEEMA UK LTD.,UNIT 17, EAST PARK ROAD,LEICESTER, LE5 4QA",
      "We do not offer a free return service, however we would be happy to exchange the goods for something else of your choice or a different size, but postage charges are applicable. We do not guarantee the availability of all sizes and colors on exchanges.",
    ],
  },
];

const howtoreturn = ({ topcategory }) => {
  const theme = useTheme();
  return (
    <MainLayout
      topbarBgColor={theme.palette.warning[200]}
      topcategory={topcategory}
    >
      <FlexRowCenter flexDirection="column">
        <Box p={4}>
          <FlexBetween mb={2}>
            <H3>RETURNS INFORMATION</H3>
          </FlexBetween>
          <FlexBetween mb={2}>
            <Paragraph mb={1}>
              Need to return/exchange something? No problem.
            </Paragraph>
          </FlexBetween>

          <Grid container spacing={3}>
            {packageList.map((item) => (
              <Grid item xl={3} md={3} xs={6} key={item.id}>
                <RefundinfoCard listItem={item} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </FlexRowCenter>
    </MainLayout>
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
export default howtoreturn;
