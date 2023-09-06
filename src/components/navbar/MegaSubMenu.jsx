import Link from "next/link";
import { Box, Card, Grid, styled } from "@mui/material";
import LazyImage from "components/LazyImage";
import { FlexBox } from "components/flex-box";
import { NavLink } from "components/nav-link";
// =========================================================

// =========================================================

// styled component
const Wrapper = styled(Box)(({ theme }) => ({
  display: "none",
  position: "absolute",
  left: "100%",
  right: "auto",
  top: 10,
  zIndex: 99,
  "& .title-link, & .child-link": {
    color: "inherit",
    fontWeight: 600,
    display: "block",
    padding: "0.5rem 0px",
  },
  "& .child-link": {
    fontWeight: 400,
  },
  "& .mega-menu-content": {
    padding: "0.5rem 0px",
    marginLeft: "1rem",
    borderRadius: 4,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    transition: "all 250ms ease-in-out",
    zIndex: 99,
  },
}));

// =================================================

// =================================================

const StyledMegaMenu = ({ children }) => {
  return <Wrapper className="mega-menu">{children}</Wrapper>;
};

const MegaSubMenu = (prdData) => {
  //{ data: { categories, rightImage }, minWidth }
  const minWidth = "760px";
  const categories = JSON.parse(prdData.prdData).categories;
  const rightImage = JSON.parse(prdData.prdData).rightImage;

  return categories ? (
    <StyledMegaMenu>
      <Card
        elevation={2}
        sx={{
          ml: "1rem",
          minWidth,
        }}
      >
        <FlexBox px={2.5} py={1.75} alignItems="unset">
          <Box flex="1 1 0">
            <Grid container spacing={4}>
              {categories?.map((item, ind) => (
                <Grid item md={3} key={ind}>
                  {item.href ? (
                    <NavLink className="title-link" href={item.href}>
                      {item.title}
                    </NavLink>
                  ) : (
                    <Box className="title-link">{item.title}</Box>
                  )}
                </Grid>
              ))}
            </Grid>
          </Box>

          {rightImage && (
            <Box mt={1.5}>
              <Link href={rightImage[0].href}>
                <LazyImage
                  src={`http:${rightImage[0].imgUrl}`}
                  // objectFit="contain"
                  width={137}
                  height={318}
                  alt="banner"
                />
              </Link>
            </Box>
          )}
        </FlexBox>
      </Card>
    </StyledMegaMenu>
  ) : null;
};
// MegaSubMenu.defaultProps = {
//   minWidth: "760px",
// };
export default MegaSubMenu;
