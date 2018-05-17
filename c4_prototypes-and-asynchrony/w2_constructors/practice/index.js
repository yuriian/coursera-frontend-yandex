const { log } = console;

function Person(name) {
  this.name = name;
}

Person.prototype.getName = function() {
  return this.name;
};

function Student(name) {
  Person.call(this, name);
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.getName = function() {
  return 'Student ' + this.getName();
};

const billy = new Student('Billy');
billy.getName();

log(billy.getName());
log(billy.name);
log(billy.__proto__);
