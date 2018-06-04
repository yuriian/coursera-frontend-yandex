'use strict';

// Код валидации формы

function validateForm (arg) {

    var formInit = document.getElementById(arg.formId), // Определяем форму
        inputsArr = formInit.querySelectorAll('input'); // Коллекция полей ввода формы

    formInit.addEventListener('submit', function (e) { e.preventDefault(); });
    formInit.addEventListener('submit', function () { validateIt(inputsArr)} );

    for ( var i = 0 ; i < inputsArr.length ; i++ ) {

        var validator = inputsArr[i].dataset.validator, // Переменная валидатора
            params = null, // Переменная параметров min/max
            validMin,
            validMax;

        // Если есть минимальное значение - запоминаем, нет - null
        inputsArr[i].dataset.validatorMin ? validMin = inputsArr[i].dataset.validatorMin : validMin = null;

        // Если есть максимальное значение - запоминаем, нет - null
        inputsArr[i].dataset.validatorMax ? validMax = inputsArr[i].dataset.validatorMax : validMax = null;

        // Задаём валидатор по определённому ранее значению
        switch (validator) {

            case 'letters':
                addListener( inputsArr[i], new RegExp('^[a-zA-Zа-яА-ЯёЁ]+$'), null);
                break;

            case 'number':
                if ( validMin && validMax ) {
                    params = [];
                    params.push(validMin, validMax);
                } else { params = null; }
                addListener( inputsArr[i], new RegExp('^-?\\d+$'), params);
                break;

            case 'regexp':
                addListener( inputsArr[i], inputsArr[i].dataset.validatorPattern, null );
                break;

            default:
                break;
        }
    }

    /**  --- Вспомогательные функции ---  **/

    // функция добавления обработчика события
    function addListener (target, matcher, str) {

        // Проверяем пришли ли параметры min/max
        if ( str ) {
            target.addEventListener('blur', function () {

                // переводим результат regexp в число и записываем в переменную:
                var checker = +this.value.match(matcher);

                // проверка на min/max, по результату вызываем функцию обработки результата
                ( str[0] <= checker && checker <= str[1] ) ? applyIt(target, true) : applyIt(target, false);
            });

        } else {

            // проверка значения после regexp, по результату вызываем функцию обработки результата
            target.addEventListener('blur', function () {
                (this.value.match(matcher) !== null) ? applyIt(target, true) : applyIt(target, false);
            });

        }
    }

    // Функция применения результата
    function applyIt(target, checker) {
        checker ? target.classList.remove(arg.inputErrorClass) : target.classList.add(arg.inputErrorClass);
    }

    // Функция валидации формы
    function validateIt(args) {
        var trigger = true;

        // Убираем классы при повторной валидации
        formInit.classList.remove(arg.formValidClass);
        formInit.classList.remove(arg.formInvalidClass);

        for ( var i = 0 ; i < args.length ; i++ ) {

            // Если обязательные поля формы пустые, либо присвоен класс ошибки - форма невалидна
            if ( 'required' in inputsArr[i].dataset && +inputsArr[i].value === 0 ) {
                inputsArr[i].classList.add(arg.inputErrorClass);
                trigger = false;
            } else if (inputsArr[i].classList.contains(arg.inputErrorClass)) {
                trigger = false;
            }
        }

        if (trigger) {
            formInit.classList.add(arg.formValidClass);
        } else {
            formInit.classList.add(arg.formInvalidClass);
        }
    }
}