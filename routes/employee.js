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
    
    var tempEmp = new EMP();
    tempEmp.name = "meri x jaan";
    tempEmp.salary = 20012;
    tempEmp.project ="Digital";
    tempEmp.desigination = "Test engineer";

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
     
        