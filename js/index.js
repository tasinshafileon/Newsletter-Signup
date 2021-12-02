const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');
const https = require('https');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../signup.html"));
});

app.post("/", function(req, res) {

  const data = {
    members: [{
      email_address: req.body.email,
      status: "subscribed",
      merge_fields: {
        NAME: req.body.name
      }
    }]
  }

  const jsonData = JSON.stringify(data);
  const mailChimpURL = "https://us5.api.mailchimp.com/3.0/lists/2d1bba181a"

  const options = {
    method: "post",
    auth: config.MAIL_CHIMP_NAME+":"+config.MAIL_CHIMP_KEY
  }

  const request = https.request(mailChimpURL, options, function(response) {
    if (response.statusCode === 200) {
      res.sendFile(path.join(__dirname, "../success.html"));
    } else {
      res.sendFile(path.join(__dirname, "../failure.html"));
    }

  });

  request.write(jsonData);
  request.end();

});

app.post("/success", function(req, res){
  res.redirect("/");
});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Virtual server running on localhost:3000")
});
