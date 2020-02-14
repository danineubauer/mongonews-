var articles = require('../server.js'); 

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