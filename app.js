const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));






app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res) {
  const firstName = req.body.firstName;
  const secondName = req.body.secondName;
  const email = req.body.email;

  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: secondName
      }
    }]
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us7.api.mailchimp.com/3.0/lists/0fbb2695df";
  const options = {
    method: "POST",
    auth: "andrew1:1ec331d2c312aca7c258324b40667df2-us7"
  }

  const request = https.request(url, options, function(response) {
    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html")
    } else{
      res.sendFile(__dirname + "/failure.html")
    }
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();

})

app.post("/failure.html", function(req, res){
  res.redirect("/")
})








app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000")
})




// 1ec331d2c312aca7c258324b40667df2-us7 api key]

// 0fbb2695df  list
