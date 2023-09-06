import categoriesMegaMenu from "./categoriesMegaMenu";

// MEGAMENU DATA
const megaMenus = [
  [
    {
      title: "Categories",
      child: [
        {
          title: "Market 1",
          url: "/market-1",
        },
        {
          title: "Furniture",
          url: "/furniture-shop",
        },
        {
          title: "Grocery-v1",
          url: "/grocery1",
        },
        {
          title: "Grocery-v2",
          url: "/grocery2",
        },
        {
          title: "Grocery-v3",
          url: "/grocery3",
        },
      ],
    },
  ],
  [
    {
      title: "User Account",
      child: [
        {
          title: "Order List",
          url: "/orders",
        },
        {
          title: "View Profile",
          url: "/profile",
        },
      ],
    },
  ],
];

// MAIN NAVIGATION DATA
const navbarNavigations = [
  {
    title: "WOMEN",
    child: [
      {
        title: "SUITS",
        url: "/shop/women-fashion/churidar-salwar-trouser-suits",
      },
      {
        title: "LEHENGAS",
        url: "/shop/women-fashion/bridal-lehenga",
      },
      ,
      {
        title: "SAREE BLOUSE",
        url: "/shop/women-fashion/saree-blouse",
      },
      {
        title: "KURTIS & TOPS",
        url: "/shop/women-fashion/tops-kurtis",
      },
      {
        title: "LEGGINGS & SALWAR",
        url: "/shop/women-fashion/leggings-salwar",
      },
      {
        title: "SCARF",
        url: "/shop/women-fashion/stole-scarf",
      },
    ],
  },
  {
    title: "MEN",
    child: [
      {
        title: "SHERWANI & KURTA PAJAMA",
        url: "/shop/men-fashion/men-fashion-sherwani",
      },
      {
        title: "MENS DUPATTA",
        url: "/shop/men-fashion/scarf",
      },
    ],
  },
  {
    title: "KIDS",
    child: [
      {
        title: "GIRLS SUITS AND DRESS",
        url: "/shop/girls-fashion/girls-churidar-suits",
      },
      {
        title: "GIRLS LEGGINGS",
        url: "/shop/girls-fashion/girls-leggings",
      },
      {
        title: "ACCESSORIES",
        url: "/shop/girls-fashion/girls-jewellery-accessories",
      },
      {
        title: "BOYS KURTA AND PAJAMA",
        url: "/shop/boys-fashion/boys-kurta-pajama",
      },
    ],
  },
  {
    title: "JEWELLERY",
    child: [
      {
        title: "NECKLACE SET",
        url: "/shop/jewellery/necklace-sets",
      },
      {
        title: "BANGLES",
        url: "/shop/jewellery/bangles",
      },
      {
        title: "EAR RINGS",
        url: "/shop/jewellery/ear-rings",
      },
      {
        title: "FINGER RINGS",
        url: "/shop/jewellery/finger-rings",
      },
      {
        title: "PASSA JHUMAR",
        url: "/shop/accessories/passa-jhumar",
      },
      {
        title: "HAIR PINS",
        url: "/shop/accessories/hair-pins-clip-decor",
      },
      {
        title: "BINDI AND BODY DECOR",
        url: "/shop/jewellery/bindi-body-decor",
      },
    ],
  },
  {
    title: "ACCESSORIES",
    child: [
      {
        title: "BAGS AND PURSES",
        url: "/shop/accessories/bags-purses",
      },
      {
        title: "DANDIYA",
        url: "/shop/accessories/dandiya",
      },
      {
        title: "HAIR PINS",
        url: "/shop/accessories/hair-pins-clip-decor",
      },
    ],
  },
  {
    title: "FOR HOME- TANCHOI",
    child: [
      {
        title: "CUSHIONS",
        url: "/shop/furnishing/cushions-shop",
      },
      {
        title: "BEDDING SETS",
        url: "/shop/furnishing/bedding-sets",
      },
      {
        title: "BED SPREADS AND THROWS",
        url: "/shop/furnishing/bed-spreads-throws",
      },
      {
        title: "STOOLS",
        url: "/shop/furniture/sitting-stools",
      },
      {
        title: "CHAIRS AND SOFAS",
        url: "/shop/furniture/chairs-and-sofas",
      },
      {
        title: "PHOTO FRAMES",
        url: "/shop/home-decor/gifts-photo-frame",
      },
      {
        title: "GIFTS SETS",
        url: "/shop/home-decor/gifts-set",
      },
      {
        title: "HANDMADE DECOR",
        url: "/shop/home-decor/handmade-decor",
      },
    ],
  },
  {
    megaMenu: false,
    megaMenuWithSub: false,
      title: "Cart",
      url: "/cart",
    
  },
];
export default navbarNavigations;
