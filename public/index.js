



var articleInfo = $('#addArticleInfoHere')

function displayResults(articles) { 
    console.log('displaying data')
    articles.forEach (function(article) { 
        // console.log(article.title)
        // console.log(article.summary)
        // console.log(article.link)
        var articleContainer = $("<div>");
        var link = $("<a>");
        link.attr('href', article.link).addClass('article-link').attr('target', '_blank').text(article.title);
        var button = $("<button>");
        button.data('title', article.title).data('summary', article.summary).data('link', article.link);
        button.addClass('saveBtn').text("Save Article");
        articleContainer.append(link, button);


        var card = $("<div class='card'>");
        var cardHead = $("<div class='card-header'>").append(
            // $("<h3>").append(
            //     $("<a class='article-link' target='_blank' rel='noopener noreferrer'>")
            //         .attr("href", article.link)
            //         .text(article.title),
            //     $("<div><a id='saveBtn' class='btn btn-success save '>Save Article</a></div>")
            // )
            articleContainer
        )
        var cardBody = $("")

        //$("<div class='card-body'>").text(article.summary);

        card.append(cardHead, cardBody); 
        
        card.data("_id", article._id); 

        // return card;

        $('#addArticleInfoHere').append(card)

    })
}

$(".scrape").on("click", function() { 
    event.preventDefault();
    console.log('scraping data')
    $.getJSON('/api/scrape', function(data) {
            displayResults(data)
 
    })
});

$('#clear').on("click", function() {
    event.preventDefault();
    console.log('clearing data') 
    $('#addArticleInfoHere').text('')
})

$('#homeOnHome').on("click", function() {
    event.preventDefault();
    console.log('You are on home') 
})

$('#saveOnHome').on("click", function() {
    console.log('going to saved articles') 
})

$('#homeOnSave').on("click", function() {
    console.log('going home') 
})

$('#saveOnSave').on("click", function() {
    event.preventDefault(); 
    console.log('you are on your saved articles page') 
})


$('#addArticleInfoHere').on("click", '.saveBtn', function() { 
    console.log('saving article')
   console.log('link to article',  $(this).data('link'));
    // articleToSave() 
})

//SAVE ARTICLE!!! 
function articleToSave() { 
    var saveThisArticle = $(this)
        .parents('.card')
        .data();

    $(this)
        .parents(".card")
        .remove();

    articleToSave.saved = true;

    console.log(articleToSave)
    $.ajax({
        method: "PUT", 
        url: '/api/headlines/' + articleToSave._id,
        data: articleToSave
    }).then(function(data) { 
        console.log(data)
        if(data) { 
            location.reload(); 
        }
    })
}



// $(document).ready(function() { 

//     //article-box: 

//     var articleBox = $('#article-box'); 
    
//     //button actions: 
//     $(document).on("click", ".scrape", scrapeArticlesHandle); 
//     $(document).on("click", "#clear", clearArticlesHandle); 
//     $(document).on("click", "#save", saveArticlesHandler); 

//     function scrapeArticlesHandle(articles) {
//         console.log('scrape clicked') 
  
//         db.articles.forEach(function(article) {
//             var div = $('<div>').append(
//                 $("<div>").text(article.title),
//                 $("<div>").text(article.summary), 
//                 $("<div>").text(article.link)
//             );
//             $("#addArticleInfoHere").append(div)
//         });
        
//         //appending: 
//     };


//     function clearArticlesHandle(articles) { 
//         console.log('clear article button clicked')
//     }

//     function saveArticlesHandler(articles) { 
//         console.log('save article button clicked')
//     }

// });




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

