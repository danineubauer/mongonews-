var serverpage = require('../server'); 

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