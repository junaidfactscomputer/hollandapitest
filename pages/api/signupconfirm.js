import nodemailer from "nodemailer";

const handler = async function (req, res) {
  if (req.method === "POST") {
    try {
      const { useremail } = req.body;
      const Email = useremail;
      const emailContent = `
      <html>
        <head></head>
        <body>
          <table style="width: 647px; height: 186px; background-position: center bottom; background-repeat: no-repeat; background-color: transparent;">
            <tr>
              <td style="width: 18px; height: 4px">
                <br />
              </td>
              <td style="width: 603px; height: 4px; vertical-align: top; text-align: right;">
                <img src="http://rupaliukemailimages.rupalionline.co.uk/RegisterHead.jpg" />
              </td>
              <td style="height: 4px">
              </td>
            </tr>
            <tr>
              <td style="width: 18px; height: 4px">
              </td>
              <td style="font-weight: bold; font-size: 11pt; width: 603px; color: #001c3a; font-family: Verdana, Arial; height: 4px">
                <br />
              </td>
              <td style="height: 4px">
              </td>
            </tr>
            <tr>
              <td style="width: 18px; height: 4px">
              </td>
              <td style="font-weight: normal; font-size: 10pt; width: 603px; color: #001533; font-family: Verdana, Arial; height: 4px">
                <br />
                You have registered the following email address: ${Email} <br />
                Thank you for registering with Rupali. You will find the latest designs in our unique collection with exclusive promotional offers.<br />
                <br />
                <br />
                If you need to contact us for further information please click on <a href='https://www.rupalionline.com/ContactUs'>contact us</a>.<br />
                We hope you enjoy shopping with us.<br />
                <br />
                Kind regards,
              </td>
              <td style="height: 4px">
              </td>
            </tr>
            <tr>
              <td style="width: 18px; height: 35px">
              </td>
              <td style="font-weight: normal; font-size: 10pt; width: 603px; color: #250000; font-family: Verdana, Arial; height: 35px">
                Rupali Customer Services<br />
                Shop online at <a href='https://www.rupalionline.com'>www.rupalionline.com</a><br />
                <br />
              </td>
              <td style="height: 35px">
              </td>
            </tr>
            <tr>
              <td style="width: 18px; height: 4px">
              </td>
              <td style="font-weight: normal; font-size: 10pt; width: 603px; color: dimgray; font-family: Verdana, Arial; height: 4px">
                <br />
                <br />
                Please note that this email has been sent from a notification-only address, do not reply to this email.<br />
              </td>
              <td style="height: 4px">
              </td>
            </tr>
            <tr>
              <td style="width: 18px; height: 4px">
              </td>
              <td style="font-weight: normal; font-size: 9pt; width: 603px; color: #250000; font-family: Verdana, Arial; height: 35px">
                Veema UK Ltd. t/s Rupali,<br />
                157 Greenlane Road, Leicester, LE5 3TQ,<br />
                Contact telephone: 0116 246 4111.
              </td>
              <td style="height: 4px">
              </td>
            </tr>
            <tr>
              <td style="width: 18px; height: 4px">
              </td>
              <td style="width: 603px; height: 4px; vertical-align: bottom; text-align: left;">
                <img src="http://rupaliukemailimages.rupalionline.co.uk/RegisterBottom.jpg" />
              </td>
              <td style="height: 4px">
              </td>
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
          subject: "Registration Completed",
          text: "Customer Registration",
          html: emailContent,
        };

        await transporter.sendMail(mailOptions);
      } catch {}

      return res.status(200);
    } catch {}
  }
};
export default handler;
