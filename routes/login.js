var express = require('express'),
    router = express.Router(),
    db = require('../models/db.js'),
    crypto = require('crypto'),
    TITLE_LOGIN = '登录';

router.get('/', function(req, res) {
    res.render('login',{title:TITLE_LOGIN});
});

router.post('/', async function(req, res) {
    var userName = req.body['txtUserName'],
        userPwd = req.body['txtUserPwd'],
        isRem = req.body['chbRem'],
        // md5 = crypto.createHash('md5'),
        sqlQuery = "select * from userinfo where UserName = '" + userName + "'";

    var records = await db.query(sqlQuery);
    console.log('db data.', records);
    if (records.length == 0) {
        res.locals.error = '用户不存在';
        res.render('login',{title:TITLE_LOGIN});
        return;
    }
    //懒得加密
    // userPwd = md5.update(userPwd).digest('hex');

    if(records[0].UserName != userName || records[0].UserPass != userPwd)
    {
        res.locals.error = '用户名或密码有误';
        res.render('login',{title:TITLE_LOGIN});
        console.log(1);
        return;
    }
    else
    {
        if(isRem)
        {
        res.cookie('islogin', userName, { maxAge: 60000 });                 
        }

        res.locals.username = userName;
        req.session.username = res.locals.username;  
        console.log(req.session.username);                        
        res.redirect('/');
        return;
    }            
});

module.exports = router;
