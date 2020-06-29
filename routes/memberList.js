var express = require('express'),
     router = express.Router();


router.get('/', function(req, res) {
    res.render('memberList',{title:'会员列表'});
});

router.post('/', function(req, res){
    console.log(1);
    res.render('memberList',{title:'会员列表'});
    
});
module.exports = router;