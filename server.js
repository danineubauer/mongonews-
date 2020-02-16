// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// mongoose.connect(MONGODB_URI);
//mongodb:

var express = require('express'); 
var mongojs = require('mongojs');

//initializing express: 
var app = express(); 

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

//requesting news HTML: 
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

            //photo:
            results.push({ 
                title: title.replace(/\n/g, ''), 
                summary: summary, 
                link: link
            })
        })
        console.log(results)
    })

//add articles to db: 
app.get("/save"), function(req, res) { 
    db.acTable.insert({"title": title} )
}


// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// mongoose.connect(MONGODB_URI);


//pseudo coding: 

//create html pages
//connect server to the pages 
    //home 
    //saved articles 
//news api 
    //headline 
    //summary 
    //url
//add buttons: 
    //home: 
        //scrape articles 
        //save article 
        //clear articles
    //saved: 
        //clear articles 
        //delete from saved 
        //article notes 
            //should open a tab to add notes 