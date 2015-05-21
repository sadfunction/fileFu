// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var path = require('path');
var ftp = require('./app/ftp'),
    multer = require('multer'),
    fs = require('fs');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(multer({ dest: './uploads/'}))

var port = process.env.PORT || 8080; // set our port

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

app.get('/', function(req, res) {
    res.render('index', {
        title: 'Home'
    })
})

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.send("Hello World.");
});

// route to upload to server.
router.post('/upload', function(req, res) {
    var path = require('path'); // add path module

    fs.readFile(req.files.image.path, function(err, data) { // readfilr from the given path
        var dirname = path.resolve(".") + '/uploads/'; // path.resolve(“.”) get application directory path
        var newPath = dirname + req.files.image.originalFilename; // add the file name
        fs.writeFile(newPath, data, function(err) { // write file in uploads folder
            if (err) {
                res.json("Failed to upload your file");
            } else {
                res.json("Successfully uploaded your file");
            }
        });
    });
});

// more routes for our API will happen here
router.get('/get', function(req, res) {
    console.log("Retrieving file.");
    res.send(ftp.download("test.txt"));
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server listens on ' + port);
