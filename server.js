// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// mongoose.connect(MONGODB_URI);
//mongodb:

var express = require('express'); 
var mongojs = require('mongojs');


//connecting mongodb:
// mongodb+srv://<username>:danineubauer@cluster0-0yfrd.mongodb.net/test?retryWrites=true&w=majority 


//initializing express: 
var app = express(); 

app.use(express.static("public"));
//database config: 
var databaseUrl = 'articlesdb'; 
var db = mongojs(databaseUrl); 

db.on('error', function(error) { 
    console.log('DB error: ', error); 
})

require(".//routes/html-routes")(app)
require(".//routes/api-routes.js")(app);

app.listen(3000, function() { 
    console.log('app running on port 3000')
})


//SCRAPPING: 
var cheerio = require("cheerio"); 
var axios = require("axios"); 


//Scrape articles to db: 
app.get("/scrape", function(req, res) { 
    
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
                                        
                    db.articles.insert({
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


