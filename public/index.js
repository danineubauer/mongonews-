$(document).ready(function() { 

    //article-box: 

    var articleBox = $('#article-box'); 
    
    //button actions: 
    $(document).on("click", ".scrape", scrapeArticlesHandle); 
    $(document).on("click", "#clear", clearArticlesHandle); 
    $(document).on("click", "#save", saveArticlesHandler); 

    function scrapeArticlesHandle(articles) {
        console.log('scrape clicked') 
        articles.forEach(function(article) {
            var div = $('<div>').append(
                $("<div>").text(articles.title),
                $("<div>").text(articles.summary), 
                $("<div>").text(articles.link)
            );
            $("#addArticleInfoHere").append(div)
        });
        
        //appending: 
    };


    function clearArticlesHandle(articles) { 
        console.log('clear article button clicked')
    }

    function saveArticlesHandler(articles) { 
        console.log('save article button clicked')
    }
    
});




    //scrape articles: 
    // axios.get("https://www.theguardian.com/us")
    // .then(function(response) { 
       
    //     var $ = cheerio.load(response.data); 

    //     var results = []; 

    //     $('.fc-item__content').each(function(i, element) { 
            
    //         //headline:
    //         var title = $(element).text().replace(/\n/g, ''); 
            
    //         //summary: 
    //         var summary = $(element).parent().text().replace(/\n/g, '');
    //         //url:
    //         var link = $(element).children().children().children().attr("href"); 

    //         //photo:
    //         results.push({ 
    //             title: title.replace(/\n/g, ''), 
    //             summary: summary, 
    //             link: link
    //         })
    //     })
    //     console.log(results)
    // })

    //clear articles: 

    //save article: 

