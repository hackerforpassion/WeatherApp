const bodyParser = require('body-parser');
const request = require('request');

const apiKey = '801414e40d2e4931b27706ad4e61646c';
//...
//...

var express = require('express');
var app = express();
var router = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
  
var path = __dirname + '/views/';
  
app.use(express.static(__dirname + '/public'));
app.use('/',router);
  
router.get('/',function(req, res){
  //res.sendFile(path + 'index.html');
  res.render('index', {weather: null, error: null});
});
  
app.listen(3000,function(){
  console.log("Server running at Port 3000");
});

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = 'http://samples.openweathermap.org/data/2.5/weather?q=${city}&appid={apiKey}'
request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let temp = `${weather.main.temp}`;
        let location = `${weather.name}`;

        if (weather.weather[0].main == "clouds"){
          res.render('cloudyday', {temperature: temp, city: location, error: null});
        }
        else if (weather.weather[0].main == "sunny"){
          res.render('sunnyday', {temperature: temp, city: location, error: null});
        }
        else if (weather.weather[0].main == "rainy"){
          res.render('rainyday', {temperature: temp, city: location, error: null});
        }
        else if (weather.weather[0].main == "clear"){
          res.render('clearnight', {temperature: temp, city: location, error: null});
        }
        else if (weather.weather[0].main == "Drizzle"){
          res.render('drizzle', {temperature: temp, city: location, error: null});
        }
        else{
          res.render('sunnyday', {temperature: temp, city: location, error: null});
        }
      }
    }
  });
})
