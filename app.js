const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
//const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(request, response){
 
    response.sendFile(__dirname+ "/index.html");
});

app.post("/", function(request, response){
    //console.log(request.body.cityName);



    const query = request.body.cityName;
    const apiKey = "fbe8e8eeb56b4d91260c888b740d7e31";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&appid=" +apiKey+ "&units="+unit;
    //const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=fbe8e8eeb56b4d91260c888b740d7e31&units=metric";

    https.get(url, function(response1){
        console.log(response1.statusCode);

    response1.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            //console.log(weatherData);
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + icon+ "@2x.png";

            response.write("<p>The weather is currently " +weatherDescription+ "</p>");
            response.write("<h1>The temperature in "+ query+ " is " + temp +" degrees Celcius.</h1>");
            response.write("<img src="+imageURL+">");
            response.send() 
            

        })

    })
    //response.send("server is running now!!!.")
})


app.listen(3000, function(){
    console.log("Server is running on port 3000");
});