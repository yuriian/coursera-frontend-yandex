module.exports = {
    events: {},

    /**
     * @param {String} event
     * @param {Object} subscriber
     * @param {Function} handler
     */
    on: function (event, subscriber, handler) {
        if (!this.events.hasOwnProperty(event)) {
            this.events[event] = [];
        }

        this.events[event].push(
            {
                subscriber: subscriber,
                handler: handler
            }
        );

        return this;
    },

    /**
     * @param {String} event
     * @param {Object} subscriber
     */
    off: function (event, subscriber) {
        var subsItems = this.events[event];

        if (subsItems) {
            this.events[event] = subsItems.filter(function(item) {
                return item.subscriber !== subscriber;
            });
        }

        return this;
    },

    /**
     * @param {String} event
     */
    emit: function (event) {
        var subsItems = this.events[event];
        
        if (subsItems) {
            subsItems.forEach(function(item) {
                item.handler.call(item.subscriber);
            });
        }
        
        return this;
    }
};
