//npm install @globalpayments/node-sdk

const globalPayments = require("@globalpayments/node-sdk");

const gp = globalPayments({
  merchantId: "YOUR_MERCHANT_ID",
  accountId: "YOUR_ACCOUNT_ID",
  sharedSecret: "YOUR_SHARED_SECRET",
});

gp.createToken({
  cardNumber: "4111111111111111",
  expirationMonth: "12",
  expirationYear: "2025",
  cvv: "123",
})
  .then((token) => {
    // Use the token to create a payment or store it for future use
  })
  .catch((error) => {
    console.error(error);
  });

gp.createPayment({
  source: {
    token: "TOKEN_CREATED_IN_STEP_3",
  },
  amount: 10.0,
  currency: "USD",
  description: "Test payment",
})
  .then((payment) => {
    // Payment successful, take appropriate action
  })
  .catch((error) => {
    console.error(error);
  });
