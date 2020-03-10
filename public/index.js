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
        alert('Article saved!')
        // *************************************
        //saves over and over again 
        //************************************ */
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
        alert('Note added!')
        $("#notes").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });
  
  //See all notes:
$(document).on('click', '#seeAllNotes', function() {
    console.log('showing notes'); 
    
    $.getJSON('/articles', function (data) {
        console.log('rendering saved articles')
        for (var i = 0; i < 10; i++) {
            $("#addArticleInfoHere").append("<hr><a data-id='" + data[i]._id + "' href='" + data[i].link + "'>" + data[i].title + "</a><br/>");
        // *******************************
        // Grab all the notes saved! 
        // *******************************
        }
    })
    
})

  //see all articles saved 
  $(document).on('click', '#seeAllArticles', function() {
    console.log('showing notes'); 
    $('#addArticleInfoHere').empty();

    $.getJSON('/saved', function (data) {
        console.log('rendering saved articles')
        for (var i = 0; i < 10; i++) {
            $("#addArticleInfoHere").append("<hr><a data-id='" + data[i]._id + "' href='" + data[i].link + "'>" + data[i].title + "</a><br/>");
        // *******************************
        // Grab all the articles saved! 
        // *******************************
        }
    })
})