var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/scrape', function(req, res){

url = 'http://www.nasdaq.com/';

request(url, function(error, response, html){
    if(!error){
        var $ = cheerio.load(html);

    var indexq , valueq, netq;
    var json = { index : "", value : "", net : ""};

  //console.log($('#indexTable').find('script').html());

  $('#indexTable').find('script').filter(function(){
        var data = $(this);
        indexq = data.text().replace("//<![CDATA[", "").replace(/"/g,'').split("nasdaqHomeIndexChart.storeIndexInfo(")[1].split(",")[0];
        valueq = data.text().replace("//<![CDATA[", "").replace(/"/g,'').split("nasdaqHomeIndexChart.storeIndexInfo(")[1].split(",")[1];
        netq = data.text().replace("//<![CDATA[", "").replace(/"/g,'').split("nasdaqHomeIndexChart.storeIndexInfo(")[1].split(",")[2]
        json.index =indexq;
        json.value = valueq;
        json.net = netq;

        console.log(json);
    })

  
}

// To write to the system we will use the built in 'fs' library.
// In this example we will pass 3 parameters to the writeFile function
// Parameter 1 :  output.json - this is what the created filename will be called
// Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
// Parameter 3 :  callback function - a callback function to let us know the status of our function

fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

})

// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
res.send('Check your console!')

    }) ;
})

module.exports = router;
