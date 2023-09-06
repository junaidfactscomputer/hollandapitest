import { Box, Container, styled } from "@mui/material";
import { H5 } from "../Typography";
import appIcons from "components/icons";
import Scrollbar from "components/Scrollbar";
import { FlexRowCenter } from "components/flex-box";
import MegaSubMenu from "./MegaSubMenu";
// styled compoentents

const Wrapper = styled(Box)(({ theme, position, open }) => ({
  left: 0,
  zIndex: 98,
  right: "auto",
  borderRadius: 4,
  padding: "0.5rem 0px",
  transformOrigin: "top",
  boxShadow: theme.shadows[2],
  position: position || "unset",
  transition: "all 250ms ease-in-out",
  transform: open ? "scaleY(1)" : "scaleY(0)",
  top: position === "absolute" ? "calc(100% + 0.7rem)" : "0.5rem",
  "& .category-dropdown-link": {
    // height: 40,
    // display: "flex",
    // minWidth: "278px",
    cursor: "pointer",
    whiteSpace: "pre",
    // padding: "0px 1rem",
    // alignItems: "center",
    transition: "all 250ms ease-in-out",
    "& .title": {
      flexGrow: 1,
      // paddingLeft: "0.75rem",
    },
  },
  "&:hover": {
    "& > .category-dropdown-link": {
      color: theme.palette.primary.main,
      background: theme.palette.action.hover,
    },
    "& > .mega-menu": {
      display: "block",
    },
  },
}));

const StyledScrollbar = styled(Scrollbar)(({ theme }) => ({
  "& .simplebar-content": {
    height: "3rem",
    display: "flex",
    backgroundColor: "black",
    color: "white",
    justifyContent: "start",
  },
  [theme.breakpoints.down("sm")]: {
    "& .simplebar-content": {
      padding: "6px",
    },
  },
}));
const Title = styled(H5)(({ selected, theme }) => ({
  fontSize: "16px",
  textAlign: "center",
  //fontWeight: selected ? "600" : "400",
  fontWeight: "600",
  color: selected ? theme.palette.primary.main : "inherit",
  [theme.breakpoints.down("sm")]: {
    fontSize: "12px",
    fontWeight: "500",
  },
}));

// ==========================================================================

// ==========================================================================

const SaleNavbar = ({ topcategories, selected, onChangeCategory }) => {
  return (
    <Box bgcolor="black">
      <Container
        sx={{
          paddingRight: { xs: "6px", sm: "6px", md: "24px" },
          paddingLeft: { xs: "6px", sm: "6px", md: "24px" },
        }}
      >
        <StyledScrollbar autoHide={false}>
          {topcategories.map((item) => {
            // const Icon = appIcons[item.icon];
            const selectedItem = item.slug === selected ? 1 : 0;
            return (
              <Wrapper open="open">
                <FlexRowCenter
                  key={item.id}
                  // onClick={onChangeCategory(item.slug)}
                  sx={{
                    cursor: "pointer",
                    //minWidth: "100px",
                    padding: { xs: "6px", sm: "6px", md: "15px" },
                    flexDirection: "column",
                    background: selectedItem ? "primary.light" : "transparent",
                  }}
                >
                  <Title
                    className="category-dropdown-link"
                    selected={selectedItem}
                  >
                    {item.name}
                  </Title>
                </FlexRowCenter>
                <MegaSubMenu prdData={item.menuData} />
              </Wrapper>
            );
          })}
        </StyledScrollbar>
      </Container>
    </Box>
  );
};
export default SaleNavbar;
