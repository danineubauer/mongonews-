var path = require('path'); 

module.exports = function(app) { 
    
    app.get('/home', function(req, res) { 
        res.sendFile(path.join(__dirname, '../public/index.html'));
    }); 

    app.get('/saved', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/saved.html'))
    })

    app.get('/', function(req, res) { 
        res.sendFile(path.join(__dirname, '../public/index.html'));
    })
}