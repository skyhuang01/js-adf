var express = require('express'),
    router = express.Router(),
    db = require('../models/db');
var moment = require('moment');

router.get('/', async function(req, res) {
  if(req.cookies.islogin)
  { 
         console.log('cookies:' + req.cookies.islogin);
       req.session.username = req.cookies.islogin;
  }  

  if(req.session.username)
  {    
          console.log('session:' + req.session.username);
        res.locals.username = req.session.username;  
        
        // var insertQuery = "INSERT INTO `vipinfo` (`Id`, `VipNum`, `VipName`, `VipPhone`,`VipLevel`,`VipRemark`) VALUES (null, '00001',null, null, null, null);"
        // await db.query(insertQuery, null, null);
        // var sqlQuery = "SELECT * FROM vipinfo";
        // var records = await db.query(sqlQuery, null, null);
        // res.locals.vipinfo  = records;

  }
  else
  {
        res.redirect('/login');
        return;    
  }
  var startDate =  moment().format("YYYY-MM-01 00:00:00");
  var endDate = moment().format("YYYY-MM-DD HH:mm:ss");
  var sqlQuery = "select sum(vipAmount) as `salesAmount` from vipinfo where handleDate between '" + startDate + "' and '" + endDate + "';";
  
  var records = await db.query(sqlQuery, null, null);
  console.log(records);

  var output = {
    title:'主页',
    startDate: startDate,
    endDate: endDate,
    salesAmount: records[0].salesAmount
  }
  res.render('index',output);
});

router.get('first', async function(req, res) {
  console.log(1);
  var startDate =  req.body.startDate;
  var endDate = req.body.endDate;
  var sqlQuery = "select sum(vipAmount) as `salesAmount` from vipinfo where handleDate between '" + startDate + "' and '" + endDate + "';";
  
  var records = await db.query(sqlQuery, null, null);
  console.log(records);

  var output = {
    title:'主页',
    startDate: startDate,
    endDate: endDate,
    salesAmount: records[0].salesAmount
  }
  res.render('index',output);
});
router.get('second', async function(req, res) {
  console.log(1);
  var startDate =  req.body.startDate;
  var endDate = req.body.endDate;
  var sqlQuery = "select sum(vipAmount) as `salesAmount` from vipinfo where handleDate between '" + startDate + "' and '" + endDate + "';";
  
  var records = await db.query(sqlQuery, null, null);
  console.log(records);

  var output = {
    title:'主页',
    startDate: startDate,
    endDate: endDate,
    salesAmount: records[0].salesAmount
  }
  res.render('index',output);
});
module.exports = router;