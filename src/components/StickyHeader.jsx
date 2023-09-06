import { styled } from "@mui/material/styles";

const useStyles = styled((theme) => ({
  container: {
    position: "relative",
    overflow: "auto",
    maxHeight: "100vh", // Adjust the maximum height as needed
  },
  header: {
    position: "sticky",
    top: 0,
    zIndex: theme.zIndex.appBar,
    backgroundColor: theme.palette.background.paper,
    // Additional styles for the sticky header
  },
}));

const StickyHeader = ({ children }) => {
  const classes = useStyles();

  const handleScroll = (event) => {
    const { scrollTop } = event.target;
    // Logic to handle scrolling and apply sticky behavior as needed
  };

  return (
    <div className={classes.container} onScroll={handleScroll}>
      <header className={classes.header}>{children}</header>
      {/* Main content */}
    </div>
  );
};

export default StickyHeader;
