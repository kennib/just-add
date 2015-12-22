var cv = require('opencv');
var fs = require('fs');

var photo = process.argv[2];

cv.readImage(photo, function(err, image) {
	image.detectObject(cv.FACE_CASCADE, {}, function(err, faces) {
		console.log("There are "+faces.length+" faces");
	});
});
