/**
 * @param {String} date
 * @returns {Object}
 */
module.exports = function (dateStr) {
    var regDate = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})/;
    var matched = dateStr.match(regDate);

    var date = {
        date: new Date(matched[1], matched[2] - 1, matched[3], matched[4], matched[5]),

        validateData: function(num, type) {
            var reg = /^(years|months|days|hours|minutes)$/i;

            if (num < 0) {
                throw new TypeError('The number cannot be negative!');
            }
            
            if(!reg.test(type)) {
                throw new TypeError('Unknown time period!');
            }
        },

        get value() {
            var res = '';

            var dateValues = {
                year: this.date.getFullYear(),
                month: this.date.getMonth() + 1, 
                dateNum: this.date.getDate(),
                hours: this.date.getHours(),
                minutes: this.date.getMinutes()
            };
            
            res += dateValues.year;
            res += '-' + (dateValues.month < 10 ? '0' + dateValues.month : dateValues.month);
            res += '-' + (dateValues.dateNum < 10 ? '0' + dateValues.dateNum : dateValues.dateNum);
            res += ' ' + (dateValues.hours < 10 ? '0' + dateValues.hours : dateValues.hours);
            res += ':' + (dateValues.minutes < 10 ? '0' + dateValues.minutes : dateValues.minutes);

           return res;
        },

        changeDate: function(num, type) {
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
                default:
            }
        },

        add: function (num, type) {
            this.validateData(num, type);
            this.changeDate(num, type);

            return this;
        },

        subtract: function (num, type) {
            this.validateData(num, type);
            this.changeDate(-1 * num, type);

            return this;
        },
    };

    return date;
};
