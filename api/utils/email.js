import nodemailer from "nodemailer";

// email configurations
const transporter = nodemailer.createTransport({
  host: "mail.analysisease.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "admin@analysisease.com",
    pass: "8,n8Yko_(btD",
  },
});

async function sendMail(email) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"analysisease" <admin@analysisease.com>', // sender address
    to: email, // list of receivers
    subject: "password reset  ✔", // Subject line
    text: "Click the link to reset your password", // plain text body
    html: "<p> passwrd reset Link <p/> <b>https://analysisease.com/passwordreset</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
}

export default sendMail;
