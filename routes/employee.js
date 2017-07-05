var express = require('express');
var router = express.Router();
var modelInstance = require('../database');
var chalk = require('chalk');
var mongoose = require('mongoose');
var EMP = mongoose.model('employee');

exports.getEmpList = function(req, res) {
    EMP.find({}, function(err, stories) {
        res.send(stories);
    });
};

exports.addEmp = function(req, res) {
    var data = {};

    var tempEmp = new EMP();
    tempEmp.name = req.body.name;
    tempEmp.salary = parseInt(req.body.salary);
    tempEmp.project = req.body.project;
    tempEmp.desigination = req.body.designation;

    tempEmp.save(function(err, savedUser) {
        if (err) {
            console.log("User already exists with that username or email");
            var message = "A user already exists with that username or email";
            res.status(500).send({
                error: err
            });
            return;
        } else {
            res.send("success");
        }
    });
};

exports.removeEmp = function(req, res) {

    modelInstance.findOneAndRemove({
        name: req.body.name
    }, function(err, result) {
        if (err) return res.send(500, err);
        res.status(200).send({'status':'success'});
    }, function() {
        return res.status(500).send('Something went wrong!!');
        
    });



};

exports.updateEmp = function(req, res) {
    console.log(req.body);
    modelInstance.findOneAndUpdate(
        {name:req.body.name},
        {name:req.body.name,salary:parseInt(req.body.salary),project:req.body.project,desigination:req.body.designation},
        function(err, result) {
            if (err) return res.status(500).send(err);
                    res.status(200).send({'status':'success'});
        },function(){
            return res.status(500).send('Something went wrong!!');
        }
    );
};