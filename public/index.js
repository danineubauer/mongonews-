//container for articles to save:
const articleContainer = document.getElementById("addArticleInfoHere")

// grab articles as a json and display all: 
$("#display").on("click", function () {
    console.log('display articles clicked')

    $.getJSON('/articles', function (data) {
        console.log('rendering articles')
        for (var i = 0; i < 10; i++) {
            
            //save - create button:
            const buttonSave = document.createElement("button")
            buttonSave.innerText = 'save';
            $(buttonSave).attr('data-id', data[i]._id)
            $(buttonSave).attr('id', 'save')

            //addnote - create button: 
            const buttonNote = document.createElement("button")
            buttonNote.innerText = 'Add Note';
            $(buttonNote).attr('data-id', data[i]._id)
            $(buttonNote).attr('id', 'addNote')
            
            //article info:
            $("#addArticleInfoHere").append("<hr><a data-id='" + data[i]._id + "' href='" + data[i].link + "'>" + data[i].title + "</a><br/>");
            
            function renderbutton(index) { 
                buttonSave.addEventListener("click", function() { 
                    console.log('save btn number ' + index + ' clicked')
                })
                buttonNote.addEventListener("click", function() { 
                    console.log('add note ' + index + ' clicked')
                })
            }

            renderbutton(i);

            //render buttons:
            // $('#addArticleInfoHere').append(buttonSave).append("<hr>")
            articleContainer.appendChild(buttonSave)
            articleContainer.appendChild(buttonNote)            
        }
    })
})

//save note 
$(document).on("click", "#save", function() { 
    console.log('save btn clicked')
    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "POST", 
        url: "/articles/saved/" + thisId,
        data: {
            saved: true,
        }
    })
    .then(function(data) { 
        console.log('article saved')
        if (data.saved) { 
            alert('you have already saved this')
        }
        else { 
            console.log('not')
        }
    })

})


// When note is clicked: 
$(document).on("click", '#addNote', function() {
    console.log('addNote clicked')
    $("#notes").empty();

    var thisId = $(this).attr("data-id");
  
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      .then(function(data) {
        console.log(data);
        $("#notes").append("<h2>" + data.title + "</h2>");
        $("#notes").append("<input id='titleinput' name='title' >");
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
  
        // If there's a note in the article
        if (data.note) {
            console.log("there's a note")
          // Place the title of the note in the title input
          $("#titleinput").val(data.note.title);
          console.log(data.note.title)
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.note.body);
          console.log(data.note.body)
        }
      });
  });

  
// When you click the savenote button
$(document).on("click", "#savenote", function() {
    console.log('post data')
    var thisId = $(this).attr("data-id");
  
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        title: $("#titleinput").val(),
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function(data) {
        console.log(data);
        $("#notes").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });
  

// $(document).on('click', '#save', function() { 
//     console.log('save clicked')
//     //grab id:
//     var thisId = $(this).attr('data-id'); 

//     //ajax call for article 
//     $.ajax({ 
//         method: "POST", 
//         url: "/articles/" + thisId,
//         data: { 
//             saved: "true"
//         }
//     })
//         .then(function(data) { 
//             console.log(data.saved)
//             console.log(data); 
//         })
// })




//function when article is saved: 

//




// var articleInfo = $('#addArticleInfoHere')

// function displayResults(articles) { 
//     console.log('displaying data')
//     articles.forEach (function(article) { 
//         // console.log(article.title)
//         // console.log(article.summary)
//         // console.log(article.link)
//         var articleContainer = $("<div>");
//         var link = $("<a>");
//         link.attr('href', article.link).addClass('article-link').attr('target', '_blank').text(article.title);
//         var button = $("<button>");
//         button.data('title', article.title).data('summary', article.summary).data('link', article.link);
//         button.addClass('saveBtn').text("Save Article");
//         articleContainer.append(link, button);


//         var card = $("<div class='card'>");
//         var cardHead = $("<div class='card-header'>").append(
//             // $("<h3>").append(
//             //     $("<a class='article-link' target='_blank' rel='noopener noreferrer'>")
//             //         .attr("href", article.link)
//             //         .text(article.title),
//             //     $("<div><a id='saveBtn' class='btn btn-success save '>Save Article</a></div>")
//             // )
//             articleContainer
//         )
//         var cardBody = $("")

//         //$("<div class='card-body'>").text(article.summary);

//         card.append(cardHead, cardBody); 

//         card.data("_id", article._id); 

//         // return card;

//         $('#addArticleInfoHere').append(card)

//     })
// }

// $(".scrape").on("click", function() { 
//     event.preventDefault();
//     console.log('scraping data')
//     $.getJSON('/all', function(data) {
//             displayResults(data)

//     })
// });

// $('#clear').on("click", function() {
//     event.preventDefault();
//     console.log('clearing data') 
//     $('#addArticleInfoHere').text('')
// })

// $('#homeOnHome').on("click", function() {
//     event.preventDefault();
//     console.log('You are on home') 
// })

// $('#saveOnHome').on("click", function() {
//     console.log('going to saved articles') 
// })

// $('#homeOnSave').on("click", function() {
//     console.log('going home') 
// })

// $('#saveOnSave').on("click", function() {
//     event.preventDefault(); 
//     console.log('you are on your saved articles page') 
// })


// $('#addArticleInfoHere').on("click", '.saveBtn', function() { 
//     console.log('saving article')
//    console.log('link to article',  $(this).data('link'));
//     // articleToSave() 
// })

// //SAVE ARTICLE!!! 
// function articleToSave() { 
//     var saveThisArticle = $(this)
//         .parents('.card')
//         .data();

//     $(this)
//         .parents(".card")
//         .remove();

//     articleToSave.saved = true;

//     console.log(articleToSave)
//     $.ajax({
//         method: "PUT", 
//         url: '/api/headlines/' + articleToSave._id,
//         data: articleToSave
//     }).then(function(data) { 
//         console.log(data)
//         if(data) { 
//             location.reload(); 
//         }
//     })
// }



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

