// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var moment = require('moment');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// get timestamp
app.get('/api/timestamp/:date_string?', function(req,res){
  const date = req.params.date_string;
  const dateFormat = moment(date).format();
  
  if (moment(date).format() !== 'Invalid date'){
    res.json({"unix": moment(date).unix(), "utc" : moment.utc(dateFormat).format('LLLL')})
  }
  else{
    res.json({"unix": null, "utc" : "Invalid Date" })
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});