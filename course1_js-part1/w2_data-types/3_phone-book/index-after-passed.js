var phoneBook = {};

module.exports = function(command) {
    var commandParts = command.split(' ');
    var cmd = commandParts[0];

    if (cmd === 'ADD') {
        var contactName = commandParts[1]; 
        var phones = commandParts[2].split(',');

        return addContact(contactName, phones);
    }

    if (cmd === 'REMOVE_PHONE') {
        var phone = commandParts[1];

        return removePhone(phone);
    }

    if (cmd === 'SHOW') {
        return showContacts();
    }
};

function addContact(name, phones) {
    if (!phoneBook.hasOwnProperty(name)) {
        phoneBook[name] = [];
    }

    phoneBook[name] = phoneBook[name].concat(phones);
}

function showContacts() {
    var names = Object.keys(phoneBook);
    names.sort();

    var phones;

    return names.map(function(name) {
        phones = phoneBook[name];

        return name + ': ' + phones.join(', ');
    });;
}

function removePhone(phone) {
    var names = Object.keys(phoneBook);
    var phones;
    var phoneIndex;

    for (var i = 0; i < names.length; i++) {
        phones = phoneBook[names[i]];
        phoneIndex = phones.indexOf(phone);

        if (phoneIndex !== -1) {
            removePhoneAt(names[i], phoneIndex);
            return true;
        }
    }    
        
    return false;
}

function removePhoneAt(name, index) {
    phoneBook[name].splice(index, 1);

    if (phoneBook[name].length === 0) {
        delete phoneBook[name];
    }
}