import NextImage from "next/image";
import { styled } from "@mui/system";

const LazyImage = styled((props) => <NextImage {...props} />)({
  width: "100%",
  height: "auto",
});
export default LazyImage;
