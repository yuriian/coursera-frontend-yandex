/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
function query(collection) {
    var clonedCollection = cloneCollection(collection);
    var operations = [].slice.call(arguments, 1);

    operations.sort(function(operation1, operation2) {
        return operation1.name > operation2.name ? 1 : -1;
    });

    return operations.reduce(function(resCollection, operation) {
        return operation(resCollection);
    }, clonedCollection);
}

/**
 * @params {String[]}
 */
function select() {
    var properties = [].slice.call(arguments);

    return function operation2(collection) {
        return collection.map(function(obj) {
           return cloneItem(obj, properties);
        });
    };    
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {
    return function operation1(collection) {
        return collection.filter(function(item) {
            return values.indexOf(item[property]) > -1;
        });
    };
}

function cloneCollection(collection) {
    return collection.map(function(item) {
        var properties = Object.keys(item);

        return cloneItem(item, properties);
    });
}

function cloneItem(item, properties) {
    var newItem = {};

    properties.forEach(function(prop) {
        if (item.hasOwnProperty(prop)) {
            newItem[prop] = item[prop];
        }        
    });

    return newItem;
}

module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};
