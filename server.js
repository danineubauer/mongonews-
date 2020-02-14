// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// mongoose.connect(MONGODB_URI);


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