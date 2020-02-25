// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// mongoose.connect(MONGODB_URI);
//mongodb:

var express = require('express'); 
//var mongojs = require('mongojs');
var mongoose = require('mongoose'); 
// var exp = require('./public/indec x.js')
console.log(__dirname)

//SCRAPPING: 
var cheerio = require("cheerio"); 
var axios = require("axios"); 

//Require all models


var db = require('./models');

var PORT = process.env.PORT || 3000; 

//initializing express: 
var app = express(); 
//connecting mongodb:
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/articlesdb";
// mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// if (process.env.MONGODB_URI) { 
//     mongoose.connect(databaseUrl);
// } else { 
//     mongoose.connect(databaseUrl)
// }


app.use(express.static("public"));
//database config: 
var databaseUrl = 'articlesdb'; 
// var db = mongojs(databaseUrl); 
// db.on('error', function(error) { 
//     console.log('DB error: ', error); 
// });
// db.once("open", function(){
//     console.log("Mongoose connection sucessful");
// });

require("./routes/html-routes")(app)
require("./routes/api-routes.js")(app, db);


app.listen(PORT, function() { 
    console.log('app running on port '+ PORT)
})



