//import { useRouter } from "next/router";
import {
  Box,
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  Rating,
  TextField,
} from "@mui/material";
//import Accordion from "components/accordion/Accordion";
import { FlexBetween, FlexBox } from "components/flex-box";
import { H5, H6, Paragraph, Span } from "components/Typography";
import { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { useRouter } from "next/router";
//import AccordionHeader from "components/accordion/AccordionHeader";
const ProductFilterCard = ({ sizes, onFilterChange, currentPage }) => {
  const [checkedBoxes, setCheckedBoxes] = useState([]);
  const [checkedColors, setCheckedColors] = useState([]);
  const [checkedFilters, setcheckedFilters] = useState([]);
  const router = useRouter();

  // useEffect(() => {
  //   setCheckedColors([]);
  //   setCheckedBoxes([]);
  //   setcheckedFilters([]);
  // }, [router.query.slug[1]]);

  useEffect(() => {
    let filtervalue = router.query.filter;

    if (filtervalue && filtervalue != "") {
      const parts = filtervalue.split("-");
      if (parts[0]) {
        const firstPart = parts[0].slice(5);

        // Split the first part into an array of values
        const firstValues = firstPart.split("_");
        let secondPart = "";
        let onlyfirstvalue = true;
        if (parts[1]) {
          secondPart = parts[1].slice(5);
          onlyfirstvalue = false;
        }

        const secondValues = secondPart.split("_");

        let names1;
        let names2;
        if (onlyfirstvalue) {
          let grpcode = "GRP4";
          if (filtervalue.includes("GRP3")) {
            grpcode = "GRP3";
            setCheckedColors(firstValues);
          } else {
            setCheckedBoxes(firstValues);
          }
          names1 = sizes
            .filter(
              (item) =>
                firstValues.includes(item.CODE) && item.GROUP_CODE == grpcode
            )
            .map((item) => item.DESCRIPTION);

          setcheckedFilters([...names1]);
        } else {
          setCheckedColors(secondValues);
          setCheckedBoxes(firstValues);
          names1 = sizes
            .filter(
              (item) =>
                firstValues.includes(item.CODE) && item.GROUP_CODE == "GRP4"
            )
            .map((item) => item.DESCRIPTION);

          names2 = sizes
            .filter(
              (item) =>
                secondValues.includes(item.CODE) && item.GROUP_CODE == "GRP3"
            )
            .map((item) => item.DESCRIPTION);

          setcheckedFilters([...names1, ...names2]);
          console.log([...names1, ...names2]);
        }
      } else {
        setcheckedFilters([]);
      }
    }
  }, [router.query.filter]);

  const handleCheckboxChange = (grpcode, code) => (e) => {
    const checked = e.target.checked;
    const newCheckedList = [...checkedBoxes];
    const newCheckedColors = [...checkedColors];
    console.log(newCheckedList);
    if (checked && grpcode === "GRP4") {
      const index = newCheckedList.findIndex((item) => item === code);
      if (index === -1) {
        newCheckedList.push(code);
      }
      setCheckedBoxes(newCheckedList);
    } else if (grpcode === "GRP4") {
      const index = newCheckedList.findIndex((item) => item === code);
      if (index !== -1) {
        newCheckedList.splice(index, 1);
      }
      setCheckedBoxes(newCheckedList);
    }

    if (grpcode === "GRP3") {
      const index = newCheckedColors.findIndex((item) => item === code);
      if (index === -1) {
        newCheckedColors.push(code);
      } else {
        newCheckedColors.splice(index, 1);
      }
      setCheckedColors(newCheckedColors);
    }

    let filtercode = "";
    let filter1 = "";
    let filter2 = "";

    if (newCheckedList.length > 0) {
      filter1 = filter1 + "GRP4";
      newCheckedList.map((item) => {
        filter1 = filter1 + "_" + item;
      });
    } else if (checked && grpcode === "GRP4") {
      filter1 = "GRP4" + "_" + code;
    }

    if (newCheckedColors.length > 0) {
      filter2 = filter2 + "GRP3";
      newCheckedColors.map((item) => {
        filter2 = filter2 + "_" + item;
      });
    } else if (grpcode === "GRP3") {
      filter2 = "";
    }

    if (filter1 != "" && filter2 != "") {
      filter1 = filter1 + "-";
    }

    filtercode = filter1 + filter2;
    onFilterChange(e, filtercode);
  };

  return (
    <Card
      sx={{
        p: "18px 27px",
        overflow: "auto",
      }}
      elevation={1}
    >
      <H6 mb={1}>Sizes</H6>
      {sizes[0].GROUP_DESCRIPTION &&
        sizes
          .filter(
            (list) =>
              list.COUNT > 0 && list.GROUP_DESCRIPTION.toUpperCase() === "SIZE"
          )
          .map((item, index) => (
            // <FormControlLabel
            //   key={item.CODE}
            //   sx={{
            //     display: "flex",
            //   }}
            //   label={<Span padding="0px !important">{item.DESCRIPTION}</Span>}
            //   control={
            //     <Checkbox
            //       size="small"
            //       color="secondary"
            //       name={item.DESCRIPTION}
            //       checked={checkedFilters.includes(item.DESCRIPTION)}
            //       onChange={handleCheckboxChange(item.GROUP_CODE, item.CODE)}
            //     />
            //   }
            // />
            <FormControlLabel
              key={item.CODE}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "4px",
              }}
              label={
                <Span sx={{ fontSize: "14px", padding: "0 !important" }}>
                  {item.DESCRIPTION}
                </Span>
              }
              control={
                <Checkbox
                  sx={{ transform: "scale(0.8)", padding: "0 !important" }}
                  size="small"
                  color="secondary"
                  name={item.DESCRIPTION}
                  checked={checkedFilters.includes(item.DESCRIPTION)}
                  onChange={handleCheckboxChange(item.GROUP_CODE, item.CODE)}
                />
              }
            />
          ))}

      <Divider
        sx={{
          my: 2,
        }}
      />

      {/* COLORS VARIANT FILTER */}
      <H6 mb={2}>Colors</H6>
      <FlexBox mb={2} flexWrap="wrap" gap={1}>
        {sizes[0].GROUP_DESCRIPTION &&
          sizes
            .filter(
              (list) =>
                list.GROUP_DESCRIPTION.toUpperCase() === "COLOUR" &&
                list.CODE != null &&
                list.COUNT > 0
            )
            .map((item, index) => (
              <Box
                key={item.CODE}
                flexShrink={0}
                onClick={handleCheckboxChange(item.GROUP_CODE, item.CODE)}
                sx={{
                  width: 25,
                  height: 25,
                  bgcolor: item.BACKGROUND_COLOR,
                  cursor: "pointer",
                  borderRadius: "50%",
                  border: "black solid 1px",
                }}
              >
                {/* {checkedColors.includes(item.CODE) && ( */}
                {checkedFilters.includes(item.DESCRIPTION) && (
                  <Box
                    sx={{
                      //position: "absolute",
                      top: 0,
                      left: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      height: "100%",
                      color: "black",
                    }}
                  >
                    <CheckIcon />
                  </Box>
                )}
                {/* add your button content here */}
              </Box>
            ))}
      </FlexBox>

      {/* PRICE VARIANT FILTER */}
      {/* <H6 mb={2}>Price Range</H6>
      <FlexBetween>
        <TextField placeholder="0" type="number" size="small" fullWidth />
        <H5 color="grey.600" px={1}>
          -
        </H5>
        <TextField placeholder="250" type="number" size="small" fullWidth />
      </FlexBetween> */}

      <Divider
        sx={{
          my: 3,
        }}
      />
    </Card>
  );
};

export default ProductFilterCard;
