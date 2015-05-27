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
app.use(multer({
    dest: './uploads/',
    rename: function(fieldname, filename) {
        return filename + Date.now();
    },
    onFileUploadStart: function(file) {
        console.log(file.originalname + ' is starting ...')
    },
    onFileUploadComplete: function(file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path)
        done = true;
    }
}));

var port = process.env.PORT || 8080; // set our port

app.set('views', __dirname + '/views')
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'))

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
    res.send("ALIVE.");
});

// route to upload to server.
router.post('/upload', function(req, res) {
    var path = require('path'); // add path module

    fs.readFile(req.files.image.path, function(err, data) { // readfilr from the given path
        var dirname = path.resolve(".") + '/uploads/'; // path.resolve(“.”) get application directory path
        var newPath = dirname + req.files.image.originalFilename; // add the file name
        fs.writeFile(newPath, data, function(err) { // write file in uploads folder
            if (err) {
                document.get
            } else {
                res.send("Successfully uploaded your file");
            }
        });
    });
});

router.get('/download', function(req, res) {
    var path = require('path'); // get path
    var dir = path.resolve(".") + '/uploads/'; // give path
    fs.readdir(dir, function(err, list) { // read directory return  error or list
        if (err) return res.json(err);
        else
            res.json(list);
    });
});

router.get('/uploads/:file', function(req, res) {
    var path = require('path');
    file = req.params.file;
    var dirname = path.resolve(".") + '\\uploads\\';
    var img = fs.readFileSync(dirname + file);
    res.contentType(file);
    res.end(img, 'binary');
});

router.get('/:file(*)', function(req, res, next) { // this routes all types of file
    var path = require('path');
    var file = req.params.file;
    var path = path.resolve(".") + '/uploads/' + file;
    res.download(path); // magic of download fuction
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server listens on ' + port);
