var express = require('express'),
     router = express.Router(),
     db = require('../models/db');

router.get('/', function(req, res) {
    res.render('addMember',{title:'新建会员', messages: null});
});

router.post('/', async function(req, res){
    console.log(1);
    var messages = [];
    var tel = req.body.tel.replace(/\s*/g,"");
    var name = req.body.name.replace(/\s*/g,"");
    var amount = req.body.amount.replace(/\s*/g,"");
    var level = req.body.cardLevel;
    if (tel.length != 11) {
        messages.push(tel.length != 11 ? "手机号格式错误，请重新输入." : "");
    }
    if (!name) {
        messages.push(!name ? "姓名格式错误": "");
    }
    if (!amount) {
        messages.push(!amount ? "金额格式错误": "");
    }
    if (messages.length > 0) {
        res.render('addMember',{title:'新建会员报错', messages:messages});
    } else {
        var insertQuery = "INSERT INTO `vipinfo`"
        + "(`Id`, `VipNum`, `VipName`, `VipPhone`,`VipLevel`,`VipAmount`,`HandleDate`)" 
        + "VALUES (null, '" + tel +"','" + name + "','" + tel + "','" + level + "'," + amount + ", default);"
        var records = await db.query(insertQuery, null, null);
        messages.push('新建成功！');
        res.render('addMember',{title:'新建会员', messages: messages});
    }

});
module.exports = router;