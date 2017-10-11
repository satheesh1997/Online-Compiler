var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    try{
        var token = req.session.tokens.access_token;
        res.render('home', {title: 'Online Code Compiler'});
    }
    catch(err){
        res.render('index', {title: 'Online Code Compiler'});
    }
});

router.get('/logout', function(req, res, next) {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
