/**
 * @param {Number} hours
 * @param {Number} minutes
 * @returns {Boolean}
 */
module.exports = function (hours, minutes) {
    // my solution
    // return (hours >=0 && hours < 24) && (minutes >= 0 && minutes < 60);

    // Yandex team solution
    if (hours < 0 || hours > 23) {
        return false;
    }

    if (minutes < 0 || minutes > 59) {
        return false;
    }

    return true;
};
