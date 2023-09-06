import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Avatar, Box, Button, IconButton, Menu, MenuItem, styled, useMediaQuery} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import Icon from "components/icons";
import { H6, Small } from "components/Typography";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useAppContext } from "contexts/AppContext";
import { getInitials } from "lib";

// styled components
const Divider = styled(Box)(({ theme }) => ({
  margin: "0.5rem 0",
  border: `1px dashed ${theme.palette.grey[200]}`,
}));
const AccountPopoverHeader = () => {
  const { state, dispatch } = useAppContext();
  const router = useRouter();
  const { status, data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => setAnchorEl(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleOnClickProfile = () => {
    router.push(`/profile/${session.user._id}`);
  };
  const handleOnClickOrder = () => {
    router.push(`/orders/${session.user._id}`);
  };

  const handleOnClickCPW = () => {
    router.push(`/changepassword`);
  };

  const logoutClickHandler = () => {
    Cookies.remove("MMUserId");
    dispatch({
      type: "CLEAR_CART",
    });
    // signOut({ callbackUrl: "/" })
    signOut({ callbackUrl: "/login" });
  };
  const ICON_STYLE = {
    color: "grey.600",
    fontSize: 20,
  };
  const theme = useTheme();

  const downMd = useMediaQuery(theme.breakpoints.down(1150));
  return (
    <Box>
      <Button
        sx={{
          // padding: 0,
        }}
        aria-haspopup="true"
        onClick={handleClick}
        aria-expanded={open ? "true" : undefined}
        aria-controls={open ? "account-menu" : undefined}
      >
        {downMd?<>{session.user.initials}</>
        :<>My Account</>}
        {/* <Avatar alt="Remy Sharp" src="/assets/images/avatars/001-man.svg" /> */}
      </Button>

      <Menu
        open={open}
        id="account-menu"
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            mt: 1,
            boxShadow: 2,
            minWidth: 200,
            borderRadius: "8px",
            overflow: "visible",
            border: "1px solid",
            borderColor: "grey.200",
            "& .MuiMenuItem-root:hover": {
              backgroundColor: "grey.200",
            },
            "&:before": {
              top: 0,
              right: 14,
              zIndex: 0,
              width: 10,
              height: 10,
              content: '""',
              display: "block",
              position: "absolute",
              borderTop: "1px solid",
              borderLeft: "1px solid",
              borderColor: "grey.200",
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
            },
          },
        }}
      >
        <Box px={2} pt={1}>
          <H6>Welcome {session.user.name}!</H6>
          {/* <Small color="grey.500">Admin</Small> */}
        </Box>
        
        <Divider />
        
        <MenuItem onClick={handleOnClickProfile}>Profile</MenuItem>
        <MenuItem onClick={handleOnClickOrder}>My Orders</MenuItem>
        <MenuItem onClick={handleOnClickCPW}>Change Password</MenuItem>
        {/* <MenuItem>Settings</MenuItem> */}

        <Divider />
        <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};
export default AccountPopoverHeader;
