import axios from "axios";
import getConfig from "next/config";
import nodemailer from "nodemailer";

const { publicRuntimeConfig } = getConfig();
const apiurl = publicRuntimeConfig.factsApiUrl + "Page/getopensection";

const handler = async function (req, res) {
  // Collect parameters sent by the payment gateway
  if (req.method === "POST") {
    try {
      if (req.body) {
        const { custId, orderNo, userEmail } = req.body;

        const response = await axios.post(
          apiurl,
          {
            containerId: ["confirmorder"],
            strUserId: custId,
            strMechineId: "",
            strFyCode: "SL0304",
            strDocType: "WOI",
            strDocNo: orderNo,
          },
          {
            headers: {
              "content-type": "application/json",
            },
          }
        );
        // const result = response.data[0].data.confirmorder;
        // console.log(result);
        //const objCustomer=result.Table;
        //  const BillingAddres = result.Table1[0];

        const result = response.data[0].data.confirmorder;
        // const BillingAddres = result.Table1[0];
        //   const objCheckout = result.Table;
        //const Cart = result.Table;
        const orderdetails = response.data[0].data.orderdetails.Table;

        // <td
        //                   width="25px"
        //                   "font-size:10pt;vertical-align:middle;text-align:right;"
        //                 >
        //                   #
        //                 </td>

        if (result) {
          try {
            const htmlHead = ` <html>
              <head></head>
              <body>
                <table
                  width="650px"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  style="font-size:16pt;font-family:Verdana, Arial, Helvetica, sans-serif"
                >
                  <tr bgcolor="#FFFFFF" width="650px">
                    <td style="font-size:11pt;padding-left:50pt;">
                      Thank you for shopping with rupalionline.com
                    </td>
                  </tr>
                  <tr bgcolor="#FFFFFF" width="650px">
                    <td style="font-size:10pt;padding-left:50pt;">
                      <br /> Please find below your order details <br /><br />
                    </td>
                  </tr>
        
                  <tr bgcolor="#FFFFFF" width="650px">
                    <td style="font-size:11pt;padding-left:50pt;">
                      Name: ${orderdetails[0].customer}
                      <br />
                      Order No. <b>${orderNo}</b>
                      <br />
                      Order Date: ${new Date().toLocaleString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      <br /><br /><br />
                    </td>
                  </tr>
                
                  <tr>
                  <td style="font-size:11pt;padding-left:50pt;">
                    <table width="650px" cellpadding="0" cellspacing="0" border="0">
                      <tr
                        bgcolor="Gray"
                        style="font-size:10pt;vertical-align:middle;height:30px;color:white;font-weight:bold;"
                      >
                        
                        <td
                          width="425px"
                          style="font-size:10pt;vertical-align:middle;text-align:left;padding-left:10px;"
                        >
                          Items
                        </td>
                        <td
                          width="50px"
                          style="font-size:10pt;vertical-align:middle;text-align:right;"
                        >
                          Qty.
                        </td>
                        <td
                          width="75px"
                          style="font-size:10pt;vertical-align:middle;text-align:right;"
                        >
                          Rate
                        </td>
                        <td
                          width="75px"
                          style="font-size:10pt;vertical-align:middle;text-align:right;padding-right:5px;"
                        >
                          Amt.(GBP)
                        </td>
                      </tr>
                        `;

            // const productListString = Cart.map((product, index) => {
            //   const serialNumber = index + 1;
            //   return `${serialNumber}. ID: ${product.id}, Name: ${product.name}, Price: ${product.price}`;
            // }).join("\n");

            // <td
            //         width="25px"
            //         style="color:black;font-size:10pt;vertical-align:middle;text-align:right;border-bottom-style:solid;border-bottom-width:1px;border-collapse:collapse;"
            //       >
            //         ${index + 1}
            //       </td>

            const rows = orderdetails.map((dr, index) => {
              return `<tr bgcolor="#FFFFFF">
                  
                  <td
                    width="425px"
                    style="padding-left:5px;font-size:10pt;vertical-align:middle;text-align:left;border-bottom-style:solid;border-bottom-width:1px;border-collapse:collapse;padding-left:10px;"
                  >
                    ${dr.modet_stock_desc},${dr.modet_color_desc}, ${dr.modet_size_desc}
                  </td>
                  <td
                    width="50px"
                    style="font-size:10pt;vertical-align:middle;text-align:right;border-bottom-style:solid;border-bottom-width:1px;border-collapse:collapse;"
                  >
                    ${dr.modet_qty}
                  </td>
                  <td
                    width="75px"
                    style="font-size:10pt;vertical-align:middle;text-align:right;border-bottom-style:solid;border-bottom-width:1px;border-collapse:collapse;"
                  >
                    ${dr.modet_rate}
                  </td>
                  <td
                    width="75px"
                    style="font-size:10pt;vertical-align:middle;text-align:right;border-bottom-style:solid;border-bottom-width:1px;border-collapse:collapse;padding-right:5px;"
                  >
                    ${dr.modet_amount}
                  </td>
                </tr>`;
            });

            const producttable = `${rows}`;

            const totalbody = ` <table>
              <tr>
                <td style="font-size:10pt; padding-left:50pt" }}>
                  <table width="650px" cellpadding="0" cellspacing="0" border="0">
                    <tr bgcolor="#FFFFFF" width="650px">
                      <td width="500px";"font-size:10pt;vertical-align:middle;text-align:right;height:35px;font-weight:bold;" >
                        Sub Total (Excluding Delivery)
                      </td>
                      <td
                        width="150px"
                        style="font-size:10pt;vertical-align:middle;text-align:right;height:40px;padding-right:5px;"
                      >
                        ${orderdetails[0].mo_sub_total.toFixed(2)}
                      </td>
                    </tr>
                    <tr bgcolor="#FFFFFF" width="650px">
                      <td
                        width="500px"
                        style="font-size:10pt;vertical-align:middle;text-align:right;height:35px;font-weight:bold;"
                      >
                        Shipping & Handling Charges
                      </td>
                      <td
                        width="150px"
                        style="font-size:10pt;vertical-align:middle;text-align:right;height:40px;padding-right:5px;"
                      >
                        ${orderdetails[0].mo_delivery_charge.toFixed(2)}
                      </td>
                    </tr>
                    
                    <tr bgcolor="#FFFFFF" width="650px">
                      <td
                        width="500px"
                        style="font-size:10pt;vertical-align:middle;text-align:right;height:35px;font-weight:bold;"
                      >
                        Discount 
                      </td>
                      <td
                        width="150px"
                        style="font-size:10pt;vertical-align:middle;text-align:right;height:40px;padding-right:5px;"
                      >
                        ${orderdetails[0].mo_add_discount_amt.toFixed(2)}
                      </td>
                    </tr>
                    <tr bgcolor="#FFFFFF" width="650px">
                      <td
                        width="500px"
                        style="font-size:10pt;vertical-align:middle;text-align:right;height:35px;font-weight:bold;"
                      >
                        Order Total(GBP)
                      </td>
                      <td
                        width="150px"
                        style="font-size:10pt;color:red;vertical-align:middle;text-align:right;height:35px;font-weight:bold;"
                      >
                        ${orderdetails[0].mo_net_amount.toFixed(2)}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr bgcolor="#FFFFFF" width="650px">
                <td style="font-size:10pt;padding-left:50pt;">
                  <br />
                  <br />
                </td>
              </tr>

            </table>`;
            const htmlAddress = `
            <tr>
              <td  style="font-size:10pt;padding-left:50pt;">
                <table width="600px" cellpadding="0" cellspacing="0" border="0">
                  <tr bgcolor="#FFFFFF" style="color:maroon;font-weight:bold;height:40px;">
                    <td width="200px" style="font-size:12pt;">Delivery Address</td>
                    <td width="200px" style="font-size:12pt;"></td>
                    <td width="200px" style="font-size:12pt;"></td>
                  </tr>
        
                  <tr bgcolor="#FFFFFF" style="color:black;font-size:10pt;height:15px;">
                    <td width="200px">${orderdetails[0].customer}</td>
                    <td width="200px"></td>
                    <td width="200px"></td>
                  </tr> <tr
                        bgcolor="#FFFFFF"
                        style="color:black;font-size:10pt;height:15px;"
                      >
                        <td width="200px">${orderdetails[0].shipto}</td>
                        <td width="200px"></td>
                      </tr> 
                </table>
              </td>
            </tr>
            `;

            const footer = `<tr bgcolor="FFFFFF" width="650px"> <td style="color:maroon;font-weight:bold;font-size:10pt;padding-left:50pt;"><br/> Rupali Guarantee<br/></td></tr>
            <tr bgcolor="FFFFFF" width="650px"> <td style="font-size:10pt;padding-left:50pt;"></td></tr><tr><td style="font-size:10pt;padding-left:50pt;">
            <table width="650px" cellpadding="0" cellspacing="0" border="0">
            <tr bgcolor="FFFFFF" style="color:maroon;font-weight:normal;font-size:10pt;height:15px;"><td style="color:maroon;font-weight:normal;font-size:10pt;height:15px;vertical-align:top;" width="10px"><b>1.</b></td>
            <td style="color:maroon;font-weight:normal;font-size:10pt;height:15px;padding-right:5px;" width="640px">  Our aim is to provide our Customers with the best services and quality at all times. If, for any reason, you wish to return any item, we will happily 
            refund or exchange it without any questions - provided they are returned unused &amp; unworn within 14 days. (With all labels intact and with valid receipt). However 
            for hygiene reasons, any Imitation Jewellery product will not be exchanged or taken back.<br />               </td></tr>
            <tr bgcolor="FFFFFF" style="color:maroon;font-weight:normal;font-size:10pt;height:15px;"><td style="color:maroon;font-weight:normal;font-size:10pt;height:15px;vertical-align:top;" width="10px"><b>2.</b></td>
            <td style="color:maroon;font-weight:normal;font-size:10pt;height:15px;padding-right:5px;" width="640px">  For Sale items only - Exchange will be offered within 14 days of purchase on enclosing a valid receipt (or proof of purchase).<br /></td></tr>
            <tr bgcolor="FFFFFF" style="color:maroon;font-weight:normal;font-size:10pt;height:15px;"><td style="color:maroon;font-weight:normal;font-size:10pt;height:15px;vertical-align:top;" width="10px"><b>3.</b></td>
            <td style="color:maroon;font-weight:normal;font-size:10pt;height:15px;padding-right:5px;" width="640px">For exchange of goods, the postage and packing fee of £ 6 will be non refundable.<br /></td></tr>
            </table></td></tr>
            <tr bgcolor="FFFFFF" style="color:maroon;font-weight:bold;font-size:10pt;height:15px;" width="650px"> <td style="color:maroon;font-weight:bold;font-size:10pt;padding-left:50pt;"><br/>Contact us</td></tr>
            <tr bgcolor="FFFFFF" style="color:maroon;font-weight:normal;font-size:10pt;height:15px;" width="650px"> <td style="font-size:10pt;padding-left:50pt;">
            <table width="650px" cellpadding="0" cellspacing="0" border="0">
            <tr bgcolor="FFFFFF" style="color:maroon;font-weight:normal;font-size:10pt;height:15px;"> <td width="10px"></td>
            <td width="640px">VEEMA (UK) Ltd Trading as Rupali <br/>157, Green Lane Road, Leicester, LE5 3TQ <br/>Tel : 0116 246 4111, Fax : 0116 - 2764070 <br /></td></tr>
            </table></td></tr>
            </table>
            </body></html>`;

            const completehtml =
              htmlHead + producttable + totalbody + htmlAddress + footer;

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
              to: userEmail,
              subject: "Order Confirmation",
              text: "Order Confirmation",
              html: completehtml,
            };

            const respe = await transporter.sendMail(mailOptions);

            return res.status(200);
          } catch {}

          return res.status(200);
        }
      } else {
        return res.status(200);
      }
    } catch (error) {
      console.error(error);
      return res.redirect(307, "/");
      // Handle the error and send an appropriate response
      // return res.status(500).json({ error: "Something went wrong" });
    }
  }
};

export default handler;
