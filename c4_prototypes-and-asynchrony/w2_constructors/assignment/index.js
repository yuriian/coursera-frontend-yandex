module.exports = Collection;

/**
 * Конструктор коллекции
 * @constructor
 */
function Collection() {
  this._arr = [];
}

Collection.from = function (arr) {
  return arr.reduce(
    function (collection, curValue) {
      collection.append(curValue);
      return collection;
    },
    new Collection()
  );
};

// Методы коллекции
Collection.prototype.count = function () {
  return this._arr.length;
};

Collection.prototype.values = function () {
  return this._arr;
};

Collection.prototype.at = function (position) {
  return position > 0 && position <= this.count() ?
    this._arr[--position] :
    null;
};

Collection.prototype.append = function (item) {
  if (item instanceof Collection) {
    item = item.values();
  }

  if (item instanceof Array) {
    Array.prototype.push.apply(this._arr, item);
  } else {
    this._arr.push(item);
  };

  Collection.prototype.removeAt = function (position) {
    if (this._arr[position - 1]) {
      this._arr.splice(position - 1, 1);
      return true;
    }

    return false;
  };
}