import Link from "next/link";
import { useEffect, useRef, useState, useTransition } from "react";
import { Box, Button, MenuItem, TextField } from "@mui/material";
import { SearchOutlinedIcon, SearchResultCard } from "./styled";
import Image from "next/image";
import api from "utils/__api__/products";
import { useRouter } from "next/router";
import Fuse from "fuse.js";
import BazaarImage from "components/BazaarImage";

const SearchInput = () => {
  const parentRef = useRef();
  const router = useRouter();
  const [_, startTransition] = useTransition();
  const [resultList, setResultList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const getProducts = async (searchText) => {
    const data = await api.searchProducts(searchText);

    // Define the options for Fuse.js
    const options = {
      includeScore: true,
      keys: ["ProductDescription1", "ProductDescription2"], // Specify the fields to search in
    };

    // Create a new Fuse instance with the data and options
    const fuse = new Fuse(data, options);

    // Search for the products
    const searchResults = fuse.search(searchText);

    const results = searchResults.map((result) => result.item);

    setResultList(results);

    // setResultList(data);
  };

  const handleSearchClick = (e) => {
    if (searchValue) router.push(`/search/${searchValue}`);
  };
  const handleSearch = (e) => {
    startTransition(() => {
      const value = e.target?.value;
      if (!value) setResultList([]);
      else {
        setSearchValue(value);
        getProducts(value);
      }
    });
  };
  const handleDocumentClick = () => setResultList([]);
  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => window.removeEventListener("click", null);
  }, []);
  return (
    <Box
      position="relative"
      flex="1 1 0"
      maxWidth="670px"
      mx="auto"
      {...{
        ref: parentRef,
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Searching for..."
        onChange={handleSearch}
        InputProps={{
          sx: {
            height: 37,
            paddingRight: 0,
            borderRadius: 300,
            color: "grey.700",
            overflow: "hidden",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main",
            },
          },
          // endAdornment: (
          //   <Button
          //     color="primary"
          //     disableElevation
          //     variant="contained"
          //     onClick={handleSearchClick}
          //     sx={{
          //       px: "3rem",
          //       height: "100%",
          //       borderRadius: "0 300px 300px 0",
          //     }}
          //   >
          //     Search
          //   </Button>
          // ),
          startAdornment: <SearchOutlinedIcon fontSize="small" />,
        }}
      />

      {resultList.length > 0 && (
        <SearchResultCard elevation={2}>
          {resultList.map((item, index) => (
            <Link href={item.NavigationUrl} key={index} passHref>
              <MenuItem key={index}>
                <BazaarImage
                  src={`https:${item.ImageUrl}`}
                  // width="50"
                  // height="50"
                  width={50}
                  height={50}
                  loading="eager"
                  //objectFit="contain"
                  sx={{
                    height: "100%",
                    objectFit: "scale-down",
                    objectPosition: "center center",
                  }}
                  // className={ compStyling.glow}
                />
                {item.ProductDescription1}
                {/* {item.ProductDescription2} */}
              </MenuItem>
            </Link>
          ))}
        </SearchResultCard>
      )}
    </Box>
  );
};
export default SearchInput;
