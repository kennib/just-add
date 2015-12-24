var justAdd = require('./just-add');

var photo = process.argv[2];
var out = process.argv[3];
var addFaces = process.argv.slice(4);

justAdd(photo, out, addFaces);
