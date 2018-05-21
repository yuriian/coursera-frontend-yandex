/**
 * @param {Function[]} operations
 * @param {Function} callback
 */
module.exports = function (operations, callback) {
  if (operations.length === 0) {
    callback(null, []);
    return;
  }

  var results = [];
  var operationCounter = 0;
  var isError = false;

  operations.forEach(function (operationFunc, index) {
    operationFunc(function next(err, data) {
      if (isError) {
        return;
      }

      if (err) {
        callback(err);
        isError = true;

        return;
      }

      results[index] = data;
      operationCounter++;

      if (operationCounter === operations.length) {
        callback(null, results);
      }
    });
  });
};