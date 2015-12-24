var cv = require('opencv');
var exec = require('child_process').execSync;

function composition(face) {
	var size = 1.6;
	var width = size * face.width;
	var height = size * face.height;
	return ['composite', '-geometry', width+'x'+height+'+'+(face.x)+'+'+(face.y - face.height/4)];
}

function justAdd(photo, out, addFace) {
	cv.readImage(photo, function(err, image) {
		image.detectObject(cv.FACE_CASCADE, {}, function(err, faces) {
			image.save(out);
			faces.forEach(function(face) {
				exec(composition(face).concat([addFace, out, out]).join(' '));
			});
		});
	});
}

module.exports = justAdd;
