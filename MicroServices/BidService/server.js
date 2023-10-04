const app_bidService = require("./app");

const port = process.env.PORT || 3001;

app_bidService.listen(port, () => {
  console.log("Running server BidService on port:", port);
  console.log("--------------------------");
});
const mongoose = require("mongoose");
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  port: 1025,
});

const mailOptions = {
  from: 'youremail@gmail.com',
  to: 'myfriend@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy bid!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

mongoose.connect(process.env.MONGO_URI || "mongodb://0.0.0.0:27017/app", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
