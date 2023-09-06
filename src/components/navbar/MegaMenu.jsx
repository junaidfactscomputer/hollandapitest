import { KeyboardArrowDown } from "@mui/icons-material";
import { Box, Grid, List, ListItem, styled } from "@mui/material";
import { NavLink } from "components/nav-link";
import BazaarCard from "components/BazaarCard";
import { FlexRowCenter } from "components/flex-box";
import Link from "next/link";
import LazyImage from "components/LazyImage";
import Image from "components/BazaarImage";

// style components
const Wrapper = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  position: "relative",
  transition: "color 150ms ease-in-out",
  ":hover": {
    color: theme.palette.primary.main,
    "& .menu-list": {
      display: "block",
    },
  },
}));
const MenusContainer = styled(ListItem)(({ theme }) => ({
  zIndex: 2,
  top: "100%",
  minWidth: 800,
  display: "none",
  position: "absolute",
  transform: `translate(-5%, 0%)`,
  [theme.breakpoints.down(1070)]: {
    minWidth: 800,
  },
}));
const MenuListItem = styled(ListItem)(({ theme }) => ({
  padding: ".5rem 2rem",
  ":hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));
const StyledNavLink = styled(NavLink)({
  transition: "all 0.3s",
});

// ===============================================================

// ===============================================================

const MegaMenu = ({ title, menuList, rightImage }) => {
  // get grid size the basis of menu list
  const grid = 6;
  return (
    <Wrapper>
      <FlexRowCenter alignItems="flex-end" gap={0.3}>
        {title}{" "}
        {title === "FOR THE HOME" ? (
          <Link
            href="/"
            sx={{
              backgroundColor: "black",
            }}
          >
            <Image
              height={20}
              src="/assets/images/categories/tanchoimenuicon.png"
              alt="logo"
            />
          </Link>
        ) : (
          <KeyboardArrowDown
            sx={{
              color: "grey.500",
              fontSize: "1.1rem",
            }}
          />
        )}
      </FlexRowCenter>

      <MenusContainer className="menu-list">
        <BazaarCard
          elevation={3}
          sx={{
            mt: 1.5,
            overflow: "hidden",
          }}
        >
          <Grid container>
            <Grid
              item
              md={grid}
              sx={{
                py: 2,
                ":nth-of-type(odd)": {
                  backgroundColor: "grey.100",
                },
              }}
            >
              {menuList.map((item, index) => {
                return (
                  <List key={index}>
                    <StyledNavLink href={item.href}>
                      <MenuListItem>{item.title}</MenuListItem>
                    </StyledNavLink>
                  </List>
                );
              })}
            </Grid>
            <Box mt={1.5}>
              <Link href={rightImage.href}>
                <LazyImage
                  src={rightImage.imgUrl}
                  // objectFit="contain"
                  width={337}
                  height={450}
                  alt="banner"
                />
              </Link>
            </Box>
          </Grid>
        </BazaarCard>
      </MenusContainer>
    </Wrapper>
  );
};
export default MegaMenu;
