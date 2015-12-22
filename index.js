var cv = require('opencv');
var fs = require('fs');

var photo = process.argv[2];
var out = process.argv[3];

cv.readImage(photo, function(err, image) {
	image.detectObject(cv.FACE_CASCADE, {}, function(err, faces) {
		faces.forEach(function(face) {
			image.ellipse(face.x + face.width/2, face.y + face.height/2, face.width/2, face.height/2);
		});
		image.save(out);
	});
});
