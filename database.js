var MongoClient = require('mongodb').MongoClient,
  test = require('assert'),
  mongoose = require('mongoose'),
  chalk = require('chalk');


// var url = 'mongodb://localhost:27017/test';
var url = "mongodb://sonukomar:mongo@ds145302.mlab.com:45302/employee";

mongoose.connect(url);

mongoose.connection.on('connected', function (){
    console.log(chalk.green("Connection to the db is successfull."));
});

mongoose.connection.on('error', function (err){
    console.log(chalk.green("Error:" + err));
});

mongoose.connection.on('disconnected', function (){
    console.log(chalk.green("Connection to the db is terminated."));
});

var empSchema = new mongoose.Schema({
    name:{type:String, unique:true},
    salary:{type:Number,unique:false},
    desigination:{type:String,unique:false},
    project:{type:String,unique:false}
});

modelInstance = mongoose.model('employee',empSchema);

module.exports = modelInstance;
// 
// var newEmployee = {"name":"sonu Kumar","salary":"20000","desigination":"SE","project":"SITA"};

// modelInstance.db.collection('employees').save(newEmployee);


