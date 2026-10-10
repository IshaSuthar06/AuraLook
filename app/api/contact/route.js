import nodemailer from "nodemailer";

async function sendMail(data) {


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // IMPORTANT
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
   tls: {
    rejectUnauthorized: false,
  },
});

  // =========================
  // ADMIN EMAIL
  // =========================
  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: "magicalballoons.anjali@gmail.com",
    subject: `🌿 New Contact Form Submission from ${data.name}`,
    html: `
      <div style="background:#f5f5dc;padding:40px 0;font-family:Arial,Helvetica,sans-serif;">
        <div style="max-width:650px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 6px 18px rgba(0,0,0,0.08);">
          
          <!-- HEADER -->
          <div style="background:linear-gradient(90deg,#154212 0%,#2d5a27 100%);padding:28px;text-align:center;">
            <h1 style="margin:0;font-size:28px;color:#fff;">
              🌿 Aryan Shakti
            </h1>
            <p style="margin-top:8px;color:#d7f5d0;font-size:14px;">
              New Contact Form Submission
            </p>
          </div>

          <!-- BODY -->
          <div style="padding:35px;">
            <p style="font-size:16px;color:#333;">
              A new customer inquiry has been submitted from your website.
            </p>

            <table style="width:100%;border-collapse:collapse;margin-top:25px;">
              
              <tr>
                <td style="padding:12px;font-weight:bold;color:#154212;width:180px;">
                  Full Name
                </td>
                <td style="padding:12px;color:#444;">
                  ${data.name}
                </td>
              </tr>

              <tr style="background:#fafaf2;">
                <td style="padding:12px;font-weight:bold;color:#154212;">
                  Email Address
                </td>
                <td style="padding:12px;color:#444;">
                  ${data.email}
                </td>
              </tr>

              <tr>
                <td style="padding:12px;font-weight:bold;color:#154212;">
                  Phone Number
                </td>
                <td style="padding:12px;color:#444;">
                  ${data.phone}
                </td>
              </tr>

              <tr style="background:#fafaf2;">
                <td style="padding:12px;font-weight:bold;color:#154212;">
                  Subject
                </td>
                <td style="padding:12px;color:#444;">
                  ${data.subject}
                </td>
              </tr>

            </table>

            <div style="margin-top:30px;">
              <h3 style="color:#154212;margin-bottom:12px;">
                Customer Message
              </h3>

              <div style="background:#f8f8f0;padding:18px;border-radius:10px;color:#555;line-height:1.7;">
                ${data.message}
              </div>
            </div>

            <p style="margin-top:35px;font-size:14px;color:#888;">
              This message was automatically generated from the Aryan Shakti contact form.
            </p>
          </div>

          <!-- FOOTER -->
          <div style="background:#f5f5dc;padding:18px;text-align:center;font-size:12px;color:#777;">
            © Aryan Shakti Ayurvedic Wellness
          </div>

        </div>
      </div>
    `,
  });

  // =========================
  // CUSTOMER CONFIRMATION EMAIL
  // =========================
  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: data.email,
    subject: `🌿 We Received Your Message – Aryan Shakti`,
    html: `
      <div style="background:#f5f5dc;padding:40px 0;font-family:Arial,Helvetica,sans-serif;">
        <div style="max-width:650px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 6px 18px rgba(0,0,0,0.08);">
          
          <!-- HEADER -->
          <div style="background:linear-gradient(90deg,#154212 0%,#2d5a27 100%);padding:28px;text-align:center;">
            <h1 style="margin:0;font-size:28px;color:#fff;">
              🌿 Aryan Shakti
            </h1>

            <p style="margin-top:8px;color:#d7f5d0;font-size:14px;">
              Thank You for Contacting Us
            </p>
          </div>

          <!-- BODY -->
          <div style="padding:35px;">
            <p style="font-size:17px;color:#333;">
              Hello <strong>${data.name}</strong>,
            </p>

            <p style="font-size:16px;color:#555;line-height:1.7;">
              Thank you for reaching out to Aryan Shakti.  
              We have successfully received your message and our wellness support team will contact you shortly.
            </p>

            <div style="margin-top:30px;background:#fafaf2;padding:22px;border-radius:12px;">
              
              <h3 style="margin-top:0;color:#154212;">
                Your Submitted Details
              </h3>

              <p style="margin:8px 0;color:#444;">
                <strong>Subject:</strong> ${data.subject}
              </p>

              <p style="margin:8px 0;color:#444;">
                <strong>Phone:</strong> ${data.phone}
              </p>

              <p style="margin:8px 0;color:#444;">
                <strong>Message:</strong><br/>
                ${data.message}
              </p>

            </div>

            <p style="margin-top:30px;font-size:16px;color:#555;line-height:1.7;">
              We appreciate your trust in our Ayurvedic wellness journey 🌿
            </p>

            <p style="margin-top:25px;color:#333;">
              Warm Regards,<br/>
              <strong>Aryan Shakti Team</strong>
            </p>
          </div>

          <!-- FOOTER -->
          <div style="background:#f5f5dc;padding:18px;text-align:center;font-size:12px;color:#777;">
            This is an automated confirmation email.
          </div>

        </div>
      </div>
    `,
  });
}

export async function POST(req) {
  try {
    const data = await req.json();

   

    await sendMail(data);

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}