require("./MicroServices/MessageService/server");
require("./MicroServices/BidService/server");
require("./MicroServices/BddService/server");

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
    text: 'That was easy!'
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
