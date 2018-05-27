function require(script) {
  var module = {};
  var exports = {};

  eval(script);

  return module.exports ? module.exports : exports;
}

module.exports = require;