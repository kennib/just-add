var justAdd = require('./just-add');

var photo = process.argv[2];
var out = process.argv[3];
var addFace = process.argv[4];

justAdd(photo, out, addFace);
