require('dotenv').config();
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

  const city = req.body.cityName;
  const apiKey = process.env.API;
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city +"&units=" + unit + "&appid=" + apiKey;
  https.get(url, function(response) {

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

      res.write("<p>The Weather in "+ city +" is Currently " + desc + "</p>");
      res.write("<h1>The Temperatue is " + temp + "</h1>");
      res.write("<img src = " + imageURL + ">")

      res.send();
    });
  });
});




app.listen(3000, function(req, res) {
  console.log("Server is Running on port 3000.");
});
