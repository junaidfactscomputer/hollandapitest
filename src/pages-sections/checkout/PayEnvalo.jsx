const PayEnvalo = () => {
  return (
    <>
      <form
        action="https://pay.sandbox.elavonpaymentgateway.com/pay"
        method="POST"
        target="iframe"
      >
        {/* form fields go here */}
      </form>
      <iframe name="iframe" style={{ display: "none" }}></iframe>
    </>
  );
};
export default PayEnvalo;
