import { Fragment, useCallback, useState } from "react";
import Topbar from "components/Topbar";
import { Footer1 } from "components/footer";
import { Divider } from "@mui/material";
import Header from "components/header/Header";
import MegaNavbar from "components/navbar/MegaNavbar";
import { MobileNavigationBar } from "components/mobile-navigation";
import StickyHeader from "components/StickyHeader";
import { useSession } from "next-auth/react";
const MainLayout = ({ children, topbarBgColor, topcategory }) => {
  const { data: session } = useSession();
  const categoryNav = (
    <MegaNavbar elevation={0} border={1} topcategories={topcategory} />
  );

  const [isFixed, setIsFixed] = useState(false);
  const toggleIsFixed = useCallback((fixed) => setIsFixed(fixed), []);
  return (
    <Fragment>
      <Topbar bgColor={topbarBgColor} />
      {session?.user && <Header isFixed={isFixed} />}
      {/* <StickyHeader>
        <Divider />
        {categoryNav}
      </StickyHeader> */}
      <div className="section-after-sticky">{children}</div>
      {/* <MobileNavigationBar /> */}
      {/* <Footer1 /> */}
    </Fragment>
  );
};

export default MainLayout;
