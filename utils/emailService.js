import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  console.log(process.env.EMAIL_USERNAME, process.env.EMAIL_FROM);
  const transporter = nodemailer.createTransport({
    // service: "gmail", // You can use any service like Outlook, SMTP, etc.
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    // secure: false,
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html 
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
