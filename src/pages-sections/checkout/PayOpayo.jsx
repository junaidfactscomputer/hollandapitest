import { Client } from "@mhayk/sagepay";
import getConfig from "next/config";
import { Button } from "@mui/material";
//import { TransactionService } from "opayo-form-integration-js";

const { publicRuntimeConfig } = getConfig();
const opayoVendorName = publicRuntimeConfig.opayoVendorName;
const opayoIntegrationKey = publicRuntimeConfig.opayoIntegrationKey;
const opayoIntegrationPassword = publicRuntimeConfig.opayoIntegrationPassword;
const PayOpayo = () => {
  // Gets Access Token stored in environment variable

  const handleClick = async () => {
    const client = new Client({
      vendor_name: opayoVendorName,
      integration_key: opayoIntegrationKey,
      integration_password: opayoIntegrationPassword,
      environment: "sandbox",
      card: "007",
      //aEpZeHN3N0hMYmo0MGNCOHVkRVM4Q0RSRkxodUo4RzU0TzZyRHBVWHZFNmhZRHJyaWE6bzJpSFNyRnliWU1acG1XT1FNdWhzWFA1MlY0ZkJ0cHVTRHNocktEU1dzQlkxT2lONmh3ZDlLYjEyejRqNVVzNXU=
    });
    console.log(client);

    const merchant = await client.merchant_session_keys.create({
      vendorName: opayoVendorName,
    });
    const merckey = "78EC3C5A-5FD9-4CF8-B93E-E1976EA0B2D1";

    const { expiry, merchantSessionKey } = merchant;
    console.log(
      `Expiry: ${expiry}, Merchant Session Key: ${merchantSessionKey}`
    );

    client.merchantSessionKey = merchantSessionKey;

    const card = {
      cardDetails: {
        cardholderName: "TEST",
        cardNumber: "4929000000006",
        expiryDate: "0824",
        securityCode: "123",
      },
    };
    const newCardIdentifier = await client.card_identifiers.create(card);
    const { cardIdentifier } = newCardIdentifier;
    console.log(`Card Identifier: ${cardIdentifier}`);

    const payment = {
      transactionType: "Payment",
      paymentMethod: {
        card: {
          merchantSessionKey,
          cardIdentifier,
        },
      },
      vendorTxCode: "factstest10003",
      amount: 100,
      currency: "GBP",
      description: "facts TEST LIBRARY",
      customerFirstName: "facts WHANDSON",
      customerLastName: "test",
      billingAddress: {
        address1: "11, Worton Road",
        city: "London",
        postalCode: "TW7 6HJ",
        country: "GB",
      },
    };

    const paymentResult = await client.transactions.create(payment);
    console.log(paymentResult);
  };

  //const transaction = await client.transactions.create(payment);
  //return transaction;
  //console.log(transaction);

  return (
    <div>
      <Button
        fullWidth
        type="submit"
        color="primary"
        variant="contained"
        sx={{
          mt: 3,
        }}
        onClick={handleClick}
      >
        Pay Now
      </Button>
    </div>
  );
};
export default PayOpayo;

// import { OpayoDropin } from "react-opayopi-dropin";
// import OpayoPi from "@opencollective/opayopi";
// import { useState } from "react";

// const opayo = new OpayoPi({
//   integrationKey: "dq9w6WkkdD2y8k3t4olqu8H6a0vtt3IY7VEsGhAtacbCZ2b5Ud",
//   integrationPassword:
//     "hno3JTEwDHy7hJckU4WuxfeTrjD0N92pIaituQBw5Mtj7RG3V8zOdHCSPKwJ02wAV",
//   environment: "sandboxEC", // or 'live'
// });

// const PayOpayo = ({ userAddress }) => {
//   const [token, setToken] = useState(null);

//   return (
//     <div>
//       <OpayoDropin
//         opayopi={opayo}
//         onTokenize={({ token }) => setToken(token)}
//       />
//       <button
//         onClick={async () => {
//           const paymentResult = await opayo.createPayment({
//             paymentMethod: {
//               type: "card",
//               card: {
//                 token: token,
//               },
//             },
//             transaction: {
//               amount: 1000, // in pence
//               currency: "GBP",
//               address1: "88",
//               postalCode: "412",
//             },
//           });
//         }}
//       >
//         Pay
//       </button>
//     </div>
//   );
// };
// export default PayOpayo;
