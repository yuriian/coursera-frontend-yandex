var fs = require('fs');
var Buffer = require('buffer').Buffer;
// const add = require('./add');
// console.dir(add);

require = require('./require');
var script = "exports = 'foo';"; // код модуля
var foobar = require(script); // импортируем

console.log(foobar); // печатает: foo
console.log(foobar.bar); // печатает: bar

// fs.readFile(__filename, (err, data) => {
//   var text = new Buffer(data);
//   console.log(text);
//   console.log(data.toString());
// });