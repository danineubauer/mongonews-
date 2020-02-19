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

