import { Button } from "@mui/material";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { fetchData } from "../api/getpayredirect";

const Paymentredirect = ({ encryptdoc }) => {
  const strEncrypt = encryptdoc;

  const buttonRef = useRef(null);
  const router = useRouter();
  useEffect(() => {
    const { asPath } = router;
    if (buttonRef.current) {
      buttonRef.current.click();
    }
  }, []);
  //https://live.sagepay.com/gateway/service/vspform-register.vsp
  return (
    <div>
      <form
        method="post"
        action="https://test.sagepay.com/gateway/service/vspform-register.vsp"
        id="OpayoSubmit"
        name="form1"
      >
        <input type="hidden" name="VPSProtocol" value="4.00" />
        <input type="hidden" name="TxType" value="PAYMENT" />
        <input type="hidden" name="Vendor" value="rupalionline" />
        <input type="hidden" name="Crypt" value={strEncrypt} />

        <Button
          ref={buttonRef}
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
      <div>
        <h1>
          Redirecting to payment page in 5 seconds...If not Please Press on Pay
          Now
        </h1>
      </div>
    </div>
  );
};
export async function getServerSideProps(context) {
  const userid = context.query.loginid;
  const deliveryOption = context.query.deloption;
  const docNo = await fetchData(userid, deliveryOption);
  return {
    props: {
      encryptdoc: docNo,
    },
  };
}

// export async function getServerSideProps(context) {
//   const userid = context.params.id;
//   const response = await api.getCheckout(context.params.id);
//   const useradd = response.getuserdetails[0];
//   const netamount = response.getcartcheckout.Table1;
//   const delOoption =
//     response.getcartcheckout.Table3[0].Description ?? "Standard";
//   const delcharge = response.getcartcheckout.Table3[0].Rate ?? 0;
//   const sumnetamount = netamount.reduce(
//     (total, item) => parseFloat(total) + parseFloat(item.Amount),
//     0
//   );
//   const nettotal = parseFloat(sumnetamount) + parseFloat(delcharge);
//   //const netamount = response.getcartsummary.Table[0].TOTAL_AMOUNT;
//   const resppay = await api.getProceedPay(
//     useradd,
//     sumnetamount,
//     delcharge,
//     nettotal,
//     delOoption,
//     userid
//   );
//   if (resppay) {
//     const docNo = resppay.paymentprocess.Table1[0].DocNo;
//     return {
//       props: {
//         userdetails: useradd,
//         cartamount: nettotal,
//         docNo: docNo,
//       },
//     };
//   }
// }

export default Paymentredirect;
