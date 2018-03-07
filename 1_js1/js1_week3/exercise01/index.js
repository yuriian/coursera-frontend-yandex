/**
 * @param {String} date
 * @returns {Object}
 */
module.exports = function (date) {

    var date = {
        date: new Date(date),
        limitDate: new Date(2000, 0, 1),
        value: null,

        validateData: function(num, type) {
            var reg = /^(years|months|days|hours|minutes)$/i;

            if (num < 0 || !reg.test(type)) {
                throw new TypeError('Data is not valid!');
            } else {
                return true;
            }
        },

        updateNewDate: function() {
            var date = (this.date.getTime() < this.limitDate.getTime()) ? this.limitDate : this.date;

            var dateValues = {
                year: date.getFullYear(),
                month: date.getMonth() + 1, 
                dateNum: date.getDate(),
                hours: date.getHours(),
                minutes: date.getMinutes()
            };
            
            var year = dateValues.year;
            var month = dateValues.month < 10 ? '0' + dateValues.month : dateValues.month;
            var dateNum = dateValues.dateNum < 10 ? '0' + dateValues.dateNum : dateValues.dateNum;
            var hours = dateValues.hours < 10 ? '0' + dateValues.hours : dateValues.hours;
            var minutes = dateValues.minutes < 10 ? '0' + dateValues.minutes : dateValues.minutes;

            this.value = year + '-' + month + '-' + dateNum + ' ' + hours + ':' + minutes;
        },

        add: function (num, type) {
            this.validateData(num, type);

            switch (type) {
                case 'years':
                    this.date.setFullYear(this.date.getFullYear() + num);
                    break;
                case 'months':
                    this.date.setMonth(this.date.getMonth() + num);
                    break;
                case 'days':
                    this.date.setDate(this.date.getDate() + num);
                    break;
                case 'hours':
                    this.date.setHours(this.date.getHours() + num);
                    break;
                case 'minutes':
                    this.date.setMinutes(this.date.getMinutes() + num);
                    break;
            }

            this.updateNewDate();

            return this;
        },

        subtract: function (num, type) {
            this.validateData(num, type);

            switch (type) {
                case 'years':
                    this.date.setFullYear(this.date.getFullYear() - num);
                    break;
                case 'months':
                    this.date.setMonth(this.date.getMonth() - num);
                    break;
                case 'days':
                    this.date.setDate(this.date.getDate() - num);
                    break;
                case 'hours':
                    this.date.setHours(this.date.getHours() - num);
                    break;
                case 'minutes':
                    this.date.setMinutes(this.date.getMinutes() - num);
                    break;
            }

            this.updateNewDate();

            return this;
        },
    };

    return date;
};
