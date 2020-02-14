// var serverpage = require('../server'); 
var mongojs = require('mongojs');
var databaseUrl = 'zoo'; 
var db = mongojs(databaseUrl); 

module.exports = function(app) { 
    app.get('/all', function(req, res) { 
        //grab all from database:
        db.animals.find({}, function(err, data) { 
            if (err) { 
                console.log(err); 
            }
            else { 
                res.json(data)
            }
        })
    })
}