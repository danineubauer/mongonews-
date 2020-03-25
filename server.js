var express = require('express');
var logger = require("morgan");
var mongoose = require("mongoose");

//scraping tools: 
var axios = require("axios");
var cheerio = require("cheerio");

//require models: 
var db = require("./models");

var PORT = 3000;

//initializing express:
var app = express();

//log requests through morgan logger: 
app.use(logger('dev')); 

app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 
app.use(express.static('public')); 


mongoose.connect('mongodb://localhost/articles', {useNewUrlParser: true })

//Get route for scraping: 
app.get('/scrape', function(req, res) { 
    axios.get('https://www.theguardian.com/us').then(function(response) { 
        var $ = cheerio.load(response.data); 

        $('.fc-item__content').each(function(i, element) { 
            
            //headline:
            var title = $(element).text().replace(/\n/g, ''); 
            //summary: 
            var summary = $(element).parent().text().replace(/\n/g, '');
            //url:
            var link = $(element).children().children().children().attr("href"); 
            
            var result = {}; 

            result.title = $(element).text().replace(/\n/g, ''); 
            result.link = $(element).children().children().children().attr("href");

            //creating new article using result object 
            db.Article.create(result)
                .then(function(dbArticle) { 
                    console.log(i, result.title);
                    console.log(i, result.link) 
                    console.log('db', dbArticle)
                })
                .catch(function(err) { 
                    console.log(err); 
                })
            })

            res.send('scrape complete'); 
    })
}) 
    
//get articles from db: 
app.get('/articles', function(req, res) { 
    //grab every doc in Article collection:
    db.Article.find({}).populate('note').populate('Saved')
        .then(function(dbArticle) { 
            //if found, send to client: 
            res.json(dbArticle);
        })
        .catch(function(err) { 
            res.json(err); 
        }); 
}); 

//getting all the notes: 
app.get('/notes', function(req, res) { 
    db.Note.find({  })
    .then(function(dbArticle) { 
        //if found: 
        res.json(dbArticle); 
    })
    .catch(function(err) { 
        res.json(err); 
    })
})

//getting all the notes: 
app.get('/saved', function(req, res) { 
    db.Saved.find({  })
    .then(function(dbArticle) { 
        //if found: 
        res.json(dbArticle); 
    })
    .catch(function(err) { 
        res.json(err); 
    })
})
 

//grabbing specific Article by id to add a note:
app.get('/articles/:id', function(req, res) { 
    db.Article.findOne({ _id: req.params.id})
        .populate("note")
        .then(function(dbArticle) { 
            //if found: 
            res.json(dbArticle); 
        })
        .catch(function(err) { 
            res.json(err); 
        })
})

//SAVING:
// Route for saving/updating an Article's associated Note
app.post("/articles/:id", function(req, res) {
    db.Note.create(req.body)
      .then(function(dbNote) {
        // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
        // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
      })
      .then(function(dbArticle) {
        // If we were able to successfully update an Article, send it back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  //grabbing specific Article by id to add a note:
app.get('/articles/saved/:id', function(req, res) { 
    db.Article.findOne({ _id: req.params.id})
        .populate("saved")
        .then(function(dbArticle) { 
            //if found: 
            res.json(dbArticle); 
        })
        .catch(function(err) { 
            res.json(err); 
        })
})

    //SAVED ARTICLE:
  app.post("/articles/saved/:id", function(req, res) {
    db.Saved.create(req.body)
      .then(function(dbSave) {
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { Saved: dbSave._id },  { new: true });
      })
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
 
// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  
           

            // var results = []; 
    
                
                
                
//                 //headline:
//                 var title = $(element).text().replace(/\n/g, ''); 
                
//                 //summary: 
//                 var summary = $(element).parent().text().replace(/\n/g, '');
//                 //url:
//                 var link = $(element).children().children().children().attr("href"); 
                
//                 if (title && summary && link) { 
                                        
//                     db.articles.insert({
//                         title: title,
//                         summary: summary, 
//                         link: link

//                     }, 
//                     function(err, inserted) { 
//                         if (err) { 
//                             console.log(err); 
//                         }
//                         else { 
//                             console.log(inserted);
//                         }
//                     });
//                 };
            
//             });
//         });
//     console.log('scrape complete')
//     res.send('Articles scraped')
// });



// var express = require('express'); 
// //var mongojs = require('mongojs');
// var mongoose = require('mongoose'); 
// // var exp = require('./public/indec x.js')
// console.log(__dirname)

// //SCRAPPING: 
// var cheerio = require("cheerio"); 
// var axios = require("axios"); 

// //Require all models


// var db = require('./models');

// var PORT = process.env.PORT || 3000; 

// //initializing express: 
// var app = express(); 
// //connecting mongodb:
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/articlesdb";
// // mongoose.Promise = Promise;
// mongoose.connect(MONGODB_URI);

// // if (process.env.MONGODB_URI) { 
// //     mongoose.connect(databaseUrl);
// // } else { 
// //     mongoose.connect(databaseUrl)
// // }


// app.use(express.static("public"));
// //database config: 
// var databaseUrl = 'articlesdb'; 
// // var db = mongojs(databaseUrl); 
// // db.on('error', function(error) { 
// //     console.log('DB error: ', error); 
// // });
// // db.once("open", function(){
// //     console.log("Mongoose connection sucessful");
// // });

// require("./routes/html-routes")(app)
// require("./routes/api-routes.js")(app, db);


// app.listen(PORT, function() { 
//     console.log('app running on port '+ PORT)
// })





