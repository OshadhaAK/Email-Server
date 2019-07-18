const http = require('http');
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const hostname = '127.0.0.1';
const port = 3000;

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("The server started on port 3000 !!!!!!");
});

app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center'>Wellcome to FunOfHeuristic <br><br>😃👻😃👻😃👻😃👻😃</h1>"
  );
});

app.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  sendMail(user, info => {
    //console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
    res.send(info);
  });
});

async function sendMail(user,callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: false,
    auth: {
        user: 'oshadhatesting@gmail.com',
        pass: 'My4nz3120'
    },
    tls: {
        rejectUnauthorized: false
    }
  });

  let mailOptions = {
    from: 'oshadhatesting@gmail.com',
    to: user.email,
    subject: 'Hi',
    text: user.message
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions, function(error, info){
    if(error) {
      console.log(error);
  }else{
      console.log('Email sent: ' + info.response);
  }
  });

  callback(info);
}
/* const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
}); */