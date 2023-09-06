import { Container, styled } from "@mui/material";
import { FlexBox } from "components/flex-box";
import BazaarCard from "components/BazaarCard";
import MegaMenu from "./MegaMenu";

// NavList props interface

const NavBarWrapper = styled(BazaarCard)(({ theme, border }) => ({
  height: "45px",
  display: "block",
  borderRadius: "0px",
  position: "relative",
  backgroundColor: "black",
  color: "white",
  fontWeight: "bold",
  // ...(border && {
  //   borderBottom: `1px solid ${theme.palette.grey[200]}`,
  // }),
  [theme.breakpoints.down(1150)]: {
    display: "none",
  },
}));
const InnerContainer = styled(Container)({
  height: "100%",
  display: "flex",
  alignItems: "center",
  //justifyContent: "center",
  justifyContent: "space-between",
});

// ==========================================================

// ==========================================================

const Navbar = ({ elevation, border, topcategories }) => {
  const renderNestedNav = (list = []) => {
    return list.map((nav) => {
      return (
        //@ts-ignore
        <MegaMenu
          key={nav.name}
          title={nav.name}
          menuList={JSON.parse(nav.menuData).categories}
          rightImage={JSON.parse(nav.menuData).rightImage[0]}
        />
      );
    });
  };
  return (
    <NavBarWrapper hoverEffect={false} elevation={elevation} border={border}>
      <InnerContainer>
        <FlexBox gap={4}>{renderNestedNav(topcategories)}</FlexBox>
      </InnerContainer>
    </NavBarWrapper>
  );
};

//  set default props data
Navbar.defaultProps = {
  elevation: 2,
};
export default Navbar;
