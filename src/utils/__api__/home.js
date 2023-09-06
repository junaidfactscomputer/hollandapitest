import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const apiurl = publicRuntimeConfig.factsApiUrl + "Page/getopensection";

const getHomeCards = async () => {
  const response = await axios.post(
    apiurl,
    {
      containerId: ["CollectionHome"],
    },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );

  return response.data[0].data.homecards;
};

const getTopCategories = async () => {
  const response = await axios.post(
    apiurl,
    {
      containerId: ["TopCategories"],
    },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  const filteredCat=response.data[0].data.topcategory.filter((v)=>v.name!=='CATERING')
  return filteredCat;
};

const getBlogs = async () => {
  const response = await axios.get("/api/fashion-shop-2/blogs");
  return response.data;
};
export default {
  getHomeCards,
  getBlogs,
  getTopCategories,
};
