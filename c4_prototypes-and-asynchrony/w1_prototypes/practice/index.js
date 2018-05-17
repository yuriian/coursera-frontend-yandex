'use strict';
var person = {
  type: 'human',
  getName: function() {
    return this.name;
  }
};

var student = {
  name: 'Billy',
  sleep: function() {}
};

var lecturer = {
  name: 'Alex',
  talk: function() {}
};

student.__proto__ = person;
lecturer.__proto__ = person;

// student.__proto__ = lecturer;
// lecturer.__proto__ = student;

Object.defineProperty(person, 'planet', {
  value: 'Earth',
  writable: false
});

// console.log(student.getName());
// console.info(student.planet);

// student.planet = 'Mars';

Object.defineProperty(person, 'age', {
  set: function(age) {
    this._age = parseInt(age);
    // console.log('set age ' + age);
  },
  get: function() {
    return this._age;
    // console.log('get age');
  }
});

student.age = '20 years';
// console.log(student.age);
// console.log(person.age);
// console.log(student.hasOwnProperty('_age'));

var kitty = {};
var cat = {};

Object.defineProperty(cat, 'color', {
  set: function() {
    this._color = 'Ginger';
  },
  get: function() {
    return this._color;
  }
});

Object.setPrototypeOf(kitty, cat);
kitty.color = 'Grey';
// console.log(kitty.color);

for (var key in student) {
  if (student.hasOwnProperty(key)) {
    // console.log(key);
  }
}

var keys = Object.keys(student);
// console.log(keys);

Object.defineProperty(student, 'number', {
  enumerable: false,
  value: 1111
});
for (var key in student) {
  console.log(key);
}

console.log(Object.keys(student));
