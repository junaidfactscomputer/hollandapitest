import { H2 } from "components/Typography";
import { Container, Grid } from "@mui/material";
import CategoryCardTall from "components/category-cards/CategoryCardTall";
import Link from "next/link";
import { FlexRowCenter } from "components/flex-box";
import CategoryCardBox from "components/category-cards/CategoryCardBox";
// ===========================================================

const Section_Categories = ({ categories,isBox}) => {
  return (
    <FlexRowCenter mt={0} flexDirection="column">

    <Container
      sx={{
        mt: 0.5,
        mx:0.5,
        alignSelf:'center',
        alignItems:'center',
      }}
      maxWidth={false}
      disableGutters
    >
      {/* <H2 textAlign="center" mb={2}>
        Best selling Categories
      </H2> */}

      <Grid  container spacing={0.5} >
        {categories.map((item, index) => (
          //g={2} md={3} sm={4} xs={6} key={index}
          <Grid item md={3} sm={6} xs={6} key={index}  >
            <Link href={item.slug}>
              {isBox?<CategoryCardBox image={item.image} title={item.name} />
              :<CategoryCardTall image={item.image} title={item.name} />}
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
    </FlexRowCenter>
  );
};
export default Section_Categories;
