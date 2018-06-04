'use strict';

// Код валидации формы
function validateForm(formAttributes) {
  var form = document.getElementById(formAttributes.formId);
  var formValidClass = formAttributes.formValidClass;
  var formInvalidClass = formAttributes.formInvalidClass;
  var inputErrorClass = formAttributes.inputErrorClass;
  var isValid = false;

  form.addEventListener('blur', handleBlur, true);
  form.addEventListener('focus', handleFocus, true);
  form.addEventListener('submit', handleSubmit);

  function handleBlur(event) {
    var elem = event.target;
    var value = elem.value;
    var inputClass;

    if (elem.tagName === 'INPUT') {
      isValid = validateInput(elem);
    }
  }

  function handleFocus(event) {
    if (event.target.tagName === 'INPUT') {
      event.target.classList.remove(inputErrorClass);
    }
  }

  function handleSubmit(event) {
    var elem = event.target;
    var isValid = false;

    var inputs = Array.from(document.querySelectorAll('#profile input'));
    var input;

    for (var i = 0, l = inputs.length; i < l; i++) {
      input = inputs[i]
      if (!validateInput(input)) {
        isValid = false;
        break;
      } else {
        isValid = true;
      }
    }

    if (isValid) {
      elem.classList.remove(formInvalidClass);
      elem.classList.add(formValidClass);
    } else {
      elem.classList.remove(formValidClass);
      elem.classList.add(formInvalidClass);
      event.preventDefault();
    }

    event.preventDefault();
  }

  function validateInput(input) {
    var val = input.value;
    var isValid = false;

    switch (input.dataset.validator) {
      case 'letters':
        isValid = /^[a-zа-яё]{2,}$/gi.test(val);
        break;
      case 'number':
        if (/^-?\d+$/.test(val)) {
          isValid = true;

          if ('validatorMin' in input.dataset &&
            val < +input.dataset.validatorMin ||
            'validatorMax' in input.dataset &&
            val > +input.dataset.validatorMax) {
            isValid = false;
          }
        }
        break;
      case 'regexp':
        isValid = new RegExp(input.dataset.validatorPattern).test(val) ||
          val === '';
        break;
    }

    if ('required' in input.dataset && val === '') {
      isValid = false;
    }

    if (!('required' in input.dataset) && val === '') {
      isValid = true;
    }

    isValid ?
      input.classList.remove(inputErrorClass) :
      input.classList.add(inputErrorClass);

    return isValid;
  }
}