var collCopy;

/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
function query(collection) {
    if (arguments.length === 0) {
        return collection.slice();
    }

    for (var i = 1; i < arguments.length; i++) {
        if (arguments[i].name === 'filterIn') {
            collection = arguments[i](collection);
        }
    }

    for (var i = 1; i < arguments.length; i++) {
        if (arguments[i].name === 'select') {
            collection = arguments[i](collection);
        }
    }

    return collection;
}

/**
 * @params {String[]}
 */
function select() {
    var args = arguments;

    return function select(collection) {
        var newColl = [];
        var newObj;

        collection.forEach(function(obj) {
            newObj = {};

            for (var i = 0; i < args.length; i++) {
                if (args[i] in obj) {
                    newObj[args[i]] = obj[args[i]];
                }
            }

            newColl.push(newObj);
        });

        return newColl;
    };    
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {
    return function filterIn(collection) {
		function reducer(arr, obj) {
			values.forEach(function(value) {
				if (obj[property] === value) {
					arr.push(obj);
				}
			});
		
			return arr;
        }

        return collection.reduce(reducer, []);
    };
}

module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};
