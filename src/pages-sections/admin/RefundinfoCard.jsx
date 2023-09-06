import { Box, Button, Card, styled } from "@mui/material";
import { FlexBox } from "components/flex-box";
import Verify from "components/icons/Verify";
import { H1, H3, H5, H6 } from "components/Typography";

// styled components
const Wrapper = styled(Card)({
  display: "flex",
  padding: "1rem 1rem",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
});

const RefundinfoCard = ({ listItem }) => {
  const { packageName, Icon, features = [] } = listItem;
  return (
    <Wrapper>
      <Icon
        sx={{
          fontSize: 50,
        }}
      />

      <H3 mt={3} fontWeight={600}>
        {packageName}
      </H3>

      <Box mt={1} mb={2}>
        {features.map((item, index) => (
          <FlexBox gap={2} my={2} alignItems="center" key={index}>
            <Verify />
            <H6>{item}</H6>
          </FlexBox>
        ))}
      </Box>
    </Wrapper>
  );
};
export default RefundinfoCard;
