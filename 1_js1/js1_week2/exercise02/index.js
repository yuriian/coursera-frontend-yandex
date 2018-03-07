/**
 * @param {String[]} hashtags
 * @returns {String}
 */

 // my solution (disadvantage - slower searching in an array, than in an object by key)
module.exports = function (hashtags) {
    var tags = [];
    var lowerTag;

    hashtags.forEach(function(tag) {
        lowerTag = tag.toLowerCase();

        if (tags.indexOf(lowerTag) === -1) {
            tags.push(lowerTag);
        }
    });

    return tags.join(', ');
};

// Yandex team solution
module.exports = function (hashtags) {
    // Создаем объект для хранения тегов
    // Он будет содержать все теги, которые мы встретили
    // Проверка существования ключа в объекте происходит быстрее, чем поиск в массиве
    var tagsMap = {};

    // Создаем массив для хранения результирующего списка тегов
    var tagsList = [];

    for (var i = 0; i < hashtags.length; i++) {
        // Приводим хэштег к нижнему регистру
        var hashtag = hashtags[i].toLowerCase();

        // Проверяем, встречали ли такой хэштег
        // Если не встречали, сохраняем его в список tagsList и объект tagsMap
        if (!tagsMap.hasOwnProperty(hashtag)) {
            tagsMap[hashtag] = true;
            tagsList.push(hashtag);
        }
    }

    // Склеиваем теги и возвращаем результат
    return tagsList.join(', ');
};

// my solution after Yandex solution was seen
module.exports = function(hashtags) {
    var tagsMap = {};
    var tagsList = [];

    hashtags.forEach(function(tag) {
        tag = tag.toLowerCase();

        if (!tagsMap.hasOwnProperty(tag)) {
            tagsMap[tag] = true;
            tagsList.push(tag);
        }
    });

    return tagsList.join(', ');
};
