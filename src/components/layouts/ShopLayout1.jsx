import { Fragment, useCallback, useState } from "react";
import Sticky from "components/Sticky";
import Topbar from "components/Topbar";
import { Footer1 } from "components/footer";
import { Divider } from "@mui/material";
import Header from "components/header/Header";
//import Navbar from "components/navbar/Navbar";
import MegaNavbar from "components/navbar/MegaNavbar";
import { MobileNavigationBar } from "components/mobile-navigation";
import SearchInput from "components/search-box/SearchInput";

const ShopLayout1 = ({
  children,
  topbarBgColor,
  topcategory,
  // categoryNav,
  // showNavbar = true,
}) => {
  const categoryNav = (
    // <Sticky fixedOn={0} scrollDistance={200}>
    <MegaNavbar
      // selected={selected}

      elevation={0}
      border={1}
      topcategories={topcategory}
      // onChangeCategory={handleChangeCategory}
    />
  );

  const [isFixed, setIsFixed] = useState(false);
  const toggleIsFixed = useCallback((fixed) => setIsFixed(fixed), []);
  return (
    <Fragment>
      {/* TOPBAR */}
      {<Topbar bgColor={topbarBgColor} />}

      {/* HEADER */}
      <Sticky fixedOn={0} onSticky={toggleIsFixed} scrollDistance={300}>
        <Header isFixed={isFixed} searchInput={<SearchInput />} />
        <Divider />
        {categoryNav}
      </Sticky>

      <div className="section-after-sticky">
        {/* NAVIGATION BAR */}
        {/* {showNavbar && <Navbar elevation={0} border={1} />} */}

        {/* BODY CONTENT */}
        {children}
      </div>

      {/* SMALL DEVICE BOTTOM NAVIGATION */}
      <MobileNavigationBar />

      {/* FOOTER */}
      <Footer1 />
    </Fragment>
  );
};

export default ShopLayout1;
