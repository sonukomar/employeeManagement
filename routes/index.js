var express = require('express');
var router = express.Router();
var dbConnection = require('../database');
var chalk = require('chalk');



/* GET home page. */
router.get('/', function(req, res, next) {
   res.render('index', { title: 'Employee Management System'});
  
  
});
module.exports = router;
