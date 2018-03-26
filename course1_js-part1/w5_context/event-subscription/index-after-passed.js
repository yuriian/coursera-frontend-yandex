var subscriptions = [];

module.exports = {
    /**
     * @param {String} event
     * @param {Object} subscriber
     * @param {Function} handler
     */
    on: function (event, subscriber, handler) {
        subscriptions.push({
            event: event,
            subscriber: subscriber,
            handler: handler
        });

        return this;
    },

    /**
     * @param {String} event
     * @param {Object} subscriber
     */
    off: function (event, subscriber) {
        subscriptions = subscriptions.filter(function(item) {
            return item.event !== event || item.subscriber !== subscriber;
        });

        return this;
    },

    /**
     * @param {String} event
     */
    emit: function (event) {
        subscriptions.forEach(function(item){
            if (item.event === event) {
                item.handler.call(item.subscriber);
            }
        });

        return this;
    }
};
