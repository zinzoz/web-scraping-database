var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var db  = require('../db');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/scrape', function(req, res){

url = 'http://www.nasdaq.com/';
var indexq , valueq, netq;
var json = { index : "", value : "", net : ""};

//if( getTimenow() >= '09:30:00' &&  getTimenow() <= '16:00:00'){
setInterval(function () {



request(url, function(error, response, html){
    if(!error){
        var $ = cheerio.load(html);

  $('#indexTable').find('script').filter(function(){
        var data = $(this);
        indexq = data.text().replace("//<![CDATA[", "").replace(/"/g,'').split("nasdaqHomeIndexChart.storeIndexInfo(")[1].split(",")[0];
        valueq = data.text().replace("//<![CDATA[", "").replace(/"/g,'').split("nasdaqHomeIndexChart.storeIndexInfo(")[1].split(",")[1];
        netq = data.text().replace("//<![CDATA[", "").replace(/"/g,'').split("nasdaqHomeIndexChart.storeIndexInfo(")[1].split(",")[2]
        json.index =indexq;
        json.value = valueq;
        json.net = netq;
    })


}


})


db.insert({index: indexq , value: valueq ,net:netq ,date:getDateTime()}, 'id').into('nasdaq')
  .catch(function(error) {
    console.error(error);
  }).then(function() {
    console.log("ok");
  });










}, 10000);

//}


});




  function getDateTime() {

      var date = new Date();

      var hour = date.getHours();
      hour = (hour < 10 ? "0" : "") + hour;

      var min  = date.getMinutes();
      min = (min < 10 ? "0" : "") + min;

      var sec  = date.getSeconds();
      sec = (sec < 10 ? "0" : "") + sec;

      var year = date.getFullYear();

      var month = date.getMonth() + 1;
      month = (month < 10 ? "0" : "") + month;

      var day  = date.getDate();
      day = (day < 10 ? "0" : "") + day;

      return year + "/" + month + "/" + day + " " + hour + ":" + min + ":" + sec;

  }

  function getTimenow() {

      var date = new Date();

      var hour = date.getHours();
      hour = (hour < 10 ? "0" : "") + hour;

      var min  = date.getMinutes();
      min = (min < 10 ? "0" : "") + min;

      var sec  = date.getSeconds();
      sec = (sec < 10 ? "0" : "") + sec;



      return  hour + ":" + min + ":" + sec;

  }

module.exports = router;
