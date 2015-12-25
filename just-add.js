var cv = require('opencv');
var exec = require('child_process').execSync;

function composition(face) {
	var size = 1.6;
	var width = size * face.width;
	var height = size * face.height;
	return ['composite', '-geometry', width+'x'+height+'+'+(face.x)+'+'+(face.y - face.height/4)];
}

function shrink(inImage, outImage) {
	return ['convert', inImage, '-resize', '1000x1000\\>', outImage];
}

function justAdd(photo, out, addFaces, callback) {
	exec(shrink(photo, out).join(' '));
	cv.readImage(out, function(err, image) {
		image.detectObject(cv.FACE_CASCADE, {}, function(err, faces) {
			if (faces) {
				faces.forEach(function(face) {
					var addFace = addFaces[Math.floor(Math.random() * addFaces.length)];
					exec(composition(face).concat([addFace, out, out]).join(' '));
				});
			}
			callback();
		});
	});
}

module.exports = justAdd;
