// Телефонная книга
var phoneBook = {};

/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */
var contactsMap = {};
var contactsList = [];
var phonesMap = {};

module.exports = function (command) {
    var commandArr = command.split(' ');
    var cmd = commandArr[0];

    if (cmd === 'ADD') {
        var contact = commandArr[1];
        var phones = commandArr[2].split(',');

        if (!contactsMap.hasOwnProperty(contact)) {         
            contactsMap[contact] = {phones: phones};
            contactsList.push(contact);
        } else {
            var oldPhonesArr = contactsMap[contact].phones;
            contactsMap[contact].phones = oldPhonesArr.concat(phones);
        }

        phones.forEach(function(phone) {
            if (!phonesMap.hasOwnProperty(phone)) {
                phonesMap[phone] = contact;
            }
        });      
    } else if (cmd === 'REMOVE_PHONE') {
        var phoneToRemove = commandArr[1];
        var contact;
        var isPhoneRemoved = false;

        if (phonesMap.hasOwnProperty(phoneToRemove)) {
            contact = phonesMap[phoneToRemove];
            var phones = contactsMap[contact].phones;

            phones.forEach(function(phone, index, array) {
                if (phoneToRemove === phone) {
                    array.splice(index, 1);
                    isPhoneRemoved = true;
                }
            });
        }

        return isPhoneRemoved;  
    } else if (cmd === 'SHOW') {
        contactsList.sort();

        var contactArr = [];
        var contact;
       
        for (var i = 0; i < contactsList.length; i++ ) {
            contact = contactsList[i];

            if ( contactsMap[contact].phones.length > 0) {
                contactArr.push(contact + ': ' + contactsMap[contact].phones.join(', '));
            }   
        }

        return contactArr;
    }
};
