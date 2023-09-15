import axios from "axios";
import getConfig from "next/config";

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
const apiurl = publicRuntimeConfig.factsApiUrl + "Page/getopensection";
// get all product slug

const getSlugs = async () => {
  const response = await axios.get("/api/products/slug-list");
  return response.data;
};

export const getfilteredProducts = async (
  params,
  varpageno,
  varfilter,
  varsort
) => {
  try {
    const cat = params[0];
    const subcat = params[1];
    let intpageNo = varpageno ? parseInt(varpageno) : 1;
    let varnType = 0;
    if (varpageno > 1) varnType = 2;

    const response = await axios.post(
      apiurl,
      {
        containerId: ["CollectionProducts"],
        strCustomCategorySeoUrlKey: subcat,
        nType: varnType,
        nPageNo: intpageNo,
        nItemsPerPage: 100,
        strDynamicFilterString: varfilter ?? "",
        strDynamicSortOrder: varsort ?? "",
        strLastSelectedGroupCode: "",
      },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    return response.data[0].data.products;
  } catch {
    return null;
  }

  //const data = await res.json();
};
//GET PRODUCT DETAILS
export const getProductDetails = async (params, userId) => {
  const param1 = params[0];
  const param2 = params[1].substring(0, params[1].length - 3);
  const colorcode = params[1].substring(params[1].length - 2, params[1].length);

  const response = await axios.post(
    apiurl,
    {
      containerId: ["ProductDetails"],
      strProductSeoUrl: param2,
      strCustomCategoryUrlKey: param1,
      strProductUrl: param2,
      strCustomCategorySeoUrlKey: param1,
      DefaultColorCode: colorcode ?? "",
      strColourCode: colorcode ?? "",
      strLoginId: "",
    },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );

  return response.data[0].data;
};
//Mini cart

export const getCartDetail = async (userId) => {
  const response = await axios.post(
    apiurl,
    {
      containerId: ["getcart"],
      strUserId: userId,
    },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );

  return response.data[0].data.getcart;
};

export const confirmOrder = async () => {
  const response = await axios.post(
    apiurl,
    {
      containerId: ["confirmcart"],
    },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  return response.data[0].data;
};

// search products
export const searchProducts = async (name, category) => {
  const response = await axios.post(
    apiurl,
    {
      containerId: ["ProductSearch"],
      strSearchText: name,
    },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  return response.data[0].data.productsearch;

  // const response = await axios.get("/api/products/search", {
  //   params: {
  //     name,
  //     category,
  //   },
  // });
  // return response.data;
};

export const getSearchProducts = async (param) => {
  const response = await axios.post(
    apiurl,
    {
      containerId: ["SearchProductList"],
      LoginId: "",
      nType: 0,
      strSearchText: param,
    },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );

  return response.data[0].data.productsearchlist;
};
export const getSizeChart = async (productId) => {
  const response = await axios.post(
    apiurl,
    {
      containerId: ["getSizeChart"],
      strProductDocNo: productId,
    },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );

  return response.data[0].data.sizechart;
};

export const getholexProducts = async (
  params,
  varpageno,
  varfilter,
  varsort
) => {
  // const cat = params[0];
  // const subcat = params[1];

  let intpageNo = varpageno ? parseInt(varpageno) : 1;
  let varnType = 0;
  if (varpageno > 1) varnType = 2;

  const response = await axios.post(
    apiurl,
    {
      containerId: ["CollectionProducts"],
      strCustomCategorySeoUrlKey: "tops-kurtis",
      nType: 2,
      nPageNo: 2,
      nItemsPerPage: 100,
      strDynamicFilterString: "",
      strDynamicSortOrder: "",
      strLastSelectedGroupCode: "",
    },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  return await response.data[0].data.products.Table;

  //const data = await res.json();
};

export const getProductDetailsHolex = async (params, userId) => {
  const param1 = params[0];
  // const param2 = params[1].substring(0, params[1].length - 3);
  // const colorcode = params[1].substring(params[1].length - 2, params[1].length);

  const response = await axios.post(
    apiurl,
    {
      containerId: ["ProductDetails"],
      strProductSeoUrl: param1,
      strCustomCategoryUrlKey: param1,
      strProductUrl: "",
      strCustomCategorySeoUrlKey: param1,
      DefaultColorCode: "",
      strColourCode: "",
      strLoginId: "",
    },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );

  return response.data[0].data;
};

export default {
  getSlugs,
  searchProducts,
  getfilteredProducts,
  getProductDetails,
  getCartDetail,
  getSearchProducts,
  getSizeChart,
  confirmOrder,
  getholexProducts,
  getProductDetailsHolex,
};
