import axios from "axios";
import getConfig from "next/config";
import CryptoJS from "crypto-js";

const { publicRuntimeConfig } = getConfig();
const apiurl = publicRuntimeConfig.factsApiUrl + "Page/getopensection";

const decryptHexToString = (encryptedHexString, key, iv) => {
  const encryptedBytes = CryptoJS.enc.Hex.parse(encryptedHexString);
  const decryptedBytes = CryptoJS.AES.decrypt(
    { ciphertext: encryptedBytes },
    CryptoJS.enc.Utf8.parse(key),
    {
      iv: CryptoJS.enc.Utf8.parse(iv),
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    }
  );

  const decryptedString = CryptoJS.enc.Utf8.stringify(decryptedBytes);
  return decryptedString;
};

const extractValue = (queryString, key) => {
  const regex = new RegExp(`${key}=([^&]*)`);
  const match = queryString.match(regex);
  return match ? match[1] : "";
};

const handler = async function (req, res) {
  // Collect parameters sent by the payment gateway
  try {
    if (req.query.crypt) {
      const encryptedString = req.query.crypt;
      const key = "4Haa9yQtDxu63t92";
      const iv = "4Haa9yQtDxu63t92";

      const decryptedString = decryptHexToString(
        encryptedString.slice(1),
        key,
        iv
      );

      const custId = req.query.loginid;
      const custName = req.query.name;
      const Amount = extractValue(decryptedString, "Amount");
      const vendorTxCode = extractValue(decryptedString, "VendorTxCode");
      const parts = vendorTxCode.split("-");
      const DocNo = parts[parts.length - 1];

      const Status = extractValue(decryptedString, "Status");
      const StatusDetail = extractValue(decryptedString, "StatusDetail");
      const TxAuthNo = extractValue(decryptedString, "TxAuthNo");
      const CAVV = extractValue(decryptedString, "CAVV");

      const AVSCV2 = extractValue(decryptedString, "AVSCV2");
      const CV2Result = extractValue(decryptedString, "CV2Result");
      const threeDSecureStatus = extractValue(
        decryptedString,
        "3DSecureStatus"
      );
      const PayerStatus = extractValue(decryptedString, "PayerStatus");

      const CardType = extractValue(decryptedString, "CardType");
      const Last4Digits = extractValue(decryptedString, "Last4Digits");
      const BankAuthCode = extractValue(decryptedString, "BankAuthCode");
      //  const ACSTransID = extractValue(decryptedString, 'ACSTransID');
      //  const SchemeTraceID = extractValue(decryptedString, 'SchemeTraceID');

      const AddressResult = extractValue(decryptedString, "AddressResult");
      const PostCodeResult = extractValue(decryptedString, "PostCodeResult");

      //  Send parameters to another API

      const response = await axios.post(
        apiurl,
        {
          containerId: ["paymentFinal"],
          strDocNo: DocNo,
          iOrderAction: 1,
          strVendorTranId: vendorTxCode,
          strProvider: "SagePay",
          strCardHolderName: custName,
          strCardNumber: Last4Digits,
          strCardType: CardType,
          strStatus: Status,
          strStatusDetails: StatusDetail,
          strTxId: TxAuthNo,
          strSecKey: CAVV,
          nAuthNo: BankAuthCode,
          strAvsCv2: AVSCV2,
          strAddrResult: AddressResult,
          strPostCodeResult: PostCodeResult,
          strCv2Result: CV2Result,
          str3DResult: threeDSecureStatus,
          nSubTotal: 0,
          nDeliveryCharge: 0, //NOT USED IN PROCEDURE
          nOrderTotal: parseFloat(Amount),
          strLoginId: custId,
          strCouponCode: "",
          strRedeemPoints: "",
          nRedeemAmt: 0,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );

      const result = response.data[0].data.paymentfinalise[0].DocNo;
      const userEmail = req.query.email;
      if (result) {
        // return res.redirect(
        //   307,
        //   `/orderconfirm/${result}?loginid=${custId}&email=${userEmail}`
        // );

        res.writeHead(301, {
          Location: `/orderconfirm/${result}?loginid=${custId}&email=${userEmail}`,
        });
        res.end();
      }
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
