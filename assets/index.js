$(document).ready(function() { 

    //article-box: 

    var articleBox = $('#article-box'); 
    
    //button actions: 
    $(document).on("click", ".scrape", scrapeArticlesHandle); 
    $(document).on("click", "#clear", clearArticlesHandle); 
    $(document).on("click", "#save", saveArticlesHandler); 

    //scrape articles: 
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

    //clear articles: 

    //save article: 

})