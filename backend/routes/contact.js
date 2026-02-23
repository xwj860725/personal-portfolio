const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

/* ================= MAIL SETUP ================= */

const contactEmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "********@gmail.com",
    pass: ""   // ⚠ 建议之后改成环境变量
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log("Mail config error:", error);
  } else {
    console.log("Mail server ready");
  }
});

/* ================= ROUTE ================= */

router.post("/", (req, res) => {
  const name = req.body.firstName + req.body.lastName;
  const email = req.body.email;
  const message = req.body.message;
  const phone = req.body.phone;

  const mail = {
    from: name,
    to: "********@gmail.com",
    subject: "Contact Form Submission - Portfolio",
    html: `
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Phone: ${phone}</p>
      <p>Message: ${message}</p>
    `,
  };

  contactEmail.sendMail(mail, (error) => {
    if (error) {
      return res.status(500).json({ ok: false });
    } else {
      return res.json({ ok: true });
    }
  });
});

module.exports = router;