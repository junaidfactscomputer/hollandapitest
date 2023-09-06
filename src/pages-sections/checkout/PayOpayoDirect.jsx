import getConfig from "next/config";
import { Button } from "@mui/material";
import crypto from "crypto";

const { publicRuntimeConfig } = getConfig();
const merchantIdOpayo = publicRuntimeConfig.merchantIdOpayo;
const sharedSecretOpayo = publicRuntimeConfig.sharedSecretOpayo;
const redirectUrlOpayo = publicRuntimeConfig.redirectUrlOpayo;
//https://test.sagepay.com/gateway/service/vspdirect-register.vsp
//https://test.sagepay.com/gateway/service/direct3dcallback.vsp
//https://test.sagepay.com/gateway/service/complete.vsp

//{this.props.acsUrl}

const orderid = "test1000201";
const amount = "100001";
const currentDate = new Date();
const formattedDate = `${currentDate.getFullYear()}${(
  currentDate.getMonth() + 1
)
  .toString()
  .padStart(2, "0")}${currentDate
  .getDate()
  .toString()
  .padStart(2, "0")}${currentDate
  .getHours()
  .toString()
  .padStart(2, "0")}${currentDate
  .getMinutes()
  .toString()
  .padStart(2, "0")}${currentDate.getSeconds().toString().padStart(2, "0")}`;

console.log(formattedDate);
const sha1input = `.${merchantIdOpayo}.${orderid}.${amount}.GBP.FALSE`;
// /20230501160833
//".Merchant ID.N6qsk4kYRZihmPrTXWYS6g.1001.EUR.FALSE"

const hashCode = crypto.createHash("sha1").update(sha1input).digest("hex");
const hashCodeFinal = crypto
  .createHash("sha1")
  .update(hashCode + "." + sharedSecretOpayo)
  .digest("hex");
console.log(sha1input);
console.log(hashCode + "." + sharedSecretOpayo);
console.log(hashCodeFinal);
const PayOpayoDirect = () => {
  return (
    <div>
      {/* target="iframe" */}
      <form action="https://pay.elavonpaymentgateway.com/pay" method="POST">
        <input type="hidden" name="TIMESTAMP" value={formattedDate} />
        <input type="hidden" name="MERCHANT_ID" value={merchantIdOpayo} />
        <input type="hidden" name="ACCOUNT" value="internet" />
        <input type="hidden" name="ORDER_ID" value={orderid} />
        <input type="hidden" name="AMOUNT" value={amount} />
        <input type="hidden" name="CURRENCY" value="GBP" />
        <input type="hidden" name="SHA1HASH" value={hashCodeFinal} />
        <input type="hidden" name="AUTO_SETTLE_FLAG" value="1" />
        <input type="hidden" name="HPP_VERSION" value="2" />

        <input
          type="hidden"
          name="HPP_CUSTOMER_EMAIL"
          value="test@example.com"
        />
        <input
          type="hidden"
          name="HPP_CUSTOMER_PHONENUMBER_MOBILE"
          value="44|789456123"
        />
        <input type="hidden" name="HPP_BILLING_STREET1" value="Flat 123" />
        <input type="hidden" name="HPP_BILLING_STREET2" value="House 456" />
        <input type="hidden" name="HPP_BILLING_STREET3" value="Unit 4" />
        <input type="hidden" name="HPP_BILLING_CITY" value="Halifax" />
        <input type="hidden" name="HPP_BILLING_POSTALCODE" value="W5 9HR" />
        <input type="hidden" name="HPP_BILLING_COUNTRY" value="826" />

        {/* <input
          type="hidden"
          name="HPP_POST_DIMENSIONS"
          value="https://www.example.com"
        />
        <input
          type="hidden"
          name="HPP_POST_RESPONSE"
          value="https://www.example.com"
        /> */}

        <input
          type="hidden"
          name="MERCHANT_RESPONSE_URL"
          value={redirectUrlOpayo}
        />

        <Button
          fullWidth
          type="submit"
          color="primary"
          variant="contained"
          sx={{
            mt: 3,
          }}
        >
          Pay Now
        </Button>
      </form>

      {/* <iframe src="/3DRedirect.jsp" name="3Diframe">
        <form
          action="https://test.sagepay.com/gateway/service/vspdirect-register.vsp"
          method="post"
        >
          <input type="hidden" name="creq" value={this.props.creq} />
          <input
            type="hidden"
            name="threeDSSessionData"
            value={this.props.threeDSSessionData}
          />
          <p>Click Go to proceed to 3D secure.</p>
          <button type="submit">Go</button>

          
        </form>
      </iframe> */}
    </div>
  );
};
export default PayOpayoDirect;
