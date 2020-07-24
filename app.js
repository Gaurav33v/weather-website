//jshint esversion:6
const express = require("express");
const app = express();
const https = require("https");
const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({extended:true}));






app.get("/" , function(rer,res)
{
  res.sendFile(__dirname + "/index.html");

});

app.post("/" , function(req,res)
{
  const query = req.body.var1;

  const units  = "metric";
  const apikey = "d4f77f2d02d92c3363fd7c91f5bce569";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query + "&appid="+ apikey + "&units=" + units;
  https.get(url, function(res1) {
    console.log(res1.statuscode);
    res1.on("data", function(data) {
      const mm = JSON.parse(data);
      console.log(mm);
      const temp = mm.main.temp;
      console.log(temp);
      const description = mm.weather[0].description;
      const icon = mm.weather[0].icon;
      const url = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<h1>the weather temperature is currently "+ temp + "</h1>");

      res.write("<h1>the description of the weather condition is "+ description + "</h1>");
      res.write("<img src ="+ url+ ">");
      res.send();

});
});
});



















app.listen(3000, function() {
  console.log("server is running on the port 3000");
});
