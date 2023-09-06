import CryptoJS from "crypto-js";
import api from "utils/__api__/users";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();
const gatewaySecret = serverRuntimeConfig.gatewaySecret;
const paymentSuccessUrl = serverRuntimeConfig.paymentSuccessUrl;
const paymentFailUrl = serverRuntimeConfig.paymentFailUrl;

function encryptStringWithAES_CBC_PKCS5(text, password) {
  const key = CryptoJS.enc.Utf8.parse(password);
  const iv = CryptoJS.enc.Utf8.parse(password);

  const encrypted = CryptoJS.AES.encrypt(text, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return encrypted.ciphertext.toString(CryptoJS.enc.Hex).toUpperCase();
}

const handler = async function (req, res) {
  // Collect parameters sent by the payment gateway
  try {
    if (req.query.loginid) {
      const userid = req.query.loginid;
      const deliveryOption = req.query.deloption;
      const response = await api.getCheckout(userid);
      const userdetails = response.getuserdetails[0];
      const netamount = response.getcartcheckout.Table1;
      const delOoption = deliveryOption ?? "";
      // response.getcartcheckout.Table3[0].Description ?? "Standard";

      const delcharge =
        response.getcartcheckout.Table3.filter(
          (item) => item.Code === delOoption
        )[0].Rate ?? 0;
      const sumnetamount = netamount.reduce(
        (total, item) => parseFloat(total) + parseFloat(item.Amount),
        0
      );
      const nettotal = parseFloat(sumnetamount) + parseFloat(delcharge);
      //const netamount = response.getcartsummary.Table[0].TOTAL_AMOUNT;
      const resppay = await api.getProceedPay(
        userdetails,
        sumnetamount,
        delcharge,
        nettotal,
        delOoption,
        userid
      );
      const docNo = resppay.paymentprocess.Table1[0].DocNo;
      const amount = nettotal;
      //  const amount = Math.floor(cartamount * 100);
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear().toString().slice(-2);
      const random = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
      const strDocNo = docNo; // Replace with your desired document number

      const documentNumber =
        "WOI" + currentYear + "-" + random + "-" + strDocNo.trim();

      const inputString =
        // "VendorTxCode=WOI-111-478722&Amount=227.00&Currency=GBP&Description=Rupali Online Payment&SuccessURL=https://www.rupalionline.com/CheckoutSuccess&FailureURL=https://www.rupalionline.com/CheckoutFailed&CustomerName=junaid test&CustomerEMail=junaidv.facts@gmail.com&SendEMail=1&BillingSurname=test&BillingFirstnames=junaid&BillingAddress1=ex101&BillingAddress2=add line2&BillingCity=dxb&BillingPostCode=111&BillingCountry=&DeliverySurname=test&DeliveryFirstnames=junaid&DeliveryAddress1=ex101&DeliveryAddress2=add line2&DeliveryCity=dxb&DeliveryPostCode=111&DeliveryCountry=&COFUsage=FIRST&InitiatedType=CIT";
        `VendorTxCode=${documentNumber}&Amount=${amount}&Currency=GBP&Description=Rupali Online Payment&SuccessURL=${paymentSuccessUrl}&FailureURL=${paymentFailUrl}&CustomerName=${userdetails.OCM_BTO_FIRST_NAME}&CustomerEMail=${userdetails.OCM_EMAIL}&SendEMail=1&BillingSurname=${userdetails.OCM_BTO_LAST_NAME}&BillingFirstnames=${userdetails.OCM_BTO_FIRST_NAME}&BillingAddress1=${userdetails.OCM_BTO_ADDRESS1}&BillingAddress2=${userdetails.OCM_BTO_ADDRESS2}&BillingCity=${userdetails.OCM_BTO_CITY}&BillingPostCode=${userdetails.OCM_BTO_POST_CODE}&BillingCountry=GB&DeliverySurname=${userdetails.OCM_BTO_LAST_NAME}&DeliveryFirstnames=${userdetails.OCM_BTO_FIRST_NAME}&DeliveryAddress1=${userdetails.OCM_BTO_ADDRESS1}&DeliveryAddress2=${userdetails.OCM_BTO_ADDRESS2}&DeliveryCity=${userdetails.OCM_BTO_CITY}&DeliveryPostCode=${userdetails.OCM_BTO_POST_CODE}&DeliveryCountry=GB&COFUsage=FIRST&InitiatedType=CIT`;

      const encryptedText = encryptStringWithAES_CBC_PKCS5(
        inputString,
        gatewaySecret
      );
      //"4Haa9yQtDxu63t92" //"OmlyOkOJrbH1UvJk"
      const encryptedString = "@" + encryptedText;
      //  Redirect the user
      if (encryptedString)
        return res.redirect(307, `/paymentredirect/${encryptedString}`);
    } else {
      return res.redirect(307, "/");
    }
  } catch (error) {
    console.error(error);

    return res.redirect(307, "/");
    // Handle the error and send an appropriate response
    // return res.status(500).json({ error: "Something went wrong" });
  }
};

export default handler;
