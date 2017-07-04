var express = require('express');
var router = express.Router();
var dbConnection = require('../database');
var chalk = require('chalk');
var mongoose = require('mongoose');
var EMP = mongoose.model('employee');

exports.getEmpList = function (req,res){
    EMP.find({}, function(err,stories){
        res.send(stories);
    });
};

exports.addEmp = function (req,res){
    var data = {};
    console.log(req.body);
    var tempEmp = new EMP();
    tempEmp.name = req.body.name;
    tempEmp.salary = parseInt(req.body.salary);
    tempEmp.project =req.body.project;
    tempEmp.desigination = req.body.designation;

    tempEmp.save(function(err,savedUser){
       if(err){
         console.log("User already exists with that username or email");
         var message="A user already exists with that username or email";
         res.status(500).send({ error: err });
         return;
       }else{
            res.send("success");
       }
   });
};
     
        