import Link from "next/link";
import { Box, Container, Grid, IconButton, styled } from "@mui/material";
//import AppStore from "components/AppStore";
import Quote from "components/icons/Quote";
import Image from "components/BazaarImage";
import { FlexBox } from "components/flex-box";
import { Paragraph, Span } from "components/Typography";
//import Google from "components/icons/Google";
import Twitter from "components/icons/Twitter";
import Youtube from "components/icons/Youtube";
import Facebook from "components/icons/Facebook";
import Instagram from "components/icons/Instagram";
//import { slideX } from "animations/keyframes";
import { useEffect, useState } from "react";

// styled component
const StyledLink = styled("a")(({ theme }) => ({
  display: "block",
  borderRadius: 4,
  cursor: "pointer",
  position: "relative",
  padding: "0.3rem 0rem",
  color: theme.palette.grey[500],
  "&:hover": {
    color: theme.palette.grey[100],
  },
}));

const comments = [
  "I am extremely happy with the customer service I have received so far from Rupali. They are very punctual, everything is superbly organized from begining to end of my orders. I would love to say a huge thank you to all of you.  - Uzma Haider, UK",
  "Hi, this is third time I placed an order with Rupali. I tried different online sites but very happy to say that shopping with Rupali is brilliant. Prompt service and very helpful. The quality is excellent. Would love to see more designs.- Anu G, UK",
  "I found the website easy to navigate and use, it had just what I was looking for. It did take me over an hour to choose as there were so many beautiful things to choose from!- Becky Lucas, UK",
  "It has always been a pleasure to do business with you! Orders are quickly sent and delivery is efficient. The quality and price of your merchandise is excellent, well made and beautiful! Thank you very much.- Carolee Luper, France",
  "Dear Rupali, Many thanks for the prompt and efficient services as always, Keep up the excellent lines and services, stunning unusual pieces this year, love the items, so unique! Thanks again. - Kamela Dabideen, UK",
];

const Footer1 = () => {
  const [currentCommentIndex, setCurrentCommentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCommentIndex((prevIndex) => (prevIndex + 1) % comments.length);
    }, 5000); // Change the interval duration as desired (in milliseconds)

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <footer>
      <Box bgcolor="#222935">
        <Container
          sx={{
            p: "1rem",
            color: "white",
          }}
        >
          <Box py={3} overflow="hidden">
            <Grid container spacing={3}>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <Link href="/">
                  <Image mb={2.5} src="/assets/images/logostr.png" alt="logo" />
                </Link>

                <Paragraph mb={2.5} color="grey.500">
                  We are a department store with a wide array of products
                  specifically catering to Asian shopping tastes. A strong
                  foundation in retailing since 1980's and progressive growth
                  has stimulated an ever widening customer base and has helped
                  us build ever lasting customer relationships. The success of
                  our retail format has led to our growth as The largest Asian
                  Mail Order Company in the UK
                </Paragraph>

                <FlexBox flexWrap="wrap" m={-1}>
                  <Image
                    mb={2}
                    src="/assets/images/shops/sagepay.png"
                    alt="sagepay"
                  />
                  <Image
                    mb={2}
                    mx={1}
                    src="/assets/images/shops/Credit_Card_Safe_blue.2.png"
                    alt="sagepay"
                  />
                </FlexBox>

                {/* <AppStore /> */}
              </Grid>
              <Grid container item mt={3} lg={5} md={12} sm={12} xs={12}>
                <Grid item xs={12}>
                  <Quote
                    sx={{
                      fontSize: 20,
                    }}
                  />
                  <div className="comment-slider">
                    {comments.map((comment, index) => (
                      <div
                        key={index}
                        className={`slide ${
                          index === currentCommentIndex ? "active" : ""
                        }`}
                      >
                        {comment}
                      </div>
                    ))}
                  </div>
                  <style jsx>{`
                    .comment-slider {
                      position: relative;
                      height: 60px; /* Adjust height as needed */
                      overflow: hidden;
                    }

                    .slide {
                      position: absolute;
                      top: 0;
                      left: 0;
                      width: 100%;
                      height: 100%;
                      opacity: 0;
                      transition: opacity 0.5s ease;
                    }

                    .slide.active {
                      opacity: 1;
                    }
                  `}</style>
                  {/* <Paragraph
                    fontSize={15}
                    sx={{
                      flex: 1,
                      zIndex: 5,
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "hidden",
                    }}
                  >
                    ""
                    <Span
                      sx={{
                        letterSpacing: 0.5,
                        fontStyle: "italic",
                        position: "relative",
                        whiteSpace: "nowrap",
                        textOverflow: "hidden",
                        // textTransform: "uppercase",
                        animation: `${slideX} 20s infinite linear 1s`,
                      }}
                    >
                      Hi, this is third time I placed an order with Rupali. I
                      tried different online sites but very happy to say that
                      shopping with Rupali is brilliant. Prompt service and very
                      helpful. The quality is excellent. Would love to see more
                      designs. - Anu G, UK
                    </Span>
                  </Paragraph> */}
                </Grid>
                <Grid mx={1} item lg={5} md={5} sm={5} xs={5}>
                  {/* <Box
                  fontSize="18px"
                  fontWeight="600"
                  mb={1.5}
                  lineHeight="1"
                  color="white"
                >
                  About Us
                </Box> */}

                  <div>
                    {/* {aboutLinks.map((item, ind) => (
                    <Link href="/" key={ind} passHref legacyBehavior>
                      <StyledLink>{item}</StyledLink>
                    </Link>
                  ))} */}
                    <Link
                      href="http://www.rupalionline.info/Home.aspx"
                      passHref
                      legacyBehavior
                      target="_blank"
                    >
                      <StyledLink>ABOUT US</StyledLink>
                    </Link>
                    <Link
                      href="http://www.rupalionline.info/ContactUs.aspx"
                      passHref
                      legacyBehavior
                      target="_blank"
                    >
                      <StyledLink>CONTACT US</StyledLink>
                    </Link>
                    <Link
                      href="http://www.rupalionline.info/DeliveryInformation.aspx"
                      passHref
                      legacyBehavior
                      target="_blank"
                    >
                      <StyledLink>DELIVERY INFO</StyledLink>
                    </Link>
                    <Link
                      href="http://www.rupalionline.info/PostageCharges.aspx"
                      passHref
                      legacyBehavior
                      target="_blank"
                    >
                      <StyledLink>POSTAGE CHARGES</StyledLink>
                    </Link>
                  </div>
                </Grid>

                <Grid item lg={6} md={6} sm={6} xs={6}>
                  {/* <Box
                  fontSize="18px"
                  fontWeight="600"
                  mb={1.5}
                  lineHeight="1"
                  color="white"
                >
                  Customer Care
                </Box> */}

                  <div>
                    {/* {customerCareLinks.map((item, ind) => (
                    <Link href="/" key={ind} passHref legacyBehavior>
                      <StyledLink>{item}</StyledLink>
                    </Link>
                  ))} */}
                    <Link
                      href="http://www.rupalionline.info/ReturnPolicy.aspx"
                      passHref
                      legacyBehavior
                      target="_blank"
                    >
                      <StyledLink>RETURN POLICY</StyledLink>
                    </Link>
                    <Link
                      href="/howtoreturn"
                      passHref
                      legacyBehavior
                      target="_blank"
                    >
                      <StyledLink>HOW TO RETURN?</StyledLink>
                    </Link>
                    <Link
                      href="http://rupalionline.info/PrivacyNotice.aspx"
                      passHref
                      legacyBehavior
                      target="_blank"
                    >
                      <StyledLink>PRIVACY NOTICE</StyledLink>
                    </Link>
                    <Link
                      href="http://rupalionline.info/TermsandConditions.aspx"
                      passHref
                      legacyBehavior
                      target="_blank"
                    >
                      <StyledLink>TERMS & CONDITIONS</StyledLink>
                    </Link>
                  </div>
                </Grid>
              </Grid>

              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Box
                  fontSize="18px"
                  fontWeight="600"
                  mb={1.5}
                  lineHeight="1"
                  color="white"
                >
                  Contact Us
                </Box>

                <Box py={0.6} color="grey.500">
                  Unit 17, East Park Road,Leicester LE5 4QA
                </Box>

                <Box py={0.6} color="grey.500">
                  Email: info@rupalionline.com
                </Box>

                <Box py={0.6} mb={2} color="grey.500">
                  Phone: 0116 246 4111
                </Box>

                <FlexBox className="flex" mx={-0.625}>
                  {iconList.map((item, ind) => (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer noopenner"
                      key={ind}
                    >
                      <IconButton
                        sx={{
                          margin: 0.5,
                          fontSize: 12,
                          padding: "10px",
                          backgroundColor: "rgba(0,0,0,0.2)",
                        }}
                      >
                        <item.icon
                          fontSize="inherit"
                          sx={{
                            color: "white",
                          }}
                        />
                      </IconButton>
                    </a>
                  ))}
                </FlexBox>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      <FlexBox justifyContent="center" alignItems="center">
        <FlexBox color="black" alignItems="center" gap={1.5}>
          <Span className="title">
            Copyright © {new Date().getFullYear()} www.rupalionline.com, All
            Rights Reserved{" "}
          </Span>
        </FlexBox>
      </FlexBox>
    </footer>
  );
};

const iconList = [
  {
    icon: Facebook,
    url: "https://www.facebook.com/rupalionline",
  },
  {
    icon: Twitter,
    url: "https://twitter.com/rupalionline",
  },
  {
    icon: Youtube,
    url: "https://www.youtube.com/user/RupaliUK",
  },
  // {
  //   icon: Google,
  //   url: "https://www.google.com/search?q=ui-lib.com"
  // },
  {
    icon: Instagram,
    url: "https://www.instagram.com/rupalionlineofficial/",
  },
];
export default Footer1;
