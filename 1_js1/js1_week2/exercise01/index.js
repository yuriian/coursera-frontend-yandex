/**
 * @param {String} tweet
 * @returns {String[]}
 */

 // my solution (disadvantage is two iteration)
module.exports = function (tweet) {
    var tags =  tweet.split(' ')
        .filter(function(word) {
            return word.indexOf('#') !== -1;
        })
        .map(function(tag) {
            return tag.slice(1);
        });

    return tags;
};

// Yandex team solution
/**
 * @param {String} tweet
 * @returns {String[]}
 */
module.exports = function (tweet) {
    var words = tweet.split(' ');
    var hashtags = [];

    for (var i = 0; i < words.length; i++) {
        var word = words[i];

        if (word[0] === '#') {
            var hashtag = word.slice(1);

            hashtags.push(hashtag);
        }
    }
    
    return hashtags;
};

// my solution after Yandex solution was seen
module.exports = function(tweet) {
    var tags = [];

    tweet.split(' ').forEach(function(word) {
        if (word[0] === '#') {
            word = word.slice(1);
            tags.push(word);
        }
    });

    return tags;
};