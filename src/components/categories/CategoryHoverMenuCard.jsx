import { Box, styled } from "@mui/material";
import navigations from "data/navigations";
import CategoryMenuItem from "./CategoryMenuItem";
import MegaMenu1 from "./mega-menu/MegaMenu1";

// styled component
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
  backgroundColor: theme.palette.background.paper,
  top: position === "absolute" ? "calc(100% + 0.7rem)" : "0.5rem",
}));

// ===============================================================

// ===============================================================

const CategoryMenuCard = (props) => {
  const { open, position } = props;

  return (
    <Wrapper open={open} position={position}>
      {navigations.map((item) => {
        return (
          <CategoryMenuItem
            key={item.title}
            href={item.href}
            icon={item.icon}
            title={item.title}
            caret={!!item.menuData}
          >
            <MegaMenu1 data={item.menuData || {}} />
          </CategoryMenuItem>
        );
      })}
    </Wrapper>
  );
};
CategoryMenuCard.defaultProps = {
  position: "absolute",
};
export default CategoryMenuCard;
