/**
 * @param {Function[]} operations
 * @param {Function} callback
 */
module.exports = function (operations, callback) {
  if (operations.length === 0) {
    callback(null, []);
    return;
  }

  var resObjects = [];

  operations.forEach(function (func, index) {
    func(next);

    function next() {
      if (arguments[0] === null) {
        resObjects.push({
          order: index,
          data: arguments[1]
        });

        if (resObjects.length === operations.length) {
          var results = resObjects.reduce(function (dataArr, nextRes) {
            dataArr[nextRes.order] = nextRes.data;
            return dataArr;
          }, []);

          callback(null, results);
        }
      } else {
        callback(arguments[0]);
      }
    }
  });
};