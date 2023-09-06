import { Badge, Divider, useMediaQuery } from "@mui/material";
import Home from "components/icons/Home";
import ShoppingBagOutlined from "components/icons/ShoppingBagOutlined";
//import useWindowSize from "hooks/useWindowSize";
import { useAppContext } from "contexts/AppContext";
//import { useRouter } from "next/router";
import { iconStyle, StyledNavLink, Wrapper } from "./styles";
const MobileNavigationBar = () => {
  //const router = useRouter();
  // const {  data: session } = useSession();

  // const handleOnClickProfile = () => {
  //   router.push(`/profile/${session.user._id}`);
  // };
  const downMd = useMediaQuery((theme) => theme.breakpoints.down("md"));
  //const width = useWindowSize();
  const { state } = useAppContext();

  return downMd ? (
    <Wrapper>
      <StyledNavLink href="/" key="Home">
        <Home sx={iconStyle} fontSize="small" />
      </StyledNavLink>
      
      <StyledNavLink href="/cart" key="Cart">
        <Badge badgeContent={state.cart.length} color="primary">
          <ShoppingBagOutlined fontSize="small" sx={iconStyle} />
        </Badge>
      </StyledNavLink>

      {/* <StyledNavLink key="Account" onClick={handleOnClickProfile}>
        <User2 sx={iconStyle} fontSize="small" />
        Account
      </StyledNavLink> */}
    </Wrapper>
  ) : null;
};
export default MobileNavigationBar;
