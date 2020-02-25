// var serverpage = require('../server'); 
var mongojs = require('mongojs');
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
//var databaseUrl = 'articlesdb'; 

module.exports = function(app, db) { 
    app.get('/api/all', function(req, res) { 
        //grab all from database:
        console.log("hello")
        db.Article.find({}, function(err, data) { 
            if (err) { 
                console.log(err);
                res.send(err) 
            }
            else { 
                res.json(data)
            }
        })
    });

    //Scrape articles to db: 
app.get("/api/scrape", function(req, res) { 
    console.log('scraping');
    //scrape from the guardian: 
    axios.get("https://www.theguardian.com/us")
        .then(function(response) { 
           
            var $ = cheerio.load(response.data); 

            var results = []; 
    
            $('.fc-item__content').each(function(i, element) { 
                
                
                
                //headline:
                var title = $(element).text().replace(/\n/g, ''); 
                
                //summary: 
                var summary = $(element).parent().text().replace(/\n/g, '');
                //url:
                var link = $(element).children().children().children().attr("href"); 
                
                if (title && summary && link) { 
                                        
                    db.Article.create({
                        title: title,
                        summary: summary, 
                        link: link

                    }, 
                    function(err, inserted) { 
                        if (err) { 
                            console.log(err); 
                        }
                        else { 
                            console.log(inserted);
                        }
                    });
                };
            
            });
        });
    console.log('scrape complete')
    res.send('Articles scraped')
});
}


// //*** Saved Articles display ****/
// app.get('/saved', function(req, res) { 
//     db.articles.find({saved: true}, function(err, data) { 
//         res.render('saved', {home: false, article: data})
//     })
// })

// app.put("/api/headlines/:id", function(req, res) { 
//     var saved = req.body.saved == 'true'
//     if(saved) { 
//         db.articles.updateOne({_id: req.body._id},{$set: {saved: true}}, function(err, result) { 
//             if(err) { 
//                 console.log(err)
//             } else { 
//                 return res.send(true)
//             }
//         })
//     }
// })

// app.delete("/api/headlines/:id", function(req, res) { 
//     console.log('reqbody:' + JSON.stringify(req.params.id))
//     db.articles.deleteOne({_id: req.params.id}, function(err, result) { 
//         if (err) { 
//             console.log(err)
//         } else { 
//             return res.send(true)
//         }
//     })
// })

