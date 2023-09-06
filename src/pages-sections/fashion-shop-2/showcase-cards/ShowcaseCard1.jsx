import { Box, styled } from "@mui/material";
import { NavLink2 } from "components/nav-link";
import BazaarImage from "components/BazaarImage";
import { H1, H2, Paragraph, Span } from "components/Typography";

// styled components
const StyledBox = styled(Box)(({
  theme
}) => ({
  height: "100%",
  borderRadius: 4,
  boxShadow: theme.shadows[4],
  transition: "all 250ms ease-in-out",
  backgroundColor: "#fff",
  border: `1px solid ${theme.palette.grey[200]}`,
  "&:hover": {
    boxShadow: theme.shadows[3],
    borderColor: "transparent"
  },
  [theme.breakpoints.between("sm", "md")]: {
    "&": {
      display: "flex",
      alignItems: "center",
      padding: "2rem"
    },
    "& .content": {
      padding: "0",
      width: "50%"
    }
  },
  [theme.breakpoints.down("sm")]: {
    "&": {
      padding: "2rem"
    },
    "& .content": {
      padding: 0,
      marginTop: 10
    }
  }
}));
const StyledImage = styled(BazaarImage)(({
  theme
}) => ({
  padding: "1rem",
  marginLeft: "auto",
  marginRight: "auto",
  [theme.breakpoints.down("sm")]: {
    padding: 0
  },
  [theme.breakpoints.between("sm", "md")]: {
    width: "50%",
    padding: "1rem"
  }
}));
const ShowcaseCard1 = ({imgSrc,title}) => {
  return <StyledBox>
      <StyledImage src={imgSrc} alt={title} />

      <Box p="5px" className="content">
        {/* <H1 lineHeight={1.3} href="/shops/scarlett-beauty">
         <Span lineHeight={1.3}></Span>
          {title}
        
        </H1> */}
        <NavLink2 url="/shops/scarlett-beauty" title={title} borderColor="grey.100" />
      </Box>
    </StyledBox>;
};
export default ShowcaseCard1;