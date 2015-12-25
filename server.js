var fs = require('fs');
var path = require('path');
var express = require("express");
var busboy = require('connect-busboy');
var unique = require('unique-filename');
var justAdd = require('./just-add');

var server = process.argv[2] || 'localhost';
var port = process.argv[3] || '6000';
var addFaces = process.argv.slice(4);

console.log('Server started on port '+port);

var app = express();
app.use('/static', express.static('static'));
app.use(busboy());

app.get('/', function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res);
});
app.post('/', function (req, res) {
	var photo = unique('photos/')+'.png';
	var outPhoto = unique('photos/')+'.png';

	var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        fstream = fs.createWriteStream(path.join(__dirname, photo));
        file.pipe(fstream);
        fstream.on('close', function () {
			justAdd(photo, outPhoto, addFaces, function() {
				res.statusCode = 302;
				res.setHeader('Location', '/'+outPhoto);
				res.end();
			});
        });
    });
});
app.get('/photos/:file', function(req, res) {
	var photo = req.params.file;
	res.writeHead(200, {'Content-Type': 'image/png'});
	fs.createReadStream(path.join(__dirname, 'photos',  photo)).pipe(res);
});

app.listen(port);
