/**
 * @param {Number} hours
 * @param {Number} minutes
 * @param {Number} interval
 * @returns {String}
 */

 // my solution
module.exports = function (hours, minutes, interval) {
    minutes += interval;

    if (minutes > 59) {
        hours += Math.floor(minutes / 60);
        minutes %= 60;        
    }

    if (hours > 23) {
        hours %= 24;
    }

    minutes = minutes < 10 ? ('0' + minutes) : minutes;
    hours = hours < 10 ? ('0' + hours) : hours;

    return hours + ':' + minutes;
};

// Yandex team solution
var HOURS_PER_DAY = 24;
var MINUTES_PER_HOUR = 60;

module.exports = function (hours, minutes, interval) {
    minutes += interval;
    hours += Math.floor(minutes / MINUTES_PER_HOUR);

    minutes %= MINUTES_PER_HOUR;
    hours %= HOURS_PER_DAY;

    if (hours < 10) {
        hours = '0' + hours;
    }

    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    return hours + ':' + minutes;
};

// my solution after Yandex solution was seen
module.exports = function (hours, minutes, interval) {
    minutes += interval;
    hours += Math.floor(minutes / 60);

    minutes %= 60;
    hours %= 24;

    minutes = minutes < 10 ? ('0' + minutes) : minutes;
    hours = hours < 10 ? ('0' + hours) : hours;

    return hours + ':' + minutes;
};