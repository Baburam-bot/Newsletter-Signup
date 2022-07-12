const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
  const firstName = req.body.Fname;
  const lastName = req.body.Lname;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subsribed",
        merge_fields: {
          FNMAE: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url ="https://us12.api.mailchimp.com/3.0/lists/ae915974a8";   //CHECH NEEDED

  const options = {
    method: "POST",
    auth: "key:2fa617e82d74daa7af27028e992d88f-us12"
  };

  const request = https.request(url, options, function(response){

    if (response.stausCode === 200) {
      res.send(__dirname+"/success.html");
    }
    else{
      res.send(__dirname+".failure.html");
    }

    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();
});

app.post("/failure", function(req, res){
  res.redirect("/";)
})

app.listen(3000, function(){
  console.log("Server is running in port 3000");
})
