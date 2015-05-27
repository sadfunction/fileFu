var express = require('express'),
	bodyParser = require('body-parser'),
	path = require('path'),
	multer = require('multer'),
	fs = require('fs'),
	app = express(),
	router = express.Router(),
	port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(multer({
	dest: './uploads/',
	rename: function(fieldname, filename) {
		return filename;
	},
	onFileUploadStart: function(file) {
		console.log(file.originalname + ' is starting ...')
	},
	onFileUploadComplete: function(file) {
		console.log(file.fieldname + ' uploaded to  ' + file.path)
		done = true;
	}
}));
app.use(express.static(__dirname + '/public'))
app.set('views', __dirname + '/views')
app.set('view engine', 'jade');

app.get('/', function(req, res) {
	res.render('index', {
		title: 'Home'
	})
})

router.post('/upload', function(req, res) {
	fs.readFile(req.files.image.path, function(err, data) {
		var dirname = path.resolve(".") + '/uploads/',
			newPath = dirname
		fs.writeFile(newPath, data, function(err) {
			if (err) {
				res.send("Error " + err);
			} else {
				res.send("Successfully uploaded your file");
			}
		});
	});
});

router.get('/download', function(req, res) {
	var dir = path.resolve(".") + '/uploads/';

	fs.readdir(dir, function(err, list) {
		if (err) {
			return res.json(err);
		} else {
			res.json(list);
		}
	});
});

router.get('/uploads/:file', function(req, res) {
	var dirname = path.resolve(".") + '\\uploads\\',
		img = fs.readFileSync(dirname + file);

	file = req.params.file;
	res.contentType(file);
	res.end(img, 'binary');
});

router.get('/:file(*)', function(req, res, next) {
	var file = req.params.file,
		filePath = path.resolve(".") + '/uploads/' + file;

	res.download(filePath);
});

app.use('/api', router);

app.listen(port);
console.log('Server listens on ' + port);