import nodemailer from 'nodemailer';

function sendMail(email,password)
{
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'alishagouri616@gmail.com',
    pass: 'drkd kdty rsgs avds '
  }
});

var mailOptions = {
  from: 'alishagouri616@gmail.com',
  to: email,
  subject: 'verify your account',
  html:  "<h1>Welcome to Urban Company</h1><p>You have successfully register to our site , your login credentials are attached below</p><h2>Email:"+email+"</h2><h2>Password:"+password+"</h2><h1>Click on the link below to verify your account</h1>http://localhost:5000/api/verify-email"+email

};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}
export default sendMail;