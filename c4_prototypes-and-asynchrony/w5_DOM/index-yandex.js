'use strict';

(function () {
  function validateNumber(value, min, max) {
    value = parseInt(value);

    if (isNaN(value)) {
      return false;
    }

    if (min && parseInt(min) > value) {
      return false;
    }

    if (max && parseInt(max) < value) {
      return false;
    }

    return true;
  }

  function validateRegexp(value, pattern, flags) {
    var re = new RegExp(pattern, flags);

    return re.test(value);
  }

  function validateValue(value, dataset) {
    switch (dataset.validator) {
      case 'number':
        return validateNumber(value, dataset.validatorMin, dataset.validatorMax);
      case 'letters':
        return validateRegexp(value, '^[a-zа-яё]+$', 'i');
      case 'regexp':
        return validateRegexp(value, dataset.validatorPattern);
      default:
        return true;
    }
  }

  function checkInput(input) {
    var value = input.value;
    if (input.dataset.hasOwnProperty('required') && !value) {
      return false;
    }

    var validator = input.dataset.validator;

    return (validator && value) ?
      validateValue(value, input.dataset) :
      true;
  }

  window.validateForm = function (options) {
    var form = document.getElementById(options.formId);
    var inputs = Array.from(
      document.querySelectorAll('#' + options.formId + ' input')
    );

    form.addEventListener('focus', function (event) {
      var target = event.target;
      if (target.tagName === 'INPUT') {
        target.classList.remove(options.inputErrorClass);
      }
    }, true);

    form.addEventListener('blur', function (event) {
      var target = event.target;
      if (target.tagName === 'INPUT') {
        if (!checkInput(target)) {
          target.classList.add(options.inputErrorClass);
        }
      }
    }, true);

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      form.classList.remove(options.formValidClass);
      form.classList.remove(options.formInvalidClass);

      var hasError = false;
      for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];

        if (!checkInput(input)) {
          input.classList.add(options.inputErrorClass);
          hasError = true;
        }
      }

      if (hasError) {
        form.classList.add(options.formInvalidClass);
      } else {
        form.classList.add(options.formValidClass);
      }
    });
  };
}());