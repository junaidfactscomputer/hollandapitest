import { Button } from "@mui/material";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Paymentredirect = ({ encryptdoc }) => {
  const { data: session } = useSession();

  const strEncrypt = encryptdoc;

  const buttonRef = useRef(null);
  const router = useRouter();

  const onBtnClick = () => {
    if (session?.user) {
      const redirecrurl = `/api/paymentsuccess?loginid=${session?.user._id}&name=${session?.user.name}&email=${session?.user.email}&crypt=${strEncrypt}`;
      router.push(redirecrurl);
    }
  };

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.click();
    }
  }, [session]);
  return (
    <div>
      <Button
        ref={buttonRef}
        fullWidth
        type="submit"
        color="primary"
        variant="contained"
        onClick={onBtnClick}
        sx={{
          mt: 3,
        }}
      >
        Redirect Now
      </Button>

      <div>
        <h1>
          Redirecting to Confirmation page in 5 seconds...If not Please Press on
          Redirect Now
        </h1>
      </div>
    </div>
  );
};
export async function getServerSideProps(context) {
  const cryptdoc = context.query.crypt;
  return {
    props: {
      encryptdoc: cryptdoc,
    },
  };
}

export default Paymentredirect;
