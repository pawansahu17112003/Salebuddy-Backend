var express = require("express");
var router = express.Router();
var request = require("request");
var nodemailer = require("nodemailer");
router.post("/sendotp", function (req, res) {
  console.log("API YES", req.body);
  var options = {
    method: "GET",
    // url: `https://2factor.in/API/V1/5d9b1cae-151f-11f0-8b17-0200cd936042/SMS/:+91${req.body.mobileno}/:${req.body.otp}/:RESTROBUDDY`,
    url: `https://2factor.in/API/V1/6ddca20c-6492-11f0-a562-0200cd936042/SMS/:+91${req.body.mobileno}/:${req.body.otp}/salesbuddy`,
    headers: {
      "Cache-Control": "no-cache",
    },
  };

  console.log("options:", options);
  request(options, function (error, result, body) {
    if (error) {
      console.log(error);
      return res.json({
        result: false,
      });
    } else {
      console.log(result);
      return res.json({
        result: true,
      });
    }
  });
});

router.post("/send_mail", function (req, res) {
  console.log(req.body);
  var transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "salesbuddy@gmail.com",
      pass: "ram123",
    },
  });

  var mailOptions = {
    from: "salesbuddy@gmail.com",
    to: req.body.to,
    subject: req.body.subject,
    html: req.body.message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  next();
});
module.exports = router;
