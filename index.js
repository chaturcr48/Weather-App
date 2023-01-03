const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")

const app = express()

const apiKey = "8542eca259636062b1c3c7f6ef8aa963";

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.render("index", {weather: null, error: null})
})

app.post("/", function (req, res) {
    let city = req.body.city
    let url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid="+apiKey;
    console.log("Entered city is:", req.body.city)

    request(url, function (err, response, body) {
        if(err){
            res.render("index", { weather: null, error: null })
        }else {
            let weather = JSON.parse(body)
            if(weather.main == undefined) {
                res.render("index", { weather: null, error: "Sorry, city not found!\n"+"Seems <<"+ req.body.city + ">> is not a city." })
                console.log("Entered wrong city name :( :: <<"+ req.body.city +">> is not a city")
            }else {
                let weatherText = "It's "+weather.main.temp+" degress Celsius with "+weather.weather[0].main+" sky in "+weather.name+"!"
                res.render("index", { weather: weatherText, error: null })
                // console.log("body:", body)
                console.log("City:",weather.name,":: Temp:", weather.main.temp)
            }
        }
    })
})

app.listen(3000, function () {
    console.log("Weather App listening on port 3000!")
});