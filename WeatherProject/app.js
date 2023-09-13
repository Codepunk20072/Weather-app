var express = require("express");
var bodyParser = require("body-parser");
const https = require("https");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
   
    
    
});

app.post("/",function(req,res){
    const query = req.body.cityName;
    const unit = "metric";
    const API_key = "844145f8bb157d0a90a7a097abf33ed2"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + API_key + "&units=" + unit;
    
    https.get(url,function(response){
        console.log(response.statusCode);
  

    response.on("data",function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const desc = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageUrl = "https://openweathermap.org/img/wn/" + icon +"@2x.png";
        res.write("<p>The weather is currently " + desc + "</p>");
        res.write("<h1>The temperature in " + query + " is " + temp + " Degree Celcius</h1>");
        res.write("<img src=" + imageUrl + ">");
        res.send();
    })

})
})

app.listen(3000,function(){
    console.log("Server is live on port 3000.");
});