var path = require('path'); 

module.exports = function(app) { 
    
    app.get('/home', function(req, res) { 
        res.sendFile(path.join(__dirname, '../../mongonews-/view/index.html'));
    }); 

    app.get('/saved', function(req, res) {
        res.sendFile(path.join(__dirname, '../../mongonews-/view/saved.html'))
    })

    
}