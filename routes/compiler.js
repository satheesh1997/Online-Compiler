var express = require('express');
var router = express.Router();
var request = require('request');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Compiler is working fine.');
});

router.post('/compile', function(req, res, next) {
  var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/json'
  };
  var test = [req.body.testcase_1,req.body.testcase_2];
  var post_data = {
        source: req.body.source,
        lang: req.body.lang,
        testcases: JSON.stringify(test),
        api_key: "hackerrank|1488982-2006|6ba9952a864a280fc26947744153d8e41952795b"
  };
  console.log(req.body);
  var options = {
    url: 'http://api.hackerrank.com/checker/submission.json',
    method: 'POST',
    headers: headers,
    form: post_data
  };
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        res.json(JSON.parse(body));
    }
    else{
    	res.json(response.body);
    }
  });
});

module.exports = router;
