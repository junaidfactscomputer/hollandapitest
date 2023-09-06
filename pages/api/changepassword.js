import nodemailer from "nodemailer";

const handler = async function (req, res) {
  if (req.method === "POST") {
    try {
      const { userName, to, subject, text, html } = req.body;
      const Email = to;
      const emailContent = `
      <html>
      <head></head>
      <body>
        <table
        style="background-position: center bottom; width: 647px; background-repeat: no-repeat;height: 186px"
        >
          <tr>
            <td style="width: 7px; height: 4px"></td>
            <td style="vertical-align: top; width: 620px; height: 4px; text-align: right"
            >
              <img src="http://rupaliukemailimages.rupalionline.co.uk/LoginHeader.jpg" />
            </td>
            <td style="height: 4px"></td>
          </tr>
          <tr>
            <td style="width: 7px; height: 4px"></td>
            <td
            style="font-weight: normal; font-size: 10pt; width: 620px; color: #001533; font-family: Verdana, Arial;height: 4px; background-color: transparent"
            >
              <br />
              You have successfully updated the password of your RupaliOnline account.
              <br />
              <br />
              User Name: ${userName}
              <br />
              <br />
              <br />
              If you did not authorize this change or if you need assistance with your account, please click on 
              <a href='https://www.rupalionline.com/ContactUs'>contact us</a>.
              <br />
              Thank you for shopping with Rupalionline.
              <br />
              <br />
              We hope you enjoy shopping with us.
              <br />
              <br />
              <br />
              Kind regards,
            </td>
            <td style="height: 4px"</td>
          </tr>
          <tr>
            <td style="width: 7px; height: 35px"></td>
            <td
            style="font-weight: normal; font-size: 10pt; width: 620px; color: #250000; font-family: Verdana, Arial;height: 35px; background-color: transparent"
            >
              Rupali Customer Services
              <br />
              Shop online at <a href='https://www.rupalionline.com'>www.rupalionline.com</a>
              <br />
              <br />
            </td>
            <td style="height: 35px"></td>
          </tr>
          <tr>
            <td style="width: 7px; height: 4px"></td>
            <td
            style="font-weight: normal; font-size: 10pt; width: 620px; color: dimgray; font-family: Verdana, Arial;height: 4px"
            >
              <span
              style="font-size: 8pt; color: #365f91; font-family: 'Verdana, Arial','sans-serif';mso-fareast-font-family: 'Times New Roman'; mso-fareast-theme-font: minor-fareast;mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA\"
              >
                Please note that this email was sent from a notification-only address. That is unable to accept incoming email.
                <br />
                The information contained in this electronic message and any attachments to this message are intended for the
                exclusive use of the addressee(s) and may contain proprietary, confidential, or privileged information. If you are
                not the intended recipient, you should not disseminate, distribute, or copy this e-mail. Please notify the sender
                immediately and destroy all copies of this message and any attachments.
              </span>
              <span
              style="font-size: 7pt; color: black; font-family: 'Arial','sans-serif'; mso-fareast-font-family: 'Times New Roman';mso-fareast-theme-font: minor-fareast; mso-ansi-language: EN-US; mso-fareast-language: EN-US;mso-bidi-language: AR-SA"
              >
               
              </span>
              <br />
            </td>
            <td style="height: 4px"></td>
          </tr>
          <tr>
            <td style="width: 7px; height: 4px"></td>
            <td
            style="font-weight: normal; font-size: 9pt; width: 620px; color: #250000; font-family: Verdana, Arial;height: 35px"
            >
              Veema UK Ltd. t/s Rupali,
              <br />
              157 Greenlane Road, Leicester, LE5 4XU,
              <br />
              Contact telephone: 0116 246 4111.
            </td>
            <td style="height: 4px"></td>
          </tr>
          <tr>
            <td style="width: 7px; height: 4px"></td>
            <td style="width: 620px; height: 4px">
              <img src="http://rupaliukemailimages.rupalionline.co.uk/RegisterBottom.jpg" />
            </td>
            <td style="height: 4px"></td>
          </tr>
        </table>
      </body>
    </html>
          `;
      try {
        const transporter = nodemailer.createTransport({
          host: "auth.smtp.1and1.co.uk",
          port: 587,
          tls: {
            rejectUnauthorized: true,
            minVersion: "TLSv1.2",
          },
          auth: {
            user: "info@rupalionline.com",
            pass: "GreenLaneRoad",
          },
        });

        // // Define the email options
        const mailOptions = {
          from: "info@rupalionline.com",
          to: Email,
          subject: subject,
          text: text,
          html: emailContent,
        };

        await transporter.sendMail(mailOptions);
      } catch {}

      return res.status(200);
    } catch {}
  }
};
export default handler;
