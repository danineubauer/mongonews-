var path = require('path'); 

module.exports = function(app) { 

    // console.log(__dirname)
    
    app.get('/home', function(req, res) { 
        res.sendFile(path.join(__dirname, '../../mongonews-/view/index.html'));
    }); 

    app.get('/saved', function(req, res) {
        res.sendFile(path.join(__dirname, '../../mongonews-/view/saved.html'))
    })
}