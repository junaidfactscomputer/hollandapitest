import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { to, subject, text, html } = req.body;
      console.log(req.body);

      const transporter = nodemailer.createTransport({
        port: 587,
        host: "auth.smtp.1and1.co.uk",
        auth: {
          user: "info@rupalionline.com",
          pass: "GreenLaneRoad",
        },
        tls: {
          rejectUnauthorized: true,
          minVersion: "TLSv1.2",
        },
      });

      // Define the email options
      const mailOptions = {
        from: "info@rupalionline.com",
        to,
        subject,
        text,
        html,
      };

      //   const mailData = {
      //     from: 'info@rupalionline.com',
      //     to: 'your email',
      //     subject: `Message From ${req.body.name}`,
      //     text: req.body.message + " | Sent from: " + req.body.email,

      //   }

      // Send the email
      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Error sending email" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
