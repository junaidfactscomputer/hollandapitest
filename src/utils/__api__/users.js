import axios from "axios";
import getConfig from "next/config";

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
const apiurl = publicRuntimeConfig.factsApiUrl + "Page/getopensection";

export const getUserIds = async () => {
  const response = await axios.get("/api/user-list/id-list");
  return response.data;
};

export const getUser = async (userId) => {
  const response = await axios.post(
    apiurl,
    {
      containerId: ["getuserprofile"],
      strUserId: userId,
    },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  return response.data[0].data;
};

export const registerCustomer = async (userInfo) => {
  const response = await axios.post(
    apiurl,
    {
      containerId: ["savecustomer"],
      strEMail: userInfo.email,
      strPassword: userInfo.password,
      strFirstName: userInfo.first_name,
      strLastName: userInfo.last_name,
      strHouseNo: userInfo.house_no ?? "",
      strAddress1: userInfo.address1,
      strAddress2: userInfo.address2 ?? "",
      strTown: userInfo.town ?? "",
      strCounty: userInfo.county ?? "",
      strPostCode: userInfo.post_code ?? "",
      strCountry: userInfo.country,
      strPhoneNo: userInfo.main_phone,
      strMobileNo: userInfo.alternate_phone ?? "",
    },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );

  if (response.data[0].data.savecustomer.length > 0) {
    return response.data[0].data.savecustomer;
  } else throw new Error("Enter valid data");
};

export const forgotPassword = async (email, password) => {
  const response = await axios.post(
    apiurl,
    {
      containerId: ["forgotpassword"],
      strEmailId: email,
      strPassword: password ?? "0",
      NewPassword: "",
    },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );

  if (response.data[0].data.forgotpassword) {
    return response.data[0].data.forgotpassword;
  } else return new Error("Enter valid data");
};

export const changePassword = async (userId, password, newpassword) => {
  const response = await axios.post(
    apiurl,
    {
      containerId: ["changepassword"],
      strLoginId: userId,
      strPassword: password ?? "0",
      strDecryptedPassword: newpassword ?? "0",
      strCurrentPassword: "",
      strNewPassword: "",
      strRetypePassword: "",
    },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );

  if (response.data[0].data.changepassword) {
    return response.data[0].data.changepassword;
  } else return new Error("Enter valid data");
};

export const updateCustomer = async (userInfo) => {
  const response = await axios.post(
    apiurl,
    {
      containerId: ["updatecustomer"],
      //strEMail: userInfo.email,
      CustomerId: userInfo.userid,
      strFirstName: userInfo.first_name,
      strLastName: userInfo.last_name,
      strHouseNo: userInfo.address,
      strTown: userInfo.city,
      strPostCode: userInfo.post_code,
      strCounty: userInfo.county,
      strPhoneNo: userInfo.contact,
      strMobileNo: userInfo.contact2,
      strAddress1: userInfo.address2,
      strAddress2: userInfo.address3,
      strCountryCode: userInfo.country,
    },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );

  if (response.status === 200) {
    return true;
  } else throw new Error("Enter valid data");
};

export const getPostalcode = async (code) => {
  const response = await axios.get(
    "https://api.postcodes.io/postcodes/" + code
  );

  if (response.data.result) {
    return response.data.result.parliamentary_constituency;
  } else throw new Error("Enter valid data");
};

export const getOrders = async (userId) => {
  const response = await axios.post(
    apiurl,
    {
      containerId: ["orders"],
      strLoginId: userId,
    },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  console.log(response.data);
  return response.data[0].data.orders;
};

export const getOrderDetails = async (params) => {
  const userId = params[0];
  const ordNo = params[1];
  const response = await axios.post(
    apiurl,
    {
      containerId: ["orderdetails"],
      strDocNo: ordNo,
      strLoginId: userId,
    },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  return response.data[0].data.orderdetails;
};

export const getCheckout = async (userId) => {
  const response = await axios.post(
    apiurl,
    {
      containerId: ["getcheckout"],
      strUserId: userId,
    },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  return response.data[0].data;
};

export const getRedirectUser = async (userId) => {
  const response = await axios.post(
    apiurl,
    {
      containerId: ["getRedirectUser"],
      strUserId: userId,
    },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  return response.data[0].data;
};

export const getProceedPay = async (
  useradd,
  sumnetamount,
  delcharge,
  nettotal,
  delOoption,
  userid
) => {
  const response = await axios.post(
    apiurl,
    {
      containerId: ["PaymentProcess"],
      strFirstName: useradd.OCM_BTO_FIRST_NAME,
      strLastName: useradd.OCM_BTO_LAST_NAME,
      strShipToName: useradd.OCM_BTO_FIRST_NAME,
      strAddress1: useradd.OCM_BTO_ADDRESS1,
      strAddress2: useradd.OCM_BTO_ADDRESS2,
      strAddress3: useradd.OCM_BTO_ADDRESS3,
      strAddress4: useradd.OCM_BTO_CITY,
      strCity: useradd.OCM_BTO_CITY,
      strState: useradd.OCM_BTO_PROVINCE_STATE,
      strCountry: useradd.CM_DESC,
      strPostCode: useradd.OCM_BTO_POST_CODE,
      strEmail: useradd.OCM_EMAIL,
      strTelephoneNo: useradd.OCM_MAIN_PHONE,
      strMobileNo: useradd.OCM_ALTERNATIVE_PHONE,
      strDeliveryOption: delOoption,
      nGrossAmt: sumnetamount,
      nDeliveryCharge: delcharge,
      nDiscountAmt: 0,
      nSubTotal: sumnetamount,
      nNetAmt: nettotal,
      strMechineIP: "",
      strCouponCode: "",
      strRemarks: "",
      strLoginId: userid,
    },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );

  return response.data[0].data;
};

// export const getFinalPay = async (
//   useradd,
//   sumnetamount,
//   delcharge,
//   nettotal,
//   delOoption,
//   userid
// ) => {
//   const response = await axios.post(
//     apiurl,
//     {
//       containerId: ["paymentFinal"],
//       strDocNo: "478668",
//       iOrderAction: 1,
//       strVendorTranId: "TESTAOI10-145-10",
//       strProvider: "SagePay",
//       strCardHolderName: "junaid",
//       strCardNumber: "************7512",
//       strCardType: "VISA",
//       strStatus: "OK",
//       strStatusDetails: "0000 : The Authorisation was Successful.",
//       strTxId: "0001{09EF52E9-C003-F376-07FA-953D4498B988}",
//       strSecKey: "L3SCAPHLU",
//       nAuthNo: 1001,
//       strAvsCv2: "ALL MATCH",
//       strAddrResult: "MATCHED",
//       strPostCodeResult: "MATCHED",
//       strCv2Result: "MATCHED",
//       str3DResult: "OK",
//       nSubTotal: 50.0,
//       nDeliveryCharge: 25.0,
//       nOrderTotal: 75.0,
//       strLoginId: "831080",
//       strCouponCode: "",
//       strRedeemPoints: "",
//       nRedeemAmt: 0,
//     },
//     {
//       headers: {
//         "content-type": "application/json",
//       },
//     }
//   );

//   return response.data[0].data;
// };

export default {
  getUser,
  getUserIds,
  registerCustomer,
  forgotPassword,
  changePassword,
  // loginCustomer,
  getPostalcode,
  getCheckout,
  updateCustomer,
  getOrders,
  getOrderDetails,
  getProceedPay,
  // getFinalPay,
};
