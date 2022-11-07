const express = require('express');
const bodyParser = require('body-parser');
const req = require('request');
const https = require('https');
const { response } = require('express');

const app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(urlencodedParser);

app.get('/',function(req,res){
  res.sendFile(__dirname+'/signup.html');
});

app.post('/', function(req,res){

  const firstname = req.body.one;
  const lastname = req.body.two;
  const email = req.body.three;

  var data = {
    members: [
      {
          email_address : email,
          status : "subscribed",
          merge_fields: {
            FNAME: firstname,
            LNAME: lastname
          }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  console.log(data);

  const url = 'https://us8.api.mailchimp.com/3.0/lists/13a071c069';

  const options = {
    method: "POST",
    auth: 'abhinav:79cfcf88394065dc5613054b600373ff-us8',
  }

  const request = https.request(url,options, function(response){
    if(response.statusCode==200){
      res.sendFile(__dirname+'/success.html');
    }
    else res.sendFile(__dirname+'/failure.html');
    response.on("data",(d)=>{
    })
  })
  request.write(jsonData);
  request.end();

});

app.post('/failure',function(req, res){
  res.redirect('/');
})

app.listen(process.env.PORT || 3000, function(){
  console.log('Sever running on 3000');
})


// API KEY
// 79cfcf88394065dc5613054b600373ff-us8
// Audience ID
// 13a071c069