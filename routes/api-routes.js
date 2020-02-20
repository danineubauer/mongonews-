// var serverpage = require('../server'); 
var mongojs = require('mongojs');
var databaseUrl = 'articlesdb'; 
var db = mongojs(databaseUrl); 

module.exports = function(app) { 
    app.get('/all', function(req, res) { 
        //grab all from database:
        db.articles.find({}, function(err, data) { 
            if (err) { 
                console.log(err); 
            }
            else { 
                res.json(data)
            }
        })
    })
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

