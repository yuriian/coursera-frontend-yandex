'use strict';

function validateForm(data)
{
    var inputs = document.querySelectorAll("input");

    for (var i = 0; i < inputs.length; i++)
    {
        var input = inputs[i]

        input.addEventListener("focus", function(event)
        {
            this.classList.remove(data.inputErrorClass);
        }, true )

        input.addEventListener("blur", function(event)
        {
            if (validateInput(this) === false)
                this.classList.add(data.inputErrorClass);
            if (validateInput(this) === true)
                this.classList.remove(data.inputErrorClass);
        }, true )
    }
    var button = document.querySelector("button");

    button.addEventListener("click", function(event)
    {   
        var isValid = true; 
        for (var i = 0; i < inputs.length; i++)
        {
            var input = inputs[i]
            if (validateInput(input) === false)
                {
                    isValid = false;
                    input.classList.add(data.inputErrorClass);
                }
            if (validateInput(input) === true)
            input.classList.remove(data.inputErrorClass);
        }
        var form = document.getElementById(data.formId);

        event.preventDefault();
        if(isValid === true)
            {
                form.classList.remove(data.formInvalidClass);
                form.classList.add(data.formValidClass);
            }
        if(isValid === false)
        {
            form.classList.remove(data.formValidClass);
            form.classList.add(data.formInvalidClass);
        }
    }, true )

    button.addEventListener("keydown", function(event)
    {   
        if(event.keyCode === 13 && event.target.tagName === 'INPUT')
        {
            var isValid = true; 
            for (var i = 0; i < inputs.length; i++)
            {
                var input = inputs[i]
                if (validateInput(input) === false)
                    {
                        isValid = false;
                        input.classList.add(data.inputErrorClass);
                    }
                if (validateInput(input) === true)
                input.classList.remove(data.inputErrorClass);
            }
            var form = document.getElementById(data.formId);

            event.preventDefault();
            if(isValid === true)
                {
                    form.classList.remove(data.formInvalidClass);
                    form.classList.add(data.formValidClass);
                }
            if(isValid === false)
            {
                form.classList.remove(data.formValidClass);
                form.classList.add(data.formInvalidClass);
            }
        }
    }, true )

    button.addEventListener("keydown", function(event)
    {   
        if(event.keyCode === 9 && event.target.tagName === 'INPUT')
        {
            if (validateInput(this) === false)
                this.classList.add(data.inputErrorClass);
            if (validateInput(this) === true)
                this.classList.remove(data.inputErrorClass);
        }
    }, true )


    function validateInput(node)
    {
        if(node.dataset.hasOwnProperty("required"))
            if(node.value.length === 0)
                return false;

        if(node.dataset.hasOwnProperty("validator"))
        {
            switch(node.dataset.validator)
            {
                case "letters":
                    var regLetters = /^[a-zA-Zа-яА-Я]+$/;
                    return (regLetters.test(node.value)  && node.value.length !== 0);
                break;

                case "number":
                    var regNumbers = /^[0-9]+$/;
                    if (regNumbers.test(node.value) === false && node.value.length !== 0)
                        return false;
                    var min = Number(node.dataset.validatorMin);
                    var max = Number(node.dataset.validatorMax);

                        if(min !== null && min !== undefined && Number(node.value) < min) return false;

                        if(max !== null && max !== undefined && Number(node.value) > max) return false;
                    return true;
                break;

                case "regexp":
                    var pattern = new RegExp(node.dataset.validatorPattern);
                    if(node.value.length !== 0)
                        return (pattern.test(node.value));
                    else return true;
                break;
            }
        }
        return true;
    }
}