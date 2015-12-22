var cv = require('opencv');
var fs = require('fs');
var exec = require('child_process').execSync;

function composition(face) {
	return ['composite', '-geometry', face.width+'x'+face.height+'+'+face.x+'+'+face.y];
}

var photo = process.argv[2];
var out = process.argv[3];
var addFace = process.argv[4];

cv.readImage(photo, function(err, image) {
	image.detectObject(cv.FACE_CASCADE, {}, function(err, faces) {
		image.save(out);
		faces.forEach(function(face) {
			exec(composition(face).concat([addFace, out, out]).join(' '));
		});
	});
});
